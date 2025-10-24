import CalendarView from "@/components/dashboard/EventsPage/CalendarView";
import EventsList from "@/components/dashboard/EventsPage/EventsList";
import EmptyState from "@/components/dashboard/EventsPage/EmptyState";
import { Event } from "@/app/dashboard/events/page";
import { EventsSkeletonGrid } from "./EventsSkeletonGrid";

interface EventsContentProps {
    viewMode: "calendar" | "list";
    events: Event[];
    onEventClick: (event: Event) => void;
    loading: boolean
}

export default function EventsContent({
    viewMode,
    events,
    onEventClick,
    loading
}: EventsContentProps) {
    if (loading) {
        return <EventsSkeletonGrid count={6} />;
    }

    if (events.length === 0 && !loading) {
        return <EmptyState />;
    }

    return viewMode === "calendar" ? (
        <CalendarView events={events} onEventClick={onEventClick} />
    ) : (
        <EventsList events={events} onEventClick={onEventClick} />
    );
}