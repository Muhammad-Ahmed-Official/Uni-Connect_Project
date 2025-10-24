import React from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    GraduationCap,
    ArrowRight,
} from "lucide-react"
import Link from 'next/link'

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden bg-white">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center">
                    <div className="flex justify-center mb-8">
                        <div className="flex items-center space-x-2">
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                <GraduationCap className="w-7 h-7 text-white" />
                            </div>
                            <span className="text-3xl font-bold text-gray-900">Uni-Connect</span>
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Your University
                        <span className="text-blue-600 block">Social Hub</span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Connect, collaborate, and excel in your academic journey. Join thousands of students in building a
                        stronger university community through shared knowledge and support.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                            <Link href="/register">
                                Get Started Free
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3 bg-white">
                            <Link href="/login">Sign In</Link>
                        </Button>
                    </div>

                    <div className="mt-12 flex justify-center">
                        <Badge variant="secondary" className="px-4 py-2 text-sm">
                            Trusted by 10,000+ students across 50+ universities
                        </Badge>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection