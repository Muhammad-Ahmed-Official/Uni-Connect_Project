import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { DepartmentFormValues } from '@/app/admin/departments/page'
import ViewDeparmentDialog from './ViewDeparmentDialog'
import EditDeparmentDialog from './EditDeparmentDialog'
import DeleteDepartmentDialog from './DeleteDepartmentDialog'
import DepartmentTableCard from './DepartmentTableCard'
import { apiClient } from '@/lib/api-client'
import DepartmentSkeleton from './DepartmentSkleton'

interface DepartmentsTableProps {
    filteredDepartments: any
    setDepartments: React.Dispatch<React.SetStateAction<AdminDepartment[]>>
    loading2: boolean
    departments: AdminDepartment[]
    setDepartmentStats: (value:any) => void
}

const DepartmentsTable = ({ filteredDepartments, setDepartments, loading2, departments, setDepartmentStats }: DepartmentsTableProps) => {
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [departmentToDelete, setDepartmentToDelete] = useState<AdminDepartment | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<AdminDepartment | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [editForm, setEditForm] = useState<DepartmentFormValues>({
        // departmentName: "",
        departmentBio: "",
        departmentChairman: "",
        deaprtmentchairmanEmail: "",
        // established: "",
    })
    const { toast } = useToast();
    if (loading2) {
        return <DepartmentSkeleton count={3} />
    }

    const handleViewDepartment = (department: AdminDepartment) => {
        setSelectedDepartment(department)
        setIsViewDialogOpen(true)
    }

    const handleEditDepartment = (department: AdminDepartment) => {
        setSelectedDepartment(department)
        setEditForm({
            departmentBio: department.departmentBio,
            departmentChairman: department.departmentChairman,
            deaprtmentchairmanEmail: department.deaprtmentchairmanEmail,
        })
        setIsEditDialogOpen(true)
    }


    const handleDeleteDepartment = async(departmentId: string) => {
        try {
            setDepartments(filteredDepartments.filter((dept:any) => dept._id !== departmentId))
            await apiClient.deleteDepartment(departmentId);
            toast({
                title: "Department Deleted",
                description: "Department has been successfully removed from the system.",
                variant: "destructive",
            })
        } catch (error) {
            toast({
                title: "Failed to create department",
                description: "Please try again later.",
                variant: "destructive",
            });
        }
    }

    const handleSaveDepartment = async() => {
        setLoading(true);
        try {
            if (selectedDepartment) {
                // Edit existing department
                setDepartments(
                    filteredDepartments.map((dept:any) =>
                        dept._id === selectedDepartment._id
                            ? {
                                ...dept,
                                departmentBio: editForm.departmentBio,
                                departmentChairman: editForm.departmentChairman,
                                deaprtmentchairmanEmail: editForm.deaprtmentchairmanEmail,
                            }
                            : dept,
                    ),
                )
                await apiClient.updateDepartment(selectedDepartment._id!, editForm)
                setIsEditDialogOpen(false)
                toast({
                    title: "Department Updated",
                    description: "Department information has been successfully updated.",
                });
            }
        } catch (error) {
            toast({
                title: "Failed to create department",
                description: "Please try again later.",
                variant: "destructive",
            });
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {(filteredDepartments?.length > 0 ? filteredDepartments : departments)?.map(
                (department:any) => (
                    <DepartmentTableCard
                    key={department._id}
                    department={department}
                    isDropdownOpen={isDropdownOpen}
                    setIsDropdownOpen={setIsDropdownOpen}
                    handleViewDepartment={handleViewDepartment}
                    handleEditDepartment={handleEditDepartment}
                    setDeleteDialogOpen={setDeleteDialogOpen}
                    setDepartmentToDelete={setDepartmentToDelete}
                    />
                )
            )}

            {/* View Department Dialog */}
            <ViewDeparmentDialog isViewDialogOpen={isViewDialogOpen} setIsViewDialogOpen={setIsViewDialogOpen} selectedDepartment={selectedDepartment} />

            {/* Edit Department Dialog */}
            <EditDeparmentDialog isEditDialogOpen={isEditDialogOpen} loading={loading} setIsEditDialogOpen={setIsEditDialogOpen} editForm={editForm} setEditForm={setEditForm} handleSaveDepartment={handleSaveDepartment} />

            {/* Delete Department Dialog */}
            <DeleteDepartmentDialog isOpen={deleteDialogOpen} onClose={() => { setDeleteDialogOpen(false) }} onConfirm={() => { if (departmentToDelete) 
                { 
                    handleDeleteDepartment(departmentToDelete._id!);  
                    setDepartmentStats((prev: any) => ({
                        ...prev,
                        totalDepartments: (prev?.totalDepartments || 0) - 1,
                    })); 
                } setDeleteDialogOpen(false) }} />
        </div>
    )
}

export default DepartmentsTable