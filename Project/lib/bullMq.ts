import { Queue } from "bullmq";
import Redis from "ioredis";

const connection = new Redis(process.env.REDIS_URL!);

export const emailQueue = new Queue("email-queue", { connection ,
    defaultJobOptions: {
    attempts: 3, // Retry 3 times
    backoff: { type: "exponential", delay: 5000 }, 
    removeOnComplete: true,
    removeOnFail: false,
  },
});