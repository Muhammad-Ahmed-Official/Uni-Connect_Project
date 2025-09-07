// lib/inviteAdvisor.ts
import jwt from "jsonwebtoken";
import { sendEmailLink } from "@/lib/nodemailer";
import { nextError, nextResponse } from "@/utils/Response";

export const inviteAdvisor = async (email: string, role: string, department: string) => {
    switch (role) {
        case "department_student_advisor":
          const deptToken = jwt.sign({ email, role,department }, process.env.JWT_SECRET!, { expiresIn: "1day" });
          const deptLink = `${process.env.ALLOWED_ORIGIN}/advisor/verify/${deptToken}`;
          const emailToDSA = await sendEmailLink(email, deptLink);
          if (emailToDSA?.success) {
            return nextResponse(200, "Department Advisor verification link sent successfully");
          } else {
            return nextError(400, emailToDSA?.message)
          }
    
        case "university_student_advisor":
          const uniToken = jwt.sign({ email, role,department }, process.env.JWT_SECRET!, { expiresIn: "1day" });
          const uniLink = `${process.env.ALLOWED_ORIGIN}/advisor/verify/${uniToken}`;
          const emailToUSA = await sendEmailLink(email, uniLink);
          if (emailToUSA?.success) {
            return nextResponse(200, "University Advisor verification link sent successfully");
          } else {
            return nextError(400, emailToUSA?.message)
          }
    
        default:
          return nextError(400, "Invalid role");
      }
};
