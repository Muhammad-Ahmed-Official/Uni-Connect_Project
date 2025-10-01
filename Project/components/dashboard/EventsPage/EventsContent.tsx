import CalendarView from "@/components/dashboard/EventsPage/CalendarView";
import EventsList from "@/components/dashboard/EventsPage/EventsList";
import EmptyState from "@/components/dashboard/EventsPage/EmptyState";

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

interface EventsContentProps {
    viewMode: "calendar" | "list";
    events: Event[];
    onEventClick: (event: Event) => void;
    onRSVP: (eventId: number) => void;
}

export default function EventsContent({
    viewMode,
    events,
    onEventClick,
    onRSVP
}: EventsContentProps) {
    if (events.length === 0) {
        return <EmptyState />;
    }

    return viewMode === "calendar" ? (
        <CalendarView events={events} onEventClick={onEventClick} />
    ) : (
        <EventsList events={events} onRSVP={onRSVP} />
    );
}