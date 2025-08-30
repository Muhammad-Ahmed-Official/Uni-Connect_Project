import { DepartmentFormValues } from '@/app/admin/departments/page'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface HeaderProps {
    setIsAddDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    setEditForm: React.Dispatch<React.SetStateAction<DepartmentFormValues>>
}

const Header = ({ setIsAddDialogOpen, setEditForm }: HeaderProps) => {
    const handleAddDepartment = () => {
        setEditForm({
            name: "",
            code: "",
            description: "",
            head: "",
            building: "",
            phone: "",
            email: "",
        })
        setIsAddDialogOpen(true)
    }
    return (
        <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Department Management</h1>
                <p className="text-gray-600 mt-1">Manage university departments, assignments, and activity statistics.</p>
            </div>
            <Button onClick={handleAddDepartment} className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
                <Plus className="h-4 w-4 mr-2" />
                Add Department
            </Button>
        </div>
    )
}

export default Header