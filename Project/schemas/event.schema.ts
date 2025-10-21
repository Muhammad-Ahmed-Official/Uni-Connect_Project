import { z } from "zod"

export const eventSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  departmentName: z.enum([
    "Computer Science",   // Computer Science
    "Political Science",  // Political Science
    "Mass Communication",   // Mass Communication
    "Law",   // Law
    "Pharmacy"   // pharmacy
  ]),
  eventDetails: z.object({
    location: z.string().min(1, "Location is required"),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().min(1, "End date is required"),
  }),
  tags: z.array(z.string()).default([]).optional(),
  image: z.string().url().optional(),
  note: z.string().optional(),
})

export type EventSchema = z.infer<typeof eventSchema>
