
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { DepartmentFormValues } from '@/app/admin/departments/page'
import ViewDeparmentDialog from './ViewDeparmentDialog'
import EditDeparmentDialog from './EditDeparmentDialog'
import DeleteDepartmentDialog from './DeleteDepartmentDialog'
import DepartmentTableCard from './DepartmentTableCard'

interface DepartmentsTableProps {
    filteredDepartments: AdminDepartment[]
    setDepartments: React.Dispatch<React.SetStateAction<AdminDepartment[]>>
}

const DepartmentsTable = ({ filteredDepartments, setDepartments }: DepartmentsTableProps) => {
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [departmentToDelete, setDepartmentToDelete] = useState<AdminDepartment | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<AdminDepartment | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<DepartmentFormValues>({
        name: "",
        code: "",
        description: "",
        head: "",
        building: "",
        phone: "",
        email: "",
    })
    const { toast } = useToast()

    const handleViewDepartment = (department: AdminDepartment) => {
        setSelectedDepartment(department)
        setIsViewDialogOpen(true)
    }

    const handleEditDepartment = (department: AdminDepartment) => {
        setSelectedDepartment(department)
        setEditForm({
            name: department.name,
            code: department.code,
            description: department.description,
            head: department.head,
            building: department.building,
            phone: department.phone,
            email: department.email,
        })
        setIsEditDialogOpen(true)
    }

    const handleDeleteDepartment = (departmentId: number) => {
        setDepartments(filteredDepartments.filter((dept) => dept.id !== departmentId))
        toast({
            title: "Department Deleted",
            description: "Department has been successfully removed from the system.",
            variant: "destructive",
        })
    }

    const handleSaveDepartment = () => {
        if (selectedDepartment) {
            // Edit existing department
            setDepartments(
                filteredDepartments.map((dept) =>
                    dept.id === selectedDepartment.id
                        ? {
                            ...dept,
                            name: editForm.name,
                            code: editForm.code,
                            description: editForm.description,
                            head: editForm.head,
                            building: editForm.building,
                            phone: editForm.phone,
                            email: editForm.email,
                        }
                        : dept,
                ),
            )
            setIsEditDialogOpen(false)
            toast({
                title: "Department Updated",
                description: "Department information has been successfully updated.",
            })
        }
    }


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepartments.map((department) => (
                <DepartmentTableCard key={department.id} department={department} isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} handleViewDepartment={handleViewDepartment} handleEditDepartment={handleEditDepartment} setDeleteDialogOpen={setDeleteDialogOpen} setDepartmentToDelete={setDepartmentToDelete} />
            ))}

            {/* View Department Dialog */}
            <ViewDeparmentDialog isViewDialogOpen={isViewDialogOpen} setIsViewDialogOpen={setIsViewDialogOpen} selectedDepartment={selectedDepartment} />

            {/* Edit Department Dialog */}
            <EditDeparmentDialog isEditDialogOpen={isEditDialogOpen} setIsEditDialogOpen={setIsEditDialogOpen} editForm={editForm} setEditForm={setEditForm} handleSaveDepartment={handleSaveDepartment} />


            {/* Delete Department Dialog */}
            <DeleteDepartmentDialog isOpen={deleteDialogOpen} onClose={() => { setDeleteDialogOpen(false) }} onConfirm={() => { if (departmentToDelete) { handleDeleteDepartment(departmentToDelete.id); } setDeleteDialogOpen(false) }} />
        </div>
    )
}

export default DepartmentsTable