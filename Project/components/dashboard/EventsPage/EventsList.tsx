import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EventCard from "@/components/dashboard/EventsPage/EventCard";
import EventDialog from "@/components/dashboard/EventsPage/EventDialog";

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

interface EventsListProps {
    events: Event[];
    onRSVP: (eventId: number) => void;
}

export default function EventsList({ events, onRSVP }: EventsListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
                <div key={event.id}>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="cursor-pointer">
                                <EventCard event={event} onRSVP={onRSVP} />
                            </div>
                        </DialogTrigger>
                        <EventDialog
                            event={event}
                            open={false}
                            onOpenChange={() => { }}
                            onRSVP={onRSVP}
                        />
                    </Dialog>
                </div>
            ))}
        </div>
    );
}