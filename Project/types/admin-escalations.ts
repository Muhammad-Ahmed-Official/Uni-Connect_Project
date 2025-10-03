export interface Escalation {
    id: number;
    title: string;
    description: string;
    student: string;
    studentId: string;
    category: string;
    priority: "High" | "Medium" | "Low";
    status: "pending" | "in-progress" | "resolved";
    assignedAdvisor: string | null;
    submittedDate: string;
    responseTime: string | null;
    attachments: string[];
    department: string;
}

export interface Advisor {
    id: number;
    name: string;
    department: string;
    activeEscalations: number;
}

export interface StatsCard {
    title: string;
    value: string | number;
    description: string;
    icon: React.ComponentType<any>;
    iconColor?: string;
}