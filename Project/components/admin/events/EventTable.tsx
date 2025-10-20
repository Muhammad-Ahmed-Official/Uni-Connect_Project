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

interface EventTableProps {
    filteredEvents: AdminEvent[]
    setEvents: React.Dispatch<React.SetStateAction<AdminEvent[]>>
    events: AdminEvent[]
}

export interface EventFormValues {
    title: string
    content: string
    start_date: string,
    end_date: string
    location: string
    image: string
    status: string

}

const EventTable = ({ filteredEvents, setEvents, events }: EventTableProps) => {
    const [selectedEvent, setSelectedEvent] = useState<AdminEvent | null>(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false)
    const [editForm, setEditForm] = useState<EventFormValues>({
        title: "",
        content: "",
        start_date: "",
        end_date: "",
        location: "",
        status: "",
        image: "",
    })

    const handleApproveEvent = (eventId: number) => {
        setEvents(events.map((event) => (event._id === eventId ? { ...event, status: "approved" } : event)))
        toast({
            title: "Event Approved",
            description: "The event has been approved and is now visible to users.",
        })
    }

    const handleRejectEvent = (eventId: number) => {
        setEvents(events.map((event) => (event._id === eventId ? { ...event, status: "rejected" } : event)))
        toast({
            title: "Event Rejected",
            description: "The event has been rejected and will not be visible to users.",
        })
    }

    const handleDeleteEvent = (eventId: number) => {
        setEvents(events.filter((event) => event._id !== eventId))
        toast({
            title: "Event Deleted",
            description: "The event has been permanently deleted.",
        })
    }

    const handleSaveEvent = () => {
        if (selectedEvent) {
            setEvents(
                filteredEvents.map((event) =>
                    event._id === selectedEvent._id
                        ? {
                            ...event,
                            title: editForm.title,
                            content: editForm.content,
                            start_date: editForm.start_date,
                            end_date: editForm.end_date,
                            location: editForm.location,
                            image: editForm.image,
                            status: editForm.status,
                        }
                        : event
                )
            )

            setIsEditDialogOpen(false)
            toast({
                title: "Event Updated",
                description: "The event has been successfully updated.",
            })
        }

    }

    const handleEditEvent = (event: AdminEvent) => {
        setSelectedEvent(event)
        setIsEditDialogOpen(true)
        setEditForm({
            title: event?.title || "",
            content: event?.content || "",
            start_date: event?.start_date || "",
            end_date: event?.end_date || "",
            location: event?.location || "",
            image: event?.image || "",
            status: event?.status || "",
        })
    }


    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filteredEvents.map((event) => (
                    <EventTableCard key={event._id} event={event} handleEditEvent={handleEditEvent} handleApproveEvent={handleApproveEvent} handleRejectEvent={handleRejectEvent} handleDeleteEvent={handleDeleteEvent} />
                ))}
            </div>

            {filteredEvents.length === 0 && (
                <Card>
                    <CardContent className="text-center py-12">
                        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                        <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                    </CardContent>
                </Card>
            )}

            {/* Edit Event Dialog */}
            <EditEventDialog isEditDialogOpen={isEditDialogOpen} setIsEditDialogOpen={setIsEditDialogOpen} editForm={editForm} setEditForm={setEditForm} handleSaveEvent={handleSaveEvent} />
        </div>
    )
}

export default EventTable