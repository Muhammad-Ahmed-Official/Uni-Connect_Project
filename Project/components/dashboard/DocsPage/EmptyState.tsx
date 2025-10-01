import { FileText } from "lucide-react";

export default function EmptyState() {
    return (
        <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or category filter</p>
        </div>
    );
}