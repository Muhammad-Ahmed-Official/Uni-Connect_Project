// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// interface DocumentFiltersProps {
//     searchTerm: string;
//     onSearchChange: (value: string) => void;
//     statusFilter: string;
//     onStatusFilterChange: (value: string) => void;
// }

// export default function DocumentFilters({
//     searchTerm,
//     onSearchChange,
//     statusFilter,
//     onStatusFilterChange,
// }: DocumentFiltersProps) {
//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>Document Filters</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <div className="flex flex-col md:flex-row gap-4">
//                     <div className="flex-1">
//                         <Input
//                             placeholder="Search documents..."
//                             value={searchTerm}
//                             onChange={(e) => onSearchChange(e.target.value)}
//                         />
//                     </div>
//                     <Select value={statusFilter} onValueChange={onStatusFilterChange}>
//                         <SelectTrigger className="w-full md:w-[180px]">
//                             <SelectValue placeholder="Filter by status" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="all">All Status</SelectItem>
//                             <SelectItem value="approved">Approved</SelectItem>
//                             <SelectItem value="pending">Pending</SelectItem>
//                             <SelectItem value="rejected">Rejected</SelectItem>
//                         </SelectContent>
//                     </Select>
//                 </div>
//             </CardContent>
//         </Card>
//     );
// }