import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, CheckCircle, Paperclip } from "lucide-react";
import { Escalation } from "@/types/advisor";

interface EscalationStatusProps {
    escalation: Escalation;
}

export default function EscalationStatus({ escalation }: EscalationStatusProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            case "In Progress":
                return "bg-blue-100 text-blue-800";
            case "Resolved":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Pending":
                return <Clock className="h-4 w-4" />;
            case "In Progress":
                return <AlertCircle className="h-4 w-4" />;
            case "Resolved":
                return <CheckCircle className="h-4 w-4" />;
            default:
                return <Clock className="h-4 w-4" />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "Urgent":
                return "bg-red-100 text-red-800";
            case "High":
                return "bg-orange-100 text-orange-800";
            case "Medium":
                return "bg-blue-100 text-blue-800";
            case "Low":
                return "bg-gray-100 text-gray-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{escalation.title}</CardTitle>
                    <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(escalation.priority)}>
                            {escalation.priority}
                        </Badge>
                        <Badge className={getStatusColor(escalation.status)}>
                            {getStatusIcon(escalation.status)}
                            <span className="ml-1">{escalation.status}</span>
                        </Badge>
                    </div>
                </div>
                <CardDescription>
                    Advisor: {escalation.advisor} • {escalation.department}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-gray-700 mb-4">{escalation.description}</p>
                {escalation.attachments.length > 0 && (
                    <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Attachments:</h4>
                        <div className="flex flex-wrap gap-2">
                            {escalation.attachments.map((attachment, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                    <Paperclip className="h-3 w-3 mr-1" />
                                    {attachment}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Submitted: {new Date(escalation.submittedDate).toLocaleDateString()}</span>
                    <span>Last updated: {new Date(escalation.lastUpdate).toLocaleDateString()}</span>
                </div>
            </CardContent>
        </Card>
    );
}