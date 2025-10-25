import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ChevronRight, FileText, MessageSquare, Users } from "lucide-react"
import Link from "next/link"


const quickLinks = [
    {
        title: "Department Forums",
        description: "Connect with students in your department",
        icon: Users,
        href: "/dashbaord/departments",
        color: "bg-blue-100 text-blue-600",
    },
    {
        title: "Upcoming Events",
        description: "View and RSVP to university events",
        icon: Calendar,
        href: "/dashbaord/events",
        color: "bg-green-100 text-green-600",
    },
    {
        title: "Ask an Advisor",
        description: "Get guidance from academic advisors",
        icon: MessageSquare,
        href: "/dashbaord/advisors",
        color: "bg-purple-100 text-purple-600",
    },
    {
        title: "Study Materials",
        description: "Access study materials",
        icon: FileText,
        href: "/study-materials",
        color: "bg-orange-100 text-orange-600",
    },
]

const QuickLinks = () => {
    return (
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Jump to the most important features</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {quickLinks.map((link, index) => (
                            <Link key={index} href={link.href}>
                                <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer">
                                    <div className={`w-10 h-10 rounded-lg ${link.color} flex items-center justify-center`}>
                                        <link.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{link.title}</h3>
                                        <p className="text-sm text-gray-500">{link.description}</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default QuickLinks