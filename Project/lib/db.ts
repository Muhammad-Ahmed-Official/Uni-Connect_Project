import type { Collection, Document } from "mongoose";
// Create models
export interface BaseEntity {
    _id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUser extends BaseEntity {
    firstName: string
    lastName: string
    email: string
    password: string
    department?: string
    studentId?: string
    role: "user" | "admin"
}

export interface DepartmentEntity extends BaseEntity {
    name: string
    description?: string
}

export interface EventEntity extends BaseEntity {
    title: string
    description?: string
    date: string
    location?: string
    departmendId?: string
}

export interface DocumentEntity extends BaseEntity {
    title: string
    url: string
    type?: "pdf" | "docx" | "xlsx" | "pptx" | "txt"
    departmentId?: string
    uploadedByUserId: string
}

export interface AdvisorEntity extends BaseEntity {
    name: string
    email: string
    departmentId: string
}

export interface EscalationEntity extends BaseEntity {
    title: string
    description: string
    status: "open" | "in-progress" | "resolved" | "closed"
    createdByUserId: string
}


// export async function getCollection<T extends Document>(
//     collectionName: string
// ): Promise<Collection<T>> {
//     const db = await connectDB();
//     if (!db) {
//         throw new Error("Database connection failed.");
//     }
//     return db.collection<T>(collectionName);
// }