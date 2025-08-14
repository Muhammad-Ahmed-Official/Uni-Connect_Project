import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { z } from "zod"
import { compare } from "bcryptjs"
import { configs } from "@/configs/configs"
import { connectDB } from "@/lib/mongodb"
import User from "@/schemas/user.schema"

const credentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long")
})

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { lable: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                const parsedCredentials = credentialsSchema.safeParse(credentials);

                if (!parsedCredentials.success) {
                    throw new Error(parsedCredentials.error.errors[0].message);
                }

                const { email, password } = parsedCredentials.data

                await connectDB();
                const user = await User.findOne({ email }).lean() as {
                    _id: any;
                    email: string;
                    password: string;
                    firstName: string;
                    lastName: string;
                    role: string;
                } | null;
                if (!user) {
                    throw new Error("User not found");
                }

                const isPasswordValid = await compare(password, user.password);
                if (!isPasswordValid) {
                    throw new Error("Email or password is incorrect");
                }

                if (!user._id) {
                    throw new Error("User ID is missing");
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role || "user";
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                ; (session as any).user.role = (token as any).role || "user";
                session.user.id = token.id as string;

            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60 // 7 days
    },
    secret: configs.nextAuthSecret,
}