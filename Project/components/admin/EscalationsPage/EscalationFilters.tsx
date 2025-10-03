import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EscalationFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    statusFilter: string;
    onStatusFilterChange: (value: string) => void;
    priorityFilter: string;
    onPriorityFilterChange: (value: string) => void;
    categoryFilter: string;
    onCategoryFilterChange: (value: string) => void;
}

export default function EscalationFilters({
    searchTerm,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
    priorityFilter,
    onPriorityFilterChange,
    categoryFilter,
    onCategoryFilterChange,
}: EscalationFiltersProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Escalation Filters</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="md:col-span-2">
                        <Input
                            placeholder="Search escalations, students, or IDs..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={priorityFilter} onValueChange={onPriorityFilterChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Priority</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="Academic">Academic</SelectItem>
                            <SelectItem value="Financial">Financial</SelectItem>
                            <SelectItem value="Housing">Housing</SelectItem>
                            <SelectItem value="Technical">Technical</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
}