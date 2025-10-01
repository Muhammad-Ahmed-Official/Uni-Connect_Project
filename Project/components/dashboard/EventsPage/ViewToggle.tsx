import { Button } from "@/components/ui/button";
import { CalendarDays, List } from "lucide-react";

interface ViewToggleProps {
    viewMode: "calendar" | "list";
    onViewModeChange: (mode: "calendar" | "list") => void;
}

export default function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
    return (
        <div className="flex items-center space-x-2">
            <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => onViewModeChange("list")}
            >
                <List className="h-4 w-4 mr-2" />
                List
            </Button>
            <Button
                variant={viewMode === "calendar" ? "default" : "outline"}
                size="sm"
                onClick={() => onViewModeChange("calendar")}
            >
                <CalendarDays className="h-4 w-4 mr-2" />
                Calendar
            </Button>
        </div>
    );
}