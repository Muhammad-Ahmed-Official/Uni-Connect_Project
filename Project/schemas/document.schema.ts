import { z } from "zod"

export const documentSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  category: z.string().min(2, "Category is required"),
  status: z.enum(["Draft", "Pending", "Approved"]).default("Draft")
})

export type DocumentSchema = z.infer<typeof documentSchema>
