import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios";
import { Calendar, FileText, MessageSquare, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import StatsCardsSkeleton from "./StatsCardsSkeleton" // Adjust path as needed

const StatsCards = () => {
    const [discussions, setDiscussions] = useState(0);
    const [events, setEvents] = useState(0);
    const [materials, setMaterials] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // const [discussionsRes, eventsRes, materialsRes] = await Promise.all([
                const [discussionsRes, eventsRes, ] = await Promise.all([
                    axios.get("/api/posts/read/get-all-posts"),
                    axios.get("/api/event/read"),
                    // axios.get("/api/materials/read/get-all-materials")
                ]);

                setDiscussions(discussionsRes.data.data.length);
                setEvents(eventsRes.data.data.length);
                // setMaterials(materialsRes.data.data.length);

            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <StatsCardsSkeleton />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Discussions</CardTitle>
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{discussions}</div>
                    <p className="text-xs text-muted-foreground">+3 from yesterday</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{events}</div>
                    <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Study Materials</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{materials}</div>
                    <p className="text-xs text-muted-foreground">Papers available</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Advisor Responses</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground">Pending replies</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default StatsCards