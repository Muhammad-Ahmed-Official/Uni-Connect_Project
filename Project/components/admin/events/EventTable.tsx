import React, { useState } from 'react'
import EventTableCard from './EventTableCard'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import EditEventDialog from './EditEventDialog'
import { apiClient } from '@/lib/api-client'
import EventSkeleton from './EventSkelton'

interface EventTableProps {
    filteredEvents: AdminEvent[]
    setEvents: React.Dispatch<React.SetStateAction<AdminEvent[]>>
    events: AdminEvent[]
    loading2: boolean
}

export interface EventFormValues {
    title: string
    content: string
    departmentName: string
    eventDetails: {
        start_date: string,
        end_date: string
        location: string
    }
}

const EventTable = ({ filteredEvents, setEvents, events, loading2 }: EventTableProps) => {
    const [selectedEvent, setSelectedEvent] = useState<AdminEvent | null>(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [editForm, setEditForm] = useState<EventFormValues>({
        title: "",
        departmentName: "",
        content: "",
        eventDetails: {
            start_date: "",
            end_date: "",
            location: "",
        },
    })

    const handleApproveEvent = (eventId: string) => {
        setEvents(events.map((event) => (event._id === eventId ? { ...event, status: "approved" } : event)))
        toast({
            title: "Event Approved",
            description: "The event has been approved and is now visible to users.",
        })
    }

    const handleRejectEvent = (eventId: string) => {
        setEvents(events.map((event) => (event._id === eventId ? { ...event, status: "rejected" } : event)))
        toast({
            title: "Event Rejected",
            description: "The event has been rejected and will not be visible to users.",
        })
    }

    const handleDeleteEvent = async (eventId: string) => {
        setEvents(events.filter((event) => event?._id !== eventId))
        await apiClient.deleteEvent(eventId);
        toast({
            title: "Event Deleted",
            description: "The event has been permanently deleted.",
        })
    }

    const handleSaveEvent = async () => {
        setLoading(true);
        if (selectedEvent) {
            console.log("selectedEvent ==>", selectedEvent);
            setEvents(
                filteredEvents.map((event) =>
                    event?._id === selectedEvent?._id
                        ? {
                            ...event,
                            title: editForm?.title,
                            content: editForm?.content,
                            departmentName: editForm?.departmentName,
                            start_date: editForm?.eventDetails?.start_date,
                            end_date: editForm?.eventDetails?.end_date,
                            location: editForm?.eventDetails.location,
                        }
                        : event
                )
            )
            setEvents((prev) =>
                prev.map((event) =>
                    event._id === selectedEvent?._id
                        ? {
                            ...event,
                            title: editForm?.title,
                            content: editForm?.content,
                            departmentName: editForm?.departmentName,
                            eventDetails: {
                                ...event.eventDetails,
                                start_date: editForm?.eventDetails?.start_date,
                                end_date: editForm?.eventDetails?.end_date,
                                location: editForm.eventDetails?.location,
                            },
                        }
                        : event
                )
            );
            try {
                console.log("editForm in handleSaveEvent ==>", editForm);
                await apiClient.updateEvent(editForm, selectedEvent?._id)
                toast({
                    title: "Event Updated",
                    description: "The event has been successfully updated.",
                })
            } catch (error) {
                toast({
                    title: "Update Failed",
                    description: "Something went wrong while updating the event. Please try again.",
                    variant: "destructive",
                });
            } finally {
                setIsEditDialogOpen(false);
                setLoading(false);
            }
        }

    }

    const handleEditEvent = (event: AdminEvent) => {
        setSelectedEvent(event)
        setIsEditDialogOpen(true)
        setEditForm({
            title: event?.title || "",
            content: event?.content || "",
            departmentName: "",
            eventDetails: {
                start_date: event?.eventDetails?.start_date || "",
                end_date: event?.eventDetails?.end_date || "",
                location: event?.eventDetails?.location || "",
            },
        })
    }


    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filteredEvents.map((event) => (
                    <EventTableCard loading2={loading2} key={event._id} event={event} handleEditEvent={handleEditEvent} handleApproveEvent={handleApproveEvent} handleRejectEvent={handleRejectEvent} handleDeleteEvent={handleDeleteEvent} />
                ))}
            </div>

            {loading2 === false && filteredEvents.length === 0 && (
                <Card>
                    <CardContent className="text-center py-12">
                        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                        <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                    </CardContent>
                </Card>
            )}

            {/* Edit Event Dialog */}
            <EditEventDialog isEditDialogOpen={isEditDialogOpen} setIsEditDialogOpen={setIsEditDialogOpen} editForm={editForm} setEditForm={setEditForm} handleSaveEvent={handleSaveEvent} loading={loading} />
        </div>
    )
}

export default EventTable