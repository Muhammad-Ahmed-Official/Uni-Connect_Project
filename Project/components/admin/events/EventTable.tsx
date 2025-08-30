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
    category: string
    description: string
    date: string
    time: string
    location: string
    capacity: number
    image: string
    status: string
    organizer: string
    rsvps: number
}

const EventTable = ({ filteredEvents, setEvents, events }: EventTableProps) => {
    const [selectedEvent, setSelectedEvent] = useState<AdminEvent | null>(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false)
    const [editForm, setEditForm] = useState<EventFormValues>({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        category: "",
        status: "",
        capacity: 0,
        rsvps: 0,
        organizer: "",
        image: "",
    })

    const handleApproveEvent = (eventId: number) => {
        setEvents(events.map((event) => (event.id === eventId ? { ...event, status: "approved" } : event)))
        toast({
            title: "Event Approved",
            description: "The event has been approved and is now visible to users.",
        })
    }

    const handleRejectEvent = (eventId: number) => {
        setEvents(events.map((event) => (event.id === eventId ? { ...event, status: "rejected" } : event)))
        toast({
            title: "Event Rejected",
            description: "The event has been rejected and will not be visible to users.",
        })
    }

    const handleDeleteEvent = (eventId: number) => {
        setEvents(events.filter((event) => event.id !== eventId))
        toast({
            title: "Event Deleted",
            description: "The event has been permanently deleted.",
        })
    }

    const handleSaveEvent = () => {
        if (selectedEvent) {
            setEvents(
                filteredEvents.map((event) =>
                    event.id === selectedEvent.id
                        ? {
                            ...event,
                            title: editForm.title,
                            description: editForm.description,
                            date: editForm.date,
                            time: editForm.time,
                            location: editForm.location,
                            category: editForm.category,
                            status: editForm.status,
                            capacity: editForm.capacity,
                            organizer: editForm.organizer,
                            image: editForm.image,
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
            description: event?.description || "",
            date: event?.date || "",
            time: event?.time || "",
            location: event?.location || "",
            category: event?.category || "",
            status: event?.status || "",
            capacity: event?.capacity || 0,
            rsvps: event?.rsvps || 0,
            organizer: event?.organizer || "",
            image: event?.image || "",
        })
    }

    console.log("editForm", editForm.category)

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filteredEvents.map((event) => (
                    <EventTableCard key={event.id} event={event} handleEditEvent={handleEditEvent} handleApproveEvent={handleApproveEvent} handleRejectEvent={handleRejectEvent} handleDeleteEvent={handleDeleteEvent} />
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