import { Card, CardContent } from '@/components/ui/card'
import { UserCheck, Users, UserX } from 'lucide-react'
import React from 'react'

const StatsCards = ({ users }: { users: User[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Users</p>
                            <p className="text-2xl font-bold text-gray-900">{users.length}</p>
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
                            <p className="text-2xl font-bold text-gray-900">{users.filter((u) => u.role === "student").length}</p>
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
                            <p className="text-2xl font-bold text-gray-900">{users.filter((u) => u.role === "advisor").length}</p>
                        </div>
                        <UserCheck className="h-8 w-8 text-purple-600" />
                    </div>
                </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Suspended</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {users.filter((u) => u.status === "suspended").length}
                            </p>
                        </div>
                        <UserX className="h-8 w-8 text-red-600" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default StatsCards