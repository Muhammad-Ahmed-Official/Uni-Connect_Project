"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import AddDepartmentDialog from "@/components/admin/departments/AddDepartmentDialog"
import Header from "@/components/admin/departments/Header"
import StatsCards from "@/components/admin/departments/StatsCards"
import FiltersAndSearches from "@/components/admin/departments/FiltersAndSearches"

export interface DepartmentFormValues {
  name: string
  code: string
  description: string
  head: string
  building: string
  phone: string
  email: string
}

// Mock department data
const mockDepartments: AdminDepartment[] = [
  {
    id: 1,
    name: "Computer Science",
    code: "CS",
    description: "Department of Computer Science and Information Technology",
    head: "Dr. Sarah Johnson",
    headAvatar: "/advisor-4.png",
    totalStudents: 450,
    totalAdvisors: 8,
    activeEscalations: 12,
    totalEvents: 15,
    established: "1985",
    building: "Tech Building A",
    phone: "+1 (555) 123-4567",
    email: "cs@university.edu",
    advisors: [
      { name: "Dr. Sarah Johnson", avatar: "/advisor-4.png", specialization: "Software Engineering" },
      { name: "Dr. Michael Chen", avatar: "/advisor-1.png", specialization: "AI & Machine Learning" },
      { name: "Prof. Lisa Wang", avatar: "/advisor-2.png", specialization: "Cybersecurity" },
    ],
  },
  {
    id: 2,
    name: "Engineering",
    code: "ENG",
    description: "Department of Mechanical and Electrical Engineering",
    head: "Dr. Michael Smith",
    headAvatar: "/advisor-1.png",
    totalStudents: 380,
    totalAdvisors: 6,
    activeEscalations: 8,
    totalEvents: 12,
    established: "1978",
    building: "Engineering Complex",
    phone: "+1 (555) 234-5678",
    email: "engineering@university.edu",
    advisors: [
      { name: "Dr. Michael Smith", avatar: "/advisor-1.png", specialization: "Mechanical Engineering" },
      { name: "Dr. Robert Wilson", avatar: "/advisor-3.png", specialization: "Electrical Engineering" },
    ],
  },
  {
    id: 3,
    name: "Business Administration",
    code: "BUS",
    description: "School of Business Administration and Management",
    head: "Dr. Robert Chen",
    headAvatar: "/advisor-5.png",
    totalStudents: 320,
    totalAdvisors: 5,
    activeEscalations: 6,
    totalEvents: 18,
    established: "1990",
    building: "Business Center",
    phone: "+1 (555) 345-6789",
    email: "business@university.edu",
    advisors: [
      { name: "Dr. Robert Chen", avatar: "/advisor-5.png", specialization: "Finance" },
      { name: "Prof. Maria Garcia", avatar: "/advisor-6.png", specialization: "Marketing" },
    ],
  },
  {
    id: 4,
    name: "Mathematics",
    code: "MATH",
    description: "Department of Mathematics and Statistics",
    head: "Prof. David Wilson",
    headAvatar: "/advisor-3.png",
    totalStudents: 180,
    totalAdvisors: 4,
    activeEscalations: 3,
    totalEvents: 8,
    established: "1975",
    building: "Science Hall",
    phone: "+1 (555) 456-7890",
    email: "math@university.edu",
    advisors: [
      { name: "Prof. David Wilson", avatar: "/advisor-3.png", specialization: "Applied Mathematics" },
      { name: "Dr. Jennifer Lee", avatar: "/advisor-2.png", specialization: "Statistics" },
    ],
  },
  {
    id: 5,
    name: "Psychology",
    code: "PSY",
    description: "Department of Psychology and Behavioral Sciences",
    head: "Dr. Emily Rodriguez",
    headAvatar: "/advisor-6.png",
    totalStudents: 250,
    totalAdvisors: 3,
    activeEscalations: 5,
    totalEvents: 10,
    established: "1988",
    building: "Social Sciences Building",
    phone: "+1 (555) 567-8901",
    email: "psychology@university.edu",
    advisors: [
      { name: "Dr. Emily Rodriguez", avatar: "/advisor-6.png", specialization: "Clinical Psychology" },
      { name: "Dr. James Thompson", avatar: "/advisor-1.png", specialization: "Cognitive Psychology" },
    ],
  },
  {
    id: 6,
    name: "Biology",
    code: "BIO",
    description: "Department of Biology and Life Sciences",
    head: "Dr. Lisa Anderson",
    headAvatar: "/advisor-2.png",
    totalStudents: 290,
    totalAdvisors: 5,
    activeEscalations: 7,
    totalEvents: 14,
    established: "1982",
    building: "Life Sciences Center",
    phone: "+1 (555) 678-9012",
    email: "biology@university.edu",
    advisors: [
      { name: "Dr. Lisa Anderson", avatar: "/advisor-2.png", specialization: "Molecular Biology" },
      { name: "Dr. Kevin Brown", avatar: "/advisor-3.png", specialization: "Ecology" },
    ],
  },
]

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState<AdminDepartment[]>(mockDepartments)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm] = useState("")
  const { toast } = useToast()
  const [editForm, setEditForm] = useState<DepartmentFormValues>({
    name: "",
    code: "",
    description: "",
    head: "",
    building: "",
    phone: "",
    email: "",
  })

  // Filter departments based on search
  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSaveDepartment = () => {
    // Add new department
    const newDepartment = {
      id: Math.max(...filteredDepartments.map((d) => d.id)) + 1,
      ...editForm,
      headAvatar: "/placeholder.svg",
      totalStudents: 0,
      totalAdvisors: 0,
      activeEscalations: 0,
      totalEvents: 0,
      established: new Date().getFullYear().toString(),
      advisors: [],
    }
    setDepartments([...filteredDepartments, newDepartment])
    setIsAddDialogOpen(false)
    toast({
      title: "Department Added",
      description: "New department has been successfully created.",
    })
  }

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <Header setIsAddDialogOpen={setIsAddDialogOpen} setEditForm={setEditForm} />

      {/* Stats Cards */}
      <StatsCards departments={filteredDepartments} />

      {/* Search and Department Grid */}
      <FiltersAndSearches departments={filteredDepartments} setDepartments={setDepartments} />

      {/* Add Department Dialog */}
      <AddDepartmentDialog isAddDialogOpen={isAddDialogOpen} setIsAddDialogOpen={setIsAddDialogOpen} editForm={editForm} setEditForm={setEditForm} handleSaveDepartment={handleSaveDepartment} />
    </div>
  )
}
