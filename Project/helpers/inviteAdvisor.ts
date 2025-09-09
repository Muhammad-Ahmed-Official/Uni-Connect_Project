import jwt from "jsonwebtoken";
import { emailQueue } from "@/lib/bullMq";

export const inviteAdvisor =  (
  email: string,
  role: string,
  department: string
) => {
  if (!email || !role || !department) {
    throw new Error("Missing advisor fields");
  }

  const token = jwt.sign(
    { email, role, department },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  const link = `${process.env.ALLOWED_ORIGIN}/advisor/verify?signup_token=${token}`;

  // await emailQueue.add("email-queue", { email, link });

  // return { email, role, link }; 
  return { name: "email-queue", data: { email, link } };
};
