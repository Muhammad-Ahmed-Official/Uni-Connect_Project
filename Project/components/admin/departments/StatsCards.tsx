import StatsCardsSkeleton from "@/components/dashboard/LandingPage/StatsCardsSkeleton";
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Calendar, MessageSquare, UserCheck, Users } from "lucide-react"

const StatsCards = ({ departments, statsLoading }: any) => {

    if (statsLoading) {
        return <StatsCardsSkeleton />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Departments</p>
                            <p className="text-2xl font-bold text-gray-900">{departments?.totalDepartments ? departments?.totalDepartments : 0}</p>
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
                            <p className="text-2xl font-bold text-gray-900">{departments?.totalStudents ? departments?.totalStudents : 0}</p>
                        </div>
                        <Users className="h-8 w-8 text-green-600" />
                    </div>
                </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Posts</p>
                            <p className="text-2xl font-bold text-gray-900">{departments?.totalPosts ? departments?.totalPosts : 0}</p>
                        </div>
                        <UserCheck className="h-8 w-8 text-purple-600" />
                    </div>
                </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Events</p>
                            <p className="text-2xl font-bold text-gray-900">{departments?.totalEvents ? departments?.totalEvents : 0}</p>
                        </div>
                        <Calendar className="h-8 w-8 text-orange-600" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default StatsCards