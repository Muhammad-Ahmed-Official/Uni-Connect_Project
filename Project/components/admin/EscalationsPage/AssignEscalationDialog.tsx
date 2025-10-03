import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Escalation, Advisor } from "@/types/admin-escalations";

interface AssignEscalationDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    escalation: Escalation | null;
    advisors: Advisor[];
    onAssign: (escalationId: number, advisorName: string) => void;
}

export default function AssignEscalationDialog({
    isOpen,
    onOpenChange,
    escalation,
    advisors,
    onAssign,
}: AssignEscalationDialogProps) {
    if (!escalation) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Assign Escalation</DialogTitle>
                    <DialogDescription>Select an advisor to handle this escalation</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium">{escalation.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">Student: {escalation.student}</p>
                        <p className="text-sm text-gray-600">Category: {escalation.category}</p>
                    </div>
                    <div className="space-y-2">
                        <Label>Select Advisor</Label>
                        <div className="grid gap-2">
                            {advisors.map((advisor) => (
                                <Button
                                    key={advisor.id}
                                    variant="outline"
                                    className="justify-between h-auto p-4 bg-transparent"
                                    onClick={() => onAssign(escalation.id, advisor.name)}
                                >
                                    <div className="text-left">
                                        <div className="font-medium">{advisor.name}</div>
                                        <div className="text-sm text-gray-500">{advisor.department}</div>
                                    </div>
                                    <Badge variant="secondary">{advisor.activeEscalations} active</Badge>
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}