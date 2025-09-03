import { z } from "zod"

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  category: z.enum(["general", "academic", "event", "alert"]),
  status: z.enum(["draft", "published"]),
  target_roles: z.array(z.string()).optional(),
})
