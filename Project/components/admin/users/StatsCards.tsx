import StatsCardsSkeleton from '@/components/dashboard/LandingPage/StatsCardsSkeleton';
import { Card, CardContent } from '@/components/ui/card'
import { UserCheck, Users, UserX } from 'lucide-react'
import React from 'react'

const StatsCards = ({ stats, loading } : any) => {
    if (loading) {
        return <StatsCardsSkeleton />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Users</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.totalUsers ? stats?.totalUsers : 0}</p>
                        </div>
                        <Users className="h-8 w-8 text-blue-600" />
                    </div>
                </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
                <CardContent className="p-6"> 
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Students</p>
                            <p className="text-2xl font-bold text-gray-900">{stats?.totalStudent ? stats?.totalStudent : 0}</p>
                        </div>
                        <Users className="h-8 w-8 text-green-600" />
                    </div>
                </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Advisors</p>
                            <p className="text-2xl font-bold text-gray-900">{stats?.totalAdvisors ? stats?.totalAdvisors : 0}</p>
                        </div>
                        <UserCheck className="h-8 w-8 text-purple-600" />
                    </div>
                </CardContent>
            </Card>
            {/* <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Suspended</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {}
                            </p>
                        </div>
                        <UserX className="h-8 w-8 text-red-600" />
                    </div>
                </CardContent>
            </Card> */}
        </div>
    )
}

export default StatsCards