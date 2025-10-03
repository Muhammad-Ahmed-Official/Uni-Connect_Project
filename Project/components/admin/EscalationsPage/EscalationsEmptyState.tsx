import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function EscalationsEmptyState() {
    return (
        <Card>
            <CardContent className="text-center py-12">
                <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No escalations found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </CardContent>
        </Card>
    );
}