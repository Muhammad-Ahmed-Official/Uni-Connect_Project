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
