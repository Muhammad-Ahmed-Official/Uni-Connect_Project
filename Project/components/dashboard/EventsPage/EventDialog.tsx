import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Check } from "lucide-react";

interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    endTime: string;
    location: string;
    organizer: string;
    category: string;
    attendees: number;
    maxAttendees: number;
    isRSVPed: boolean;
    tags: string[];
    image: string;
}

interface EventDialogProps {
    event: Event | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onRSVP: (eventId: number) => void;
}

export default function EventDialog({ event, open, onOpenChange, onRSVP }: EventDialogProps) {
    if (!event) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{event.title}</DialogTitle>
                    <DialogDescription>Organized by {event.organizer}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-48 object-cover rounded-lg"
                    />
                    <p className="text-gray-700 leading-relaxed">{event.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <span>
                                    {new Date(event.date).toLocaleDateString("en-US", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span>
                                    {event.time} - {event.endTime}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                                <MapPin className="h-4 w-4 text-gray-500" />
                                <span>{event.location}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <Users className="h-4 w-4 text-gray-500" />
                                <span>
                                    {event.attendees}/{event.maxAttendees} attending
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag: string) => (
                            <Badge key={tag} variant="outline">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button variant="outline">Share Event</Button>
                        <Button
                            onClick={() => onRSVP(event.id)}
                            className={event.isRSVPed ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                            {event.isRSVPed ? (
                                <>
                                    <Check className="h-4 w-4 mr-2" />
                                    RSVP'd
                                </>
                            ) : (
                                "RSVP Now"
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}