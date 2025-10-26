"use client"

import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import AddDepartmentDialog from "@/components/admin/departments/AddDepartmentDialog"
import Header from "@/components/admin/departments/Header"
import StatsCards from "@/components/admin/departments/StatsCards"
import FiltersAndSearches from "@/components/admin/departments/FiltersAndSearches"
import { apiClient } from "@/lib/api-client"

export interface DepartmentFormValues {
  departmentName?: string
  departmentBio: string
  departmentChairman: string
  deaprtmentchairmanEmail: string
  established?: string,
}


export default function DepartmentManagement() {
  const [departments, setDepartments] = useState<AdminDepartment[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [departmentStats, setDepartmentStats] = useState('');
  const [statsLoading, setStatsLoading] = useState(false);
  const [editForm, setEditForm] = useState<DepartmentFormValues>({
    departmentName: "",
    departmentBio: "",
    departmentChairman: "",
    deaprtmentchairmanEmail: "",
    established: "",
  })

  const getDaprtment = async() => {
    setLoading2(true);
    const respones:any = await apiClient.getDepartments();
    setDepartments(respones?.data?.departments)
    setLoading2(false);
  }

  const getDaprtmentStats = async() => {
    setStatsLoading(true);
    const responese:any = await apiClient.departmentStats();
    setDepartmentStats(responese?.data);
    setStatsLoading(false);
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
    const newDepartment = {
      ...editForm,
      totalStudents: 0,
      totalAdvisors: 0,
      activeEscalations: 0,
      totalEvents: 0,
      advisors: [],
    }
    if (!editForm.departmentName || !editForm.established || !editForm.departmentBio || !editForm.departmentChairman || !editForm.deaprtmentchairmanEmail) {
      toast({ title: "Error", description: "All fields are required.", variant:"destructive" });
      return;
    }
    setLoading(true)
    
    try {
      await apiClient.createDepartment(newDepartment);
      setDepartments([...filteredDepartments as any, newDepartment])
      setDepartmentStats((prev: any) => ({
        ...prev,
        totalDepartments: (prev?.totalDepartments || 0) + 1,
      }));

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
      <StatsCards departments={departmentStats} statsLoading={statsLoading} />

      {/* Search and Department Grid */}
      <FiltersAndSearches departments={filteredDepartments.length > 0 ? filteredDepartments : departments} setDepartments={setDepartments} loading2={loading2} setSearchTerm={setSearchTerm} searchTerm={searchTerm} setDepartmentStats={setDepartmentStats}  />

      {/* Add Department Dialog */}
      <AddDepartmentDialog isAddDialogOpen={isAddDialogOpen} loading={loading} setIsAddDialogOpen={setIsAddDialogOpen} editForm={editForm} setEditForm={setEditForm} handleSaveDepartment={handleSaveDepartment} />
    </div>
  )
}
