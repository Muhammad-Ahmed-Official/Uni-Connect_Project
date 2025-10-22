import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { AlertCircle, Calendar, CheckCircle, FileText, MessageSquareMore, Users } from 'lucide-react'
import Link from 'next/link'

const quickActions: Actions[] = [
    {
        title: "Create Department",
        description: "Create a new Department",
        href: "/admin/departments",
        icon: Users,
        color: "bg-blue-600 hover:bg-blue-700",
    },
    {
        title: "Create Event",
        description: "Schedule a new university event",
        href: "/admin/events",
        icon: Calendar,
        color: "bg-purple-600 hover:bg-purple-700",
    },
    {
        title: "Upload Document",
        description: "Add new past papers or policy documents",
        href: "/admin/documents",
        icon: FileText,
        color: "bg-teal-600 hover:bg-teal-700",
    },
    {
        title: "Review Escalations",
        description: "Monitor and assign pending escalations",
        href: "/admin/escalations",
        icon: MessageSquareMore,
        color: "bg-orange-600 hover:bg-orange-700",
    },
]

const QuickActionsItem = ({ action }: { action: Actions }) => {
    return (
        <Button
            variant="outline"
            className="!w-full justify-start h-auto px-3 py-3 border-gray-200 hover:border-gray-300 bg-transparent"
            asChild
        >
            <Link href={action?.href}>
                <div className="flex items-start gap-3 w-full">
                    <div className={`p-2 rounded-lg text-white ${action.color} shrink-0`}>
                        <action.icon className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col w-full overflow-hidden">
                        <div className="font-medium text-gray-900 text-sm sm:text-base leading-tight">
                            {action.title}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 mt-1 break-words whitespace-normal overflow-hidden">
                            {action.description}
                        </div>
                    </div>
                </div>
            </Link> 
        </Button>
    )
}

const QuickActions = () => {
    return (
        <div>
            <Card className="border-0 shadow-sm">
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {quickActions.map((action, index) => (
                        <QuickActionsItem key={index} action={action} />
                    ))}
                </CardContent>
            </Card>

            {/* System Status */}
            {/* <Card className="border-0 shadow-sm mt-6">
                <CardHeader>
                    <CardTitle className="text-lg">System Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Database</span>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Healthy
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">API Services</span>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Operational
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">File Storage</span>
                        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Maintenance
                        </Badge>
                    </div>
                </CardContent>
            </Card> */}
        </div>
    )
}

export default QuickActions