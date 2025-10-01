import EscalationStatus from "@/components/dashboard/AdvisorsPage/EscalationStatus";
import { Escalation } from "@/types/advisor";
import { MessageSquare } from "lucide-react";

interface EscalationsListProps {
    escalations: Escalation[];
}

export default function EscalationsList({ escalations }: EscalationsListProps) {
    if (escalations.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No escalations yet</h3>
                <p className="text-gray-500">Contact an advisor to get started with your first escalation</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {escalations.map((escalation) => (
                <EscalationStatus key={escalation.id} escalation={escalation} />
            ))}
        </div>
    );
}