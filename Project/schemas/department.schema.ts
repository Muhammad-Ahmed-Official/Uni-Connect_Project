import { z } from "zod"

export const departmentSchema = z.object({
  departmentName: z.enum([
    "CS",   // Computer Science
    "POL",  // Political Science
    "MC",   // Mass Communication
    "LAW",   // Law
    "PHAR"   // pharmacy
  ]),
  departmentBio: z.string().min(10, "Bio must be at least 10 characters"),
  deaprtmentchairmanEmail: z.string(),
  departmentChairman: z.string(),
  established: z.string(),
  // departmentTags: z.array(z.string()).min(1, "At least one tag is required"),
})

export type DepartmentSchema = z.infer<typeof departmentSchema>
