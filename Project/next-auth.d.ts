import NextAuth, {DefaultSession} from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {

            id: string;
            email: string;
            firstName?: string;
            lastName?: string;
            name: string;
            isVerified: boolean;
            image?: string;
            role: "user" | "admin";
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        name; string;
        isVerified: boolean;
        role?: string | null;
    }
}