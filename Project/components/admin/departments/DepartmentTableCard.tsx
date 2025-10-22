import { Calendar, Edit, Eye, MessageSquare, MoreHorizontal, Trash2 } from 'lucide-react'
import { Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface DepartmentTableCardProps {
    department: AdminDepartment
    isDropdownOpen: number | null
    setIsDropdownOpen: (open: number | null) => void
    handleViewDepartment: (department: AdminDepartment) => void
    handleEditDepartment: (department: AdminDepartment) => void
    setDeleteDialogOpen: (open: boolean) => void
    setDepartmentToDelete: (department: AdminDepartment) => void
}

const DepartmentTableCard = ({ department, isDropdownOpen, setIsDropdownOpen, handleViewDepartment, handleEditDepartment, setDeleteDialogOpen, setDepartmentToDelete }: DepartmentTableCardProps) => {
    return (
        <Card key={department._id} className="border hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">{department.departmentName}</CardTitle>
                            {/* <Badge variant="outline" className="text-xs">
                                {department.code}
                            </Badge> */}
                        </div>
                    </div>
                    <DropdownMenu
                        open={isDropdownOpen === department?._id}
                        onOpenChange={(open) => { setIsDropdownOpen(open ? department._id! : null) }}
                    >
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                className='cursor-pointer'
                                onClick={() => {
                                    handleViewDepartment(department)
                                    setIsDropdownOpen(null);
                                }}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className='cursor-pointer'
                                onClick={() => {
                                    handleEditDepartment(department)
                                    setIsDropdownOpen(null);
                                }}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Department
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className='cursor-pointer'

                                onClick={() => {
                                    setDepartmentToDelete(department)
                                    setDeleteDialogOpen(true)
                                    setIsDropdownOpen(null);
                                }}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Department
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                        {/* <AvatarImage src={department.headAvatar} /> */}
                        <AvatarFallback>
                            {department.departmentChairman
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{department.departmentChairman}</p>
                        <p className="text-xs text-gray-500">Department Head</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{department?.totalStudents ? department?.totalStudents : 0}</div>
                        <div className="text-xs text-gray-600">Students</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{department?.totalAdvisors ? department?.totalAdvisors : 0}</div>
                        <div className="text-xs text-gray-600">Advisors</div>
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                    {/* <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {department?.activeEscalations } escalations
                    </div> */}
                    <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {department?.totalEvents ? department?.totalEvents : 0} events
                    </div>
                </div>

                <Button
                    variant="outline"
                    className="w-full bg-transparent cursor-pointer"
                    onClick={() => handleViewDepartment(department)}
                >
                    View Details
                </Button>
            </CardContent>
        </Card>
    )
}

export default DepartmentTableCard