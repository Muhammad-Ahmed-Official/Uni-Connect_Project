"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Users,
    Calendar,
    MapPin,
    Clock,
    Check,
} from "lucide-react"
import { Event } from "@/app/dashboard/events/page"

function EventCard({ event }: { event: Event; }) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-0">
                <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                    <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.content}</p>

                    <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>
                                {new Date(event.eventDetails.start_date).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>
                                {new Date(event.eventDetails.end_date).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{event.eventDetails.location}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                        {event.tags.map((tag: string) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">by {event.department_id.departmentName}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


export default EventCard