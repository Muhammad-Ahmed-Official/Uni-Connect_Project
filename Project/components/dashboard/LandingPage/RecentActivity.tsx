import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Clock } from "lucide-react"

const recentActivity = [
    {
        type: "forum",
        title: "New post in Computer Science",
        description: "Help needed with Data Structures assignment",
        time: "2 hours ago",
        unread: true,
    },
    {
        type: "event",
        title: "Tech Talk: AI in Healthcare",
        description: "Tomorrow at 3:00 PM in Main Auditorium",
        time: "5 hours ago",
        unread: true,
    },
    {
        type: "advisor",
        title: "Response from Dr. Smith",
        description: "Your course selection query has been answered",
        time: "1 day ago",
        unread: false,
    },
    {
        type: "paper",
        title: "New past papers uploaded",
        description: "Database Systems - Fall 2023 papers available",
        time: "2 days ago",
        unread: false,
    },
]

const RecentActivity = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Recent Activity</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    {activity.unread && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />}
                                    {!activity.unread && <div className="w-2 h-2 bg-gray-300 rounded-full mt-2" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                                    <p className="text-sm text-gray-500 truncate">{activity.description}</p>
                                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-4 text-blue-600">
                        View all activity
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default RecentActivity