import jwt from "jsonwebtoken";
import { nextError, nextResponse } from "@/utils/Response";
import { emailQueue } from "@/lib/bullMq";
import Redis from "ioredis";

export const inviteAdvisor = async (email: string, role: string, department: string) => {
    switch (role) {
        case "department_student_advisor":
          const deptToken = jwt.sign({ email, role,department }, process.env.JWT_SECRET!, { expiresIn: "1day" });
          const deptLink = `${process.env.ALLOWED_ORIGIN}/advisor/verify/${deptToken}`;
          const job = await emailQueue.add("sendEmail", { email, deptLink });
          return nextResponse(200, "Department Advisor verification link sent successfully");
    
        case "university_student_advisor":
          const uniToken = jwt.sign({ email, role,department }, process.env.JWT_SECRET!, { expiresIn: "1day" });
          const uniLink = `${process.env.ALLOWED_ORIGIN}/advisor/verify/${uniToken}`;
          await emailQueue.add("sendEmail", { email, uniLink });
          return nextResponse(200, "University Advisor verification link sent successfully");
          // const emailToUSA = await sendEmailLink(email, uniLink);
          // if (emailToUSA?.success) {
          // } else {
          //   return nextError(400, emailToUSA?.message)
          // }
    
        default:
          return nextError(400, "Invalid role");
      }
};
