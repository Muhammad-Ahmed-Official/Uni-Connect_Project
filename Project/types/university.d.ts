export interface UniversityEvent {
  _id: string
  title: string
  content: string
  image?: string
  user_id: {
    _id: string
    firstName: string
    lastName: string
  }
  department_id?: {
    _id: string
    name: string
  }
  tags: string[]
  eventDetails: {
    location: string
    start_date: Date
    end_date: Date
    note?: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface UniversityEscalation {
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
  assigned_advisor_id?: {
    _id: string
    firstName: string
    lastName: string
  }
  university_admin_notes?: string
  resolution?: string
  resolved_at?: Date
  escalated_at?: Date
  createdAt: Date
  updatedAt: Date
}

export interface UniversityStats {
  byStatus: Array<{ _id: string; count: number }>
  byPriority: Array<{ _id: string; count: number }>
}
