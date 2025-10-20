import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { AlertCircle, Calendar, CheckCircle, Clock, Edit, MapPin, Trash2, Users, XCircle } from 'lucide-react'
import React from 'react'

interface EventTableCardProps {
    event: AdminEvent
    handleApproveEvent: (eventId: number) => void
    handleRejectEvent: (eventId: number) => void
    handleDeleteEvent: (eventId: number) => void
    handleEditEvent: (event: AdminEvent) => void
}

const EventTableCard = ({ event, handleEditEvent, handleApproveEvent, handleRejectEvent, handleDeleteEvent }: EventTableCardProps) => {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "approved":
                return (
                    <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approved
                    </Badge>
                )
            case "pending":
                return (
                    <Badge className="bg-yellow-100 text-yellow-800">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Pending
                    </Badge>
                )
            case "rejected":
                return (
                    <Badge className="bg-red-100 text-red-800">
                        <XCircle className="w-3 h-3 mr-1" />
                        Rejected
                    </Badge>
                )
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    const getCategoryBadge = (category: string) => {
        const colors: Record<string, string> = {
            "University-wide": "bg-blue-100 text-blue-800",
            Department: "bg-purple-100 text-purple-800",
            Club: "bg-green-100 text-green-800",
        }
        return <Badge className={colors[category] || "bg-gray-100 text-gray-800"}>{category}</Badge>
    }
    return (
        <Card key={event._id} className="overflow-hidden pt-0">
            <div className="aspect-video relative">
                <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-40 object-cover" />
                <div className="absolute top-2 right-2">{getStatusBadge(event.status)}</div>
            </div>
            <CardHeader>
                <CardDescription className="line-clamp-2">{event.content}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.start_date}
                    </div>
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.end_date}
                    </div>
                    <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                    </div>

                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    {/* <span className="text-sm text-gray-500">by {event.organizer}</span> */}
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditEvent(event)}
                        >
                            <Edit className="w-3 h-3" />
                        </Button>
                        {event.status === "pending" && (
                            <>
                                <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleApproveEvent(event._id)}
                                >
                                    <CheckCircle className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleRejectEvent(event._id)}>
                                    <XCircle className="w-3 h-3" />
                                </Button>
                            </>
                        )}
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteEvent(event._id)}>
                            <Trash2 className="w-3 h-3" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default EventTableCard