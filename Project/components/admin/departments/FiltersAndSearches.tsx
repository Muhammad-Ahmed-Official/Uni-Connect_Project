
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import DepartmentsTable from './DepartmentsTable'
import { Search } from 'lucide-react'
import { useState } from 'react'

interface FiltersAndSearchesProps {
    departments: AdminDepartment[]
    setDepartments: React.Dispatch<React.SetStateAction<AdminDepartment[]>>
}

const FiltersAndSearches = ({ departments, setDepartments }: FiltersAndSearchesProps) => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <Card className="border-0 shadow-sm">
            <CardHeader>
                <CardTitle>Department Directory</CardTitle>
                <CardDescription>Manage all university departments and their information</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search departments by name, code, or head..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Departments Grid */}
                <DepartmentsTable filteredDepartments={departments} setDepartments={setDepartments} />
            </CardContent>
        </Card>
    )
}

export default FiltersAndSearches