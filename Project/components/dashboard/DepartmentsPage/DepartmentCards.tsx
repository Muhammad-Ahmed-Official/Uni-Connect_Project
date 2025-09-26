"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Search, Clock } from "lucide-react"
import Link from "next/link"

type Department = {
    id: string
    name: string
    description: string
    memberCount: number
    activeDiscussions: number
    recentActivity: string
    color: string
    icon: string
    tags: string[]
}

interface DepartmentCardsProps {
    departmentsData: Department[]
}

const Tags = ({ department }: { department: Department }) => {
    return (
        <div className="flex flex-wrap gap-1">
            {department.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                </Badge>
            ))}
            {department.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                    +{department.tags.length - 3}
                </Badge>
            )}
        </div>
    )
}

const Stats = ({ department }: { department: Department }) => {
    return (
        <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{department.memberCount.toLocaleString()} members</span>
            </div>
            <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{department.recentActivity}</span>
            </div>
        </div>
    )
}

const ActivityTracker = ({ department }: { department: Department }) => {
    return (
        <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                        width: `${Math.min((department.activeDiscussions / 35) * 100, 100)}%`,
                    }}
                />
            </div>
            <span className="text-xs text-gray-500">Activity</span>
        </div>
    )
}

const DepartmentCard = ({ department }: { department: Department }) => {
    return (
        <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div
                        className={`w-12 h-12 rounded-lg ${department.color} flex items-center justify-center text-2xl`}
                    >
                        {department.icon}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                        {department.activeDiscussions} active
                    </Badge>
                </div>
                <CardTitle className="text-xl font-semibold">{department.name}</CardTitle>
                <CardDescription className="text-sm text-gray-600 line-clamp-2">
                    {department.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Tags */}
                    <Tags department={department} />

                    {/* Stats */}
                    <Stats department={department} />

                    {/* Activity Indicator */}
                    <ActivityTracker department={department} />
                </div>
            </CardContent>
        </Card>
    )
}

const DepartmentCards = ({ departmentsData }: DepartmentCardsProps) => {
    return (
        <>
            {departmentsData.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No departments found</h3>
                    <p className="text-gray-500">Try adjusting your search terms or filters</p>
                </div>
            ) :
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {departmentsData.map((department) => (
                        <Link key={department.id} href={`/dashboard/departments/${department.id}`}>
                            <DepartmentCard department={department} />
                        </Link>
                    ))}
                </div>
            }
        </>
    )
}

export default DepartmentCards