import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { Escalation } from "@/types/admin-escalations";

interface ViewEscalationDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    escalation: Escalation | null;
    getStatusBadge: (status: string) => React.ReactNode;
    getPriorityBadge: (priority: string) => React.ReactNode;
}

export default function ViewEscalationDialog({
    isOpen,
    onOpenChange,
    escalation,
    getStatusBadge,
    getPriorityBadge,
}: ViewEscalationDialogProps) {
    if (!escalation) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Escalation Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{escalation.title}</h3>
                        {getStatusBadge(escalation.status)}
                        {getPriorityBadge(escalation.priority)}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <Label className="text-gray-500">Student</Label>
                            <p>
                                {escalation.student} ({escalation.studentId})
                            </p>
                        </div>
                        <div>
                            <Label className="text-gray-500">Department</Label>
                            <p>{escalation.department}</p>
                        </div>
                        <div>
                            <Label className="text-gray-500">Submitted</Label>
                            <p>{new Date(escalation.submittedDate).toLocaleString()}</p>
                        </div>
                        <div>
                            <Label className="text-gray-500">Assigned Advisor</Label>
                            <p>{escalation.assignedAdvisor || "Unassigned"}</p>
                        </div>
                    </div>
                    <div>
                        <Label className="text-gray-500">Description</Label>
                        <p className="mt-1">{escalation.description}</p>
                    </div>
                    {escalation.attachments.length > 0 && (
                        <div>
                            <Label className="text-gray-500">Attachments</Label>
                            <div className="mt-1 space-y-1">
                                {escalation.attachments.map((attachment, index) => (
                                    <div key={index} className="flex items-center text-sm text-blue-600">
                                        <FileText className="w-4 h-4 mr-2" />
                                        {attachment}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}