import { z } from "zod";

export const usernameQuerySchema = z
    .string()
    .min(6, "Username must be atleast 3 characters")
    .max(12, "Username must be no more than 8 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character")

//  * SIGNUP VALIDATION BY ZOD  

export const signUpSchema = z.object({
    email : z.string().email({message:"Invalid Email Address"}),
    password : z.string().min(6,{message:"Password must be atleast 6 characters"}),
    studentId: z.string().min(1,{message:"Student ID is required"}),
    firstName : z.string().min(1,{message:"First Name is required"}),
    lastName : z.string().min(1,{message:"Last Name is required"}),
    year: z.number().min(1,{message:"Year must be atleast 1"}).max(8,{message:"Year must be no more than 8"}).optional(),
    bio: z.string().max(500,{message:"Bio must be no more than 500 characters"}).optional(),
    profilePic: z.string().url({message:"Profile Picture must be a valid URL"}).optional(),
    
})