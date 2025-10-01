export interface AdvisorEscalation {
  _id: string
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  status: 'New' | 'In Progress' | 'Resolved' | 'Escalated'
  category: string
  student_id: {
    _id: string
    firstName: string
    lastName: string
    studentId: string
  }
  department_id: {
    _id: string
    name: string
  }
  university_admin_notes?: string
  resolution?: string
  resolved_at?: Date
  createdAt: Date
  updatedAt: Date
}

export interface AdvisorStats {
  totalStudents: number
  activeEscalations: number
  resolvedThisMonth: number
  pendingDocuments: number
}

export interface Advisor {
  id: number;
  name: string;
  title: string;
  department: string;
  specialties: string[];
  email: string;
  phone: string;
  office: string;
  rating: number;
  responseTime: string;
  availability: string;
  image: string;
  bio: string;
}

export interface Escalation {
  id: number;
  title: string;
  advisor: string;
  department: string;
  status: "Pending" | "In Progress" | "Resolved";
  priority: "Low" | "Medium" | "High" | "Urgent";
  submittedDate: string;
  lastUpdate: string;
  description: string;
  attachments: string[];
}

export interface EscalationFormData {
  title: string;
  description: string;
  priority: string;
  category: string;
}