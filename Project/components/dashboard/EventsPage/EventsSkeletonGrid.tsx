import { EventCardSkeleton } from "./EventCardSkeleton";

interface EventsSkeletonGridProps {
    count?: number;
}

export function EventsSkeletonGrid({ count = 6 }: EventsSkeletonGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <EventCardSkeleton key={index} />
            ))}
        </div>
    );
}