import { Worker } from "bullmq";
import IORedis from "ioredis";
import { sendEmailLink } from "@/lib/nodemailer";

const connection = new IORedis(process.env.REDIS_URL!);

export const emailWorker = new Worker("email-queue",
  async (job) => {
   try {
      const { email, deptLink } = job.data;
      const result = await sendEmailLink(email, deptLink, "For Advisor SignUp");
      if (!result.success) throw new Error(result.message);
    } catch (err:any) {
      console.error("Email failed:", err.message);
      throw err; 
    }
  },
  { connection }
);