import { connectDB } from "@/lib/mongodb";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { NextRequest } from "next/server";
import User from "@/models/user.model";
import { sendEmailOTP } from "@/lib/nodemailer";
import { generateOTP } from "@/helpers/generateOTP";
import { safeSet } from "@/lib/redis";


const handleStudentRegistration = async (data: any, department_id: string) => {
  const { username, firstName, lastName, email, password, studentId, role } = data;

  if (!username || !firstName || !lastName || !email || !password || !studentId) {
    console.log("me andar hon!");
    return nextError(400, "Missing required Fields!");
  }

  const existingUserVerifiedByStudentId = await User.findOne({ studentId, isVerified: true });
  if (existingUserVerifiedByStudentId) return nextError(400, "Student already exists");

  const verifyCode = generateOTP();
  const redisKey = `otp:${email}`;

  const userPayload = {
    username,
    firstName,
    lastName,
    email,
    password,
    studentId,
    role,
    department_id,
  };

  let user = await User.findOne({ email });

  if (user) {
    if (user.isVerified) {
      return nextError(400, "User already exists with this email");
    }
    Object.assign(user, userPayload);
    await user.save();
  } else {
    await User.create(userPayload);
  }

  const { success, error } = await safeSet(redisKey, verifyCode, 60 * 3);

  if (!success) {
    return nextError(500, "Failed to save OTP. Please try again.", error);
  }

  try {
    const emailResponse = await sendEmailOTP(email, verifyCode);
    if (!emailResponse.success) {
      return nextError(500, emailResponse.message);
    }
    return nextResponse(200, `OTP sent to ${email}`);
  } catch (err) {
    console.log(err)
    return nextError(500, "Internal Server Error");
  }

};


const handle_Advisor_Registration = async (data: any, department_id: string) => {
  const {
    username,
    firstName,
    lastName,
    email,
    password,
    role,
    advisor_details,
    employeeId
  } = data;

  //* Validate required fields dynamically
  const requiredFields: { key: string; value: any }[] = [
    { key: "username", value: username },
    { key: "firstName", value: firstName },
    { key: "lastName", value: lastName },
    { key: "email", value: email },
    { key: "password", value: password },
    { key: "departmentId", value: department_id },
    { key: "role", value: role },
    { key: "employeeId", value: employeeId },
  ];

  for (const field of requiredFields) {
    if (!field.value) {
      return nextError(400, `${field.key} is required`);
    }
  }

  //* role validation (must be advisor role)

  if (!["department_Student_Advisor", "university_Student_Advisor"].includes(role)) {
    return nextError(400, "Invalid role for this registration type");
  }

  //* Department validation

  if (role === "department_Student_Advisor" && !department_id) {
    return nextError(400, "Department ID is required for Department Student Advisor");
  }

  //* advisor details validation

  if (!advisor_details || !advisor_details.officeLocation) {
    return nextError(400, "Advisor details are required (officeLocation at minimum)");
  }

  const verifyCode = generateOTP();
  const redisKey = `otp:${email}`;

  const departmentId = role === "department_Student_Advisor" ? department_id : null;

  const userPayload = {
    username,
    firstName,
    lastName,
    email,
    password, // hashing handled by pre-save hook
    employeeId,
    role,
    department_id: departmentId,
  };

  //* Check if user already exists
  let user = await User.findOne({ email });

  if (user) {
    if (user.isVerified) {
      return nextError(400, "User already exists and is verified");
    }
    Object.assign(user, userPayload);
    await user.save();
  } else {
    user = await User.create(userPayload);
  }

  const { success, error } = await safeSet(redisKey, verifyCode, 60 * 3);

  if (!success) {
    return nextError(500, "Failed to save OTP. Please try again.", error);
  }

  //* Send OTP email

  try {
    const emailResponse = await sendEmailOTP(email, verifyCode);
    if (!emailResponse.success) {
      return nextError(500, emailResponse.message);
    }
    return nextResponse(200, `OTP sent to ${email}`);
  } catch (err) {
    console.log(err)
    return nextError(500, "Internal Server Error");
  }
};


export const POST = asyncHandler(async (request: NextRequest) => {
  const data = await request.json();

  if (!data) return nextResponse(400, "Missing Fields");

  await connectDB();

  const department_id = ""; //* GET DEPARTMENT ID FRON SCEHMA   :

  switch (data?.role) {
    case "student":
      return await handleStudentRegistration(
        data,
        department_id
      );

    case "department_Student_Advisor":
    case "university_Student_Advisor":
      return await handle_Advisor_Registration(
        data,
        department_id
      )
    default:
      return nextError(400, "Invalid role");
  }
});
