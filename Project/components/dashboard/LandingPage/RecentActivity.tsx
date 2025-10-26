import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"
import { ArrowRight, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import RecentActivitySkeleton from "./RecentActivitySkeleton"
import { format } from "timeago.js"

interface Activity {
    title: string;
    description?: string;
    time: string;
    unread: boolean;
}

const RecentActivity = () => {
    const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getDashboardActivity = async () => {
            setLoading(true);
            const res = await axios.get("/api/dashboard/recent-activity");
            setRecentActivity(res.data.data);
            setLoading(false);
        }

        getDashboardActivity();
    }, [])

    if (loading) {
        return <RecentActivitySkeleton />;
    }

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
                                    <p className="text-xs text-gray-400 mt-1">{format(activity.time)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default RecentActivity