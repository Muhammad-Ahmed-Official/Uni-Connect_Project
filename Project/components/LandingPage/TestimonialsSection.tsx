"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Star,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"

interface Testimonial {
    name: string
    role: string
    content: string
    rating: number
}

const testimonials: Testimonial[] = [
    {
        name: "Sarah Chen",
        role: "Computer Science Student",
        content:
            "Uni-Connect has transformed how I collaborate with students from other departments. The platform makes it so easy to find help and share knowledge.",
        rating: 5,
    },
    {
        name: "Michael Rodriguez",
        role: "Engineering Student",
        content:
            "The past papers repository saved me countless hours during exam preparation. Having everything organized by department and year is incredibly helpful.",
        rating: 5,
    },
    {
        name: "Emily Johnson",
        role: "Business Administration",
        content:
            "The advisor escalation feature is a game-changer. I can now communicate directly with my advisor and track the status of my queries.",
        rating: 5,
    },
]


const TestimonialsSection = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }
    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">What Students Are Saying</h2>
                    <p className="text-xl text-gray-600">
                        Join thousands of students who have transformed their academic experience
                    </p>
                </div>

                <div className="relative">
                    <Card className="border-0 shadow-xl">
                        <CardContent className="p-8 text-center">
                            <div className="flex justify-center mb-4">
                                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>

                            <blockquote className="text-xl text-gray-700 mb-6 leading-relaxed">
                                "{testimonials[currentTestimonial].content}"
                            </blockquote>

                            <div>
                                <div className="font-semibold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</div>
                                <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-center mt-8 space-x-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={prevTestimonial}
                            className="rounded-full w-10 h-10 p-0 bg-transparent"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={nextTestimonial}
                            className="rounded-full w-10 h-10 p-0 bg-transparent"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TestimonialsSection