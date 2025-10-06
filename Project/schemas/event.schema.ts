import { z } from "zod"

export const eventSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  location: z.string().min(2, "Location is required"),
  start_date: z.string().datetime(),
  end_date: z.string().datetime(),
  tags: z.array(z.string()).default([]).optional(),
  image: z.string().url().optional(),
  note: z.string().optional(),
})

export type EventSchema = z.infer<typeof eventSchema>
