import Filters from "@/components/dashboard/common/Filters";
import ViewToggle from "@/components/dashboard/EventsPage/ViewToggle";

interface EventsHeaderProps {
    categoryFilter: string;
    onCategoryFilterChange: (filter: string) => void;
    viewMode: "calendar" | "list";
    onViewModeChange: (mode: "calendar" | "list") => void;
    eventsCount: number;
}

export default function EventsHeader({
    categoryFilter,
    onCategoryFilterChange,
    viewMode,
    onViewModeChange,
    eventsCount
}: EventsHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <Filters
                options={["All", "Computer Science", "Pharmacy", "Mass Communication", "Law"]}
                currentFilter={categoryFilter}
                setCurrentFilter={onCategoryFilterChange}
                count={eventsCount}
                countLabel="upcoming events"
                label="Categories"
            />
            <ViewToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
        </div>
    );
}