import { Activity, Calendar, CheckCircle, Clock, Eye, FileText, MessageSquareMore, Users } from 'lucide-react'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

const recentActivity: Activity[] = [
    {
        id: 1,
        type: "user_registration",
        message: "New student registered: Sarah Johnson (Computer Science)",
        time: "2 minutes ago",
        icon: Users,
        color: "text-blue-600",
    },
    {
        id: 2,
        type: "escalation",
        message: "New escalation submitted to Dr. Smith (Academic Issues)",
        time: "15 minutes ago",
        icon: MessageSquareMore,
        color: "text-orange-600",
    },
    {
        id: 3,
        type: "document",
        message: "Past paper uploaded: CS101 Final Exam 2024",
        time: "1 hour ago",
        icon: FileText,
        color: "text-teal-600",
    },
    {
        id: 4,
        type: "event",
        message: "Event created: Career Fair 2024 (Engineering Department)",
        time: "2 hours ago",
        icon: Calendar,
        color: "text-purple-600",
    },
    {
        id: 5,
        type: "escalation_resolved",
        message: "Escalation resolved: Grade Appeal - John Doe",
        time: "3 hours ago",
        icon: CheckCircle,
        color: "text-green-600",
    },
]

const RecentActivitySkeleton = () => {
    return (
        <CardContent className="space-y-4">
            {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className={`p-2 rounded-lg bg-gray-100`}>
                        <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">Loading...</p>
                        <div className="flex items-center mt-1">
                            <Clock className="h-3 w-3 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">Loading...</span>
                        </div>
                    </div>
                </div>
            ))}
        </CardContent>
    )
}

const RecentActivityItem = ({ activity }: { activity: Activity }) => {
    return (
        <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
            <div className={`p-2 rounded-lg bg-gray-100`}>
                <activity.icon className={`h-4 w-4 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <div className="flex items-center mt-1">
                    <Clock className="h-3 w-3 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
            </div>
            <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
            </Button>
        </div>
    )
}

const RecentActivity = () => {
    return (
        <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Activity className="h-5 w-5 mr-2" />
                        Recent Activity
                    </CardTitle>
                    <CardDescription>Latest actions and updates across the platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {
                        !recentActivity ? (
                            <RecentActivitySkeleton />
                        ) : (
                            recentActivity.map((activity) => (
                                <RecentActivityItem key={activity.id} activity={activity} />
                            ))
                        )
                    }
                </CardContent>
            </Card>
        </div>
    )
}

export default RecentActivity