import { Worker } from "bullmq";
import IORedis from "ioredis";
import { sendEmailLink } from "@/lib/nodemailer";
import { nextError } from "@/utils/Response";

const connection = new IORedis(process.env.REDIS_URL!);

export const emailWorker = new Worker("email-queue",
  async (job: any) => {
    try {
      if (!job.data.email || !job.data.link) {
        return nextError(400, "Invalid job data!");
      }

      // Progress tracking example
      await job.updateProgress(10);

      const { email, deptLink } = job.data;
      const result = await sendEmailLink(email, deptLink, "For Advisor SignUp");
      if (!result.success) return nextError(400, "message send to advisor", result.message);
      await job.updateProgress(100);
    } catch (err: any) {
      console.error("Email failed:", err.message);
      return nextError(400, "Internal server error", err);
    }
  },
  { connection, concurrency: 5 }
);

emailWorker.on("failed", (job, err) => {
  if (job) {
    console.error(`Job ${job.id} failed: ${err?.message}`);
  } else {
    console.error(`Unknown job failed: ${err?.message}`);
  }
});


// Optional: monitor completed jobs
emailWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully`);
});