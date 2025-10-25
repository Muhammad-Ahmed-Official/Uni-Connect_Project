import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface SearchFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    selectedDepartment: string;
    onDepartmentChange: (value: string) => void;
    selectedExamType: string;
    onExamTypeChange: (value: string) => void;
    departments: string[];
    examTypes: string[];
    loading: boolean;
}

export default function SearchFilters({
    searchTerm,
    onSearchChange,
    selectedDepartment,
    onDepartmentChange,
    selectedExamType,
    onExamTypeChange,
    departments,
    examTypes,
    loading,
}: SearchFiltersProps) {
    const formatExamType = (type: string) => {
        const typeMap: { [key: string]: string } = {
            "final": "Final",
            "midterms": "Midterm",
            "quiz": "Repeater"
        };
        return typeMap[type] || type;
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Search & Filter
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search by title, subject or teacher..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-10"
                            disabled={loading}
                        />
                    </div>

                    <Select
                        value={selectedDepartment}
                        onValueChange={onDepartmentChange}
                        disabled={loading || departments.length === 0}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                            {departments.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                    {dept}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={selectedExamType}
                        onValueChange={onExamTypeChange}
                        disabled={loading}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Exam Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {examTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type === "All Types" ? "All Types" : formatExamType(type)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
}