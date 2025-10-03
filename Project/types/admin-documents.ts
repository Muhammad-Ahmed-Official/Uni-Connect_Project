export interface Document {
    id: number;
    title: string;
    subject?: string;
    category?: string;
    year?: string;
    semester?: string;
    examType?: string;
    uploadedBy: string;
    uploadDate: string;
    lastUpdated?: string;
    status: "approved" | "pending" | "rejected";
    downloads: number;
    fileSize: string;
    fileType: string;
}

export interface PastPaper extends Document {
    subject: string;
    year: string;
    semester: string;
    examType: string;
}

export interface PolicyDoc extends Document {
    category: string;
    lastUpdated: string;
}

export interface StatsCard {
    title: string;
    value: string | number;
    description: string;
    icon: React.ComponentType<any>;
    iconColor?: string;
}