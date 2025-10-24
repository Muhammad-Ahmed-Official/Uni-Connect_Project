import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { AlertCircle, Calendar, CheckCircle, Clock, Edit, MapPin, Trash2, Users, XCircle } from 'lucide-react'
import React from 'react'
import EventSkeleton from './EventSkelton'

interface EventTableCardProps {
    event: AdminEvent
    handleApproveEvent: (eventId: string) => void
    handleRejectEvent: (eventId: string) => void
    handleDeleteEvent: (eventId: string) => void
    handleEditEvent: (event: AdminEvent) => void
    loading2: boolean
}

const formatDate = (dateString: string) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};


const EventTableCard = ({ event, handleEditEvent, handleApproveEvent, handleRejectEvent, handleDeleteEvent, loading2 }: EventTableCardProps) => {

    if (loading2) {
        return <EventSkeleton />
    }

    // const getStatusBadge = (status: string) => {
    //     switch (status) {
    //         case "approved":
    //             return (
    //                 <Badge className="bg-green-100 text-green-800">
    //                     <CheckCircle className="w-3 h-3 mr-1" />
    //                     Approved
    //                 </Badge>
    //             )
    //         case "pending":
    //             return (
    //                 <Badge className="bg-yellow-100 text-yellow-800">
    //                     <AlertCircle className="w-3 h-3 mr-1" />
    //                     Pending
    //                 </Badge>
    //             )
    //         case "rejected":
    //             return (
    //                 <Badge className="bg-red-100 text-red-800">
    //                     <XCircle className="w-3 h-3 mr-1" />
    //                     Rejected
    //                 </Badge>
    //             )
    //         default:
    //             return <Badge variant="secondary">{status}</Badge>
    //     }
    // }

    const getCategoryBadge = (category: string) => {
        const colors: Record<string, string> = {
            "University-wide": "bg-blue-100 text-blue-800",
            Department: "bg-purple-100 text-purple-800",
            Club: "bg-green-100 text-green-800",
        }
        return <Badge className={colors[category] || "bg-gray-100 text-gray-800"}>{category}</Badge>
    }
    return (
        <Card
            key={event._id}
            className="overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 pt-0 pb-3"
        >
            {/* Image */}
            <div className="aspect-video relative">
                <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                />
                {/* <div className="absolute top-2 right-2">{getStatusBadge(event.status)}</div> */}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow">
                <CardHeader className="pb-2">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                        {event.title}
                    </h3>
                    <CardDescription className="text-gray-600 text-sm line-clamp-3">
                        {event.content || "No description available."}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex flex-col justify-between flex-grow">
                    <div className="space-y-3 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            <span className="font-medium text-gray-800">
                                {formatDate(event?.eventDetails?.start_date)}
                            </span>
                            <span className="text-gray-400">—</span>
                            <span className="font-medium text-gray-800">
                                {formatDate(event?.eventDetails?.end_date)}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <MapPin className="w-6 h-6 text-blue-600" />
                            <span className="font-medium text-[13px]">
                                {event?.eventDetails?.location || "Location not available"}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                            {event.tags.map((tag: string) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditEvent(event)}
                                className="hover:bg-blue-50"
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
                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleRejectEvent(event._id)}
                                    >
                                        <XCircle className="w-3 h-3" />
                                    </Button>
                                </>
                            )}

                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteEvent(event._id)}
                            >
                                <Trash2 className="w-3 h-3" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}

export default EventTableCard