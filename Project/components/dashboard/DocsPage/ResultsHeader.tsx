import { FileText } from "lucide-react";
import { Document } from "@/types/document";

interface ResultsHeaderProps {
    filteredCount: number;
    totalCount: number;
    documents: Document[];
}

export default function ResultsHeader({ filteredCount, totalCount, documents }: ResultsHeaderProps) {
    const totalDownloads = documents.reduce((sum, doc) => sum + doc.downloads, 0);

    return (
        <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">
                Showing {filteredCount} of {totalCount} documents
            </p>
            <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                    Total Downloads: {totalDownloads.toLocaleString()}
                </span>
            </div>
        </div>
    );
}