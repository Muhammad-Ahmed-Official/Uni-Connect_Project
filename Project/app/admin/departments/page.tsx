"use client"

import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import AddDepartmentDialog from "@/components/admin/departments/AddDepartmentDialog"
import Header from "@/components/admin/departments/Header"
import StatsCards from "@/components/admin/departments/StatsCards"
import FiltersAndSearches from "@/components/admin/departments/FiltersAndSearches"
import { apiClient } from "@/lib/api-client"

export interface DepartmentFormValues {
  departmentName: string
  departmentBio: string
  departmentChairman: string
  deaprtmentchairmanEmail: string
  established: string,
}

// Mock department data
// const mockDepartments: AdminDepartment[] = [
//   {
//     _id: 1,
//     departmentName: "Computer Science",
//     departmentBio: "Department of Computer Science and Information Technology",
//     departmentChairman: "Dr. Sarah Johnson",
//     totalStudents: 450,
//     totalAdvisors: 8,
//     activeEscalations: 12,
//     totalEvents: 15,
//     established: '1985',
//     deaprtmentchairmanEmail: "cs@university.edu",
//     advisors: [
//       { name: "Dr. Sarah Johnson", avatar: "/advisor-4.png", specialization: "Software Engineering" },
//       { name: "Dr. Michael Chen", avatar: "/advisor-1.png", specialization: "AI & Machine Learning" },
//       { name: "Prof. Lisa Wang", avatar: "/advisor-2.png", specialization: "Cybersecurity" },
//     ],
//   },
//   {
//     _id: 2,
//     departmentName: "Engineering",
//     departmentBio: "Department of Mechanical and Electrical Engineering",
//     departmentChairman: "Dr. Michael Smith",
//     totalStudents: 380,
//     totalAdvisors: 6,
//     activeEscalations: 8,
//     totalEvents: 12,
//     established: "1978",
//     deaprtmentchairmanEmail: "engineering@university.edu",
//     advisors: [
//       { name: "Dr. Michael Smith", avatar: "/advisor-1.png", specialization: "Mechanical Engineering" },
//       { name: "Dr. Robert Wilson", avatar: "/advisor-3.png", specialization: "Electrical Engineering" },
//     ],
//   },
//   {
//     _id: 3,
//     departmentName: "Business Administration",
//     departmentBio: "School of Business Administration and Management",
//     departmentChairman: "Dr. Robert Chen",
//     totalStudents: 320,
//     totalAdvisors: 5,
//     activeEscalations: 6,
//     totalEvents: 18,
//     established: "1990",
//     deaprtmentchairmanEmail: "business@university.edu",
//     advisors: [
//       { name: "Dr. Robert Chen", avatar: "/advisor-5.png", specialization: "Finance" },
//       { name: "Prof. Maria Garcia", avatar: "/advisor-6.png", specialization: "Marketing" },
//     ],
//   }
// ]

export default function DepartmentManagement() {
  const [departments, setDepartments] = useState<AdminDepartment[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm] = useState("")
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [departmentStats, setDepartmentStats] = useState('');
  const [editForm, setEditForm] = useState<DepartmentFormValues>({
    departmentName: "",
    departmentBio: "",
    departmentChairman: "",
    deaprtmentchairmanEmail: "",
    established: "",
  })

  const getDaprtment = async() => {
    const respones:any = await apiClient.getDepartments();
    setDepartments(respones?.data?.departments)
  }

  const getDaprtmentStats = async() => {
    const responese:any = await apiClient.departmentStats();
    // console.log(responese.data);
    setDepartmentStats(responese?.data);
  }

  useEffect(() => {
    getDaprtment();
    getDaprtmentStats();
  }, [])

  // Filter departments based on search
  const filteredDepartments = departments.filter(
    (dept) =>
      dept.departmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.departmentChairman.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSaveDepartment = async() => {
    setLoading(true)
    const newDepartment = {
      ...editForm,
      totalStudents: 0,
      totalAdvisors: 0,
      activeEscalations: 0,
      totalEvents: 0,
      advisors: [],
    }
    try {
      const response = await apiClient.createDepartment(newDepartment);
      
      setDepartments([...filteredDepartments, newDepartment])
      
      toast({
        title: "Department Added",
        description: "New department has been successfully created.",
      })

      setIsAddDialogOpen(false)
    } catch (error) {
      toast({
        title: "Failed to create department",
        description: "Please try again later.",
        variant: "destructive",
      });
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <Header setIsAddDialogOpen={setIsAddDialogOpen} setEditForm={setEditForm} />

      {/* Stats Cards */}
      <StatsCards departments={departmentStats} />

      {/* Search and Department Grid */}
      <FiltersAndSearches departments={filteredDepartments} setDepartments={setDepartments} />

      {/* Add Department Dialog */}
      <AddDepartmentDialog isAddDialogOpen={isAddDialogOpen} loading={loading} setIsAddDialogOpen={setIsAddDialogOpen} editForm={editForm} setEditForm={setEditForm} handleSaveDepartment={handleSaveDepartment} />
    </div>
  )
}
