import { Connection } from "mongoose";

declare global {
    var mongoose: {
        connection: Connection | null;
        promise: Promise<Connection> | null;
    }

    interface Activity {
        id: number;
        type: string;
        message: string;
        time: string;
        icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
        color: string;
    }

    interface Stat {
        title: string
        value: string
        change: string
        trend: "up" | "down"
        color: string
        icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
        bgColor: string
    }

    interface Actions {
        title: string
        description: string
        href: string
        icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
        color: string
    }

    interface User {
        id: number
        name: string
        email: string
        role: string
        department: string
        status: string
        status: string
        joinDate: string
        lastActive: string
        avatar: string
    }

    interface Department {
        id: string
        name: string
        description: string
        memberCount: number
        activeDiscussions: number
        recentActivity: string
        color: string
        icon: string
        tags: string[]
    }

    interface AdminDepartment {
        id: number
        name: string
        description: string
        code: string
        head: string
        headAvatar: string
        totalStudents: number
        totalAdvisors: number
        activeEscalations: number
        totalEvents: number
        established: string
        building: string
        phone: string
        email: string
        advisors: {
            name: string
            avatar: string
            specialization: string
        }[]
    }
}

export { };