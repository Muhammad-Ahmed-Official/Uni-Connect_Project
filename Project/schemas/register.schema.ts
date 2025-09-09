import { z } from "zod";

export const usernameQuerySchema = z
    .string()
    .min(6, "Username must be atleast 3 characters")
    .max(12, "Username must be no more than 8 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character")

//  * SIGNUP VALIDATION BY ZOD  

export const signUpSchema = z.object({
    username : usernameQuerySchema ,
    email : z.string().email({message:"Invalid Email Address"}),
    password : z.string().min(6,{message:"Password must be atleast 6 characters"})
})