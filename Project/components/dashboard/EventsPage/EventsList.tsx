import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import EventCard from "@/components/dashboard/EventsPage/EventCard";
import EventDialog from "@/components/dashboard/EventsPage/EventDialog";
import { Event } from "@/app/dashboard/events/page";

interface EventsListProps {
    events: Event[];
    onEventClick: (event: Event) => void;
}

export default function EventsList({ events, onEventClick }: EventsListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
                <div key={event._id} onClick={() => onEventClick(event)}>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="cursor-pointer">
                                <EventCard event={event} />
                            </div>
                        </DialogTrigger>
                        <EventDialog
                            event={event}
                            open={false}
                            onOpenChange={() => { }}
                        />
                    </Dialog>
                </div>
            ))}
        </div>
    );
}