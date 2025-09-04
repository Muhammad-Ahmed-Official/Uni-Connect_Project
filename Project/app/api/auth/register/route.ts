import { connectDB } from "@/lib/mongodb";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { NextRequest } from "next/server";
import { User } from "@/models/user.model";
import { sendEmailLink, sendEmailOTP } from "@/lib/nodemailer";
import jwt from "jsonwebtoken";


const handleStudentRegistration = async (data: any, departmentId: string) => {
  const { firstName, lastName, email, password, department, studentId, role } = data;

  const existingUserVerifiedByStudentId = await User.findOne({ studentId, isVerified: true });
  if (existingUserVerifiedByStudentId) return nextError(400, "Student already exists");

  const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
  const codeExpiry = new Date(Date.now() + 5 * 60 * 1000);

  let user = await User.findOne({ studentId });

  if (user) {
    if (user.isVerified) {
      return nextError(400, "User already exists with this email");
    }
    user.verifyCode = verifyCode;
    user.verifyCodeExpiry = codeExpiry;
    user.departmentId = departmentId;
    await user.save();
  } else {
    await User.create({ firstName, lastName, email, password, department, studentId, departmentId, verifyCode, verifyCodeExpiry: codeExpiry, role,});
  }

  const emailResponse = await sendEmailOTP(email, verifyCode);
  if (emailResponse.success)
    return nextResponse(200, `OTP sent to ${email}`);
  else return nextError(500, emailResponse.message);
};


const handleAdvisorRegistration = async (data: any, departmentId: string) => {
  const { } = data;
  return nextResponse(200, '');
};


export const POST = asyncHandler(async (request: NextRequest) => {
  const { firstName, lastName, email, password, department, studentId, role } = await request.json();

  if ( !firstName || !lastName || !email || !password || !department || !studentId || !role )
    return nextResponse(400, "Missing Fields");

    await connectDB();

    const departmentId = `${department}-${new Date().getFullYear()}`;

    switch (role) {
        case "student":
        return await handleStudentRegistration(
            { firstName, lastName, email, password, department, studentId, role },
            departmentId
        );

        case "university_Student_Advisor":
        return await handleAdvisorRegistration(
            { },
            departmentId
        );

        default:
            const token = jwt.sign({ email, role }, process.env.JWT_SECRET!, { expiresIn: "15m" });
            const link = `${process.env.ALLOWED_ORIGIN}/advisor/verify/${token}`;
            await sendEmailLink(email, link);
            return nextResponse(200, "Verification link sent successfully");
    }
});
