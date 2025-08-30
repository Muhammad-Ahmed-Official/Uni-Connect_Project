import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Calendar, FileText, MessageSquareMore, TrendingDown, TrendingUp, UserCheck, Users } from 'lucide-react'

interface StatsCardsProps {
    stat: any,
    index: number
}

const stats: Stat[] = [
    {
        title: "Total Students",
        value: "2,847",
        change: "+12%",
        trend: "up",
        icon: Users,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
    },
    {
        title: "Active Advisors",
        value: "156",
        change: "+3%",
        trend: "up",
        icon: UserCheck,
        color: "text-green-600",
        bgColor: "bg-green-100",
    },
    {
        title: "Total Events",
        value: "89",
        change: "+8%",
        trend: "up",
        icon: Calendar,
        color: "text-purple-600",
        bgColor: "bg-purple-100",
    },
    {
        title: "Pending Escalations",
        value: "23",
        change: "-15%",
        trend: "down",
        icon: MessageSquareMore,
        color: "text-orange-600",
        bgColor: "bg-orange-100",
    },
    {
        title: "Documents Uploaded",
        value: "1,234",
        change: "+25%",
        trend: "up",
        icon: FileText,
        color: "text-teal-600",
        bgColor: "bg-teal-100",
    },
]


const StatsCardsItem = ({ stat, index }: StatsCardsProps) => {
    return (
        <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center text-xs text-gray-600 mt-1">
                    {stat.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    ) : (
                        <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                    )}
                    <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span>
                    <span className="ml-1">from last month</span>
                </div>
            </CardContent>
        </Card>
    )
}

const StatsCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {stats.map((stat, index) => (
                <StatsCardsItem stat={stat} index={index} key={index} />
            ))}
        </div>
    )
}

export default StatsCards