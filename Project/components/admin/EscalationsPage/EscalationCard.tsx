import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, UserCheck, CheckCircle, User, Calendar, UserCheck as UserCheckIcon, Clock, FileText, AlertCircleIcon } from "lucide-react";
import { Escalation } from "@/types/admin-escalations";

interface EscalationCardProps {
    escalation: Escalation;
    onView: (escalation: Escalation) => void;
    onAssign: (escalation: Escalation) => void;
    onStatusChange: (id: number, status: "pending" | "in-progress" | "resolved") => void;
    onResolve: (id: number) => void;
}

export default function EscalationCard({
    escalation,
    onView,
    onAssign,
    onStatusChange,
    onResolve,
}: EscalationCardProps) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return (
                    <Badge className="bg-yellow-100 text-yellow-800">
                        <AlertCircleIcon className="w-3 h-3 mr-1" />
                        Pending
                    </Badge>
                );
            case "in-progress":
                return (
                    <Badge className="bg-blue-100 text-blue-800">
                        <Clock className="w-3 h-3 mr-1" />
                        In Progress
                    </Badge>
                );
            case "resolved":
                return (
                    <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Resolved
                    </Badge>
                );
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case "High":
                return <Badge className="bg-red-100 text-red-800">High</Badge>;
            case "Medium":
                return <Badge className="bg-orange-100 text-orange-800">Medium</Badge>;
            case "Low":
                return <Badge className="bg-gray-100 text-gray-800">Low</Badge>;
            default:
                return <Badge variant="secondary">{priority}</Badge>;
        }
    };

    const getCategoryBadge = (category: string) => {
        const colors: Record<string, string> = {
            Academic: "bg-blue-100 text-blue-800",
            Financial: "bg-green-100 text-green-800",
            Housing: "bg-purple-100 text-purple-800",
            Technical: "bg-orange-100 text-orange-800",
            Other: "bg-gray-100 text-gray-800",
        };
        return <Badge className={colors[category] || "bg-gray-100 text-gray-800"}>{category}</Badge>;
    };

    return (
        <Card key={escalation.id}>
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{escalation.title}</h3>
                            {getStatusBadge(escalation.status)}
                            {getPriorityBadge(escalation.priority)}
                            {getCategoryBadge(escalation.category)}
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-2">{escalation.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                {escalation.student} ({escalation.studentId})
                            </div>
                            <div className="flex items-center" suppressHydrationWarning>
                                <Calendar className="w-4 h-4 mr-2" />
                                {new Date(escalation.submittedDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                                <UserCheckIcon className="w-4 h-4 mr-2" />
                                {escalation.assignedAdvisor || "Unassigned"}
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                {escalation.responseTime || "No response yet"}
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Department: {escalation.department}</span>
                            {escalation.attachments.length > 0 && (
                                <span className="flex items-center">
                                    <FileText className="w-4 h-4 mr-1" />
                                    {escalation.attachments.length} attachment(s)
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onView(escalation)}
                        >
                            <Eye className="w-3 h-3" />
                        </Button>
                        {escalation.status === "pending" && (
                            <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={() => onAssign(escalation)}
                            >
                                <UserCheck className="w-3 h-3 mr-1" />
                                Assign
                            </Button>
                        )}
                        {escalation.status === "in-progress" && (
                            <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => onResolve(escalation.id)}
                            >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Resolve
                            </Button>
                        )}
                        <Select
                            value={escalation.status}
                            onValueChange={(value: "pending" | "in-progress" | "resolved") => onStatusChange(escalation.id, value)}
                        >
                            <SelectTrigger className="w-32">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
