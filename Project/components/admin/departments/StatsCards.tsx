import { Card, CardContent } from "@/components/ui/card"
import { Building2, MessageSquare, UserCheck, Users } from "lucide-react"

const StatsCards = ({ departments }: { departments: AdminDepartment[]; }) => {
    const totalStats: Record<string, number> = {
        totalStudents: departments.reduce((sum, dept) => sum + dept.totalStudents, 0),
        totalAdvisors: departments.reduce((sum, dept) => sum + dept.totalAdvisors, 0),
        totalEscalations: departments.reduce((sum, dept) => sum + dept.activeEscalations, 0),
        totalEvents: departments.reduce((sum, dept) => sum + dept.totalEvents, 0),
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Departments</p>
                            <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
                        </div>
                        <Building2 className="h-8 w-8 text-blue-600" />
                    </div>
                </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Students</p>
                            <p className="text-2xl font-bold text-gray-900">{totalStats.totalStudents.toLocaleString()}</p>
                        </div>
                        <Users className="h-8 w-8 text-green-600" />
                    </div>
                </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Advisors</p>
                            <p className="text-2xl font-bold text-gray-900">{totalStats.totalAdvisors}</p>
                        </div>
                        <UserCheck className="h-8 w-8 text-purple-600" />
                    </div>
                </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Active Escalations</p>
                            <p className="text-2xl font-bold text-gray-900">{totalStats.totalEscalations}</p>
                        </div>
                        <MessageSquare className="h-8 w-8 text-orange-600" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default StatsCards