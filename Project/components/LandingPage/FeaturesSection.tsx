import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Users,
    Calendar,
    MessageSquare,
    FileText,
    GraduationCap,
    BookOpen,
} from "lucide-react"

interface Feature {
    icon: React.ComponentType<any>
    title: string
    description: string
    color: string
}

const features: Feature[] = [
    {
        icon: Users,
        title: "Inter-Department Help",
        description: "Connect with students across departments for academic support and collaboration.",
        color: "bg-blue-100 text-blue-600",
    },
    {
        icon: Calendar,
        title: "Event Notifications",
        description: "Stay updated with university events, club activities, and important announcements.",
        color: "bg-green-100 text-green-600",
    },
    {
        icon: MessageSquare,
        title: "Advisor Escalation",
        description: "Direct communication channel with academic advisors for guidance and support.",
        color: "bg-purple-100 text-purple-600",
    },
    {
        icon: FileText,
        title: "Past Papers Repository",
        description: "Access previous exam papers and study materials organized by department and subject.",
        color: "bg-orange-100 text-orange-600",
    },
    {
        icon: BookOpen,
        title: "Policy Documents",
        description: "Easy access to university policies, guidelines, and government education directives.",
        color: "bg-teal-100 text-teal-600",
    },
    {
        icon: GraduationCap,
        title: "Academic Resources",
        description: "Comprehensive collection of study materials and academic support tools.",
        color: "bg-indigo-100 text-indigo-600",
    },
]


const FeaturesSection = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need for Academic Success</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover powerful features designed to enhance your university experience and connect you with the
                        resources you need.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature: Feature, index: number) => (
                        <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader>
                                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600 text-base leading-relaxed">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturesSection