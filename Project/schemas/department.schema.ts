import { z } from "zod"

export const departmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  head: z.string().optional()
})

export type DepartmentSchema = z.infer<typeof departmentSchema>
