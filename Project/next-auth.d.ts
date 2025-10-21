import NextAuth, {DefaultSession} from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            isVerified: boolean;
            profilePic?: string;
            role: "user" | "admin" | "department_Student_Advisor" | "university_Student_Advisor" | "student";
            createdAt?: string;
            department_id?: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        firstName: string;
        lastName: string;
        isVerified: boolean;
        role?: string;
        profilePic?: string;
        createdAt?: string;
        department_id?: string;
    }
}