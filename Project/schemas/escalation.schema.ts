import { z } from "zod"

export const escalationSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(2, "Category is required"),
  priority: z.enum(["Low", "Medium", "High", "Critical"]).default("Medium")
})

export type EscalationSchema = z.infer<typeof escalationSchema>
