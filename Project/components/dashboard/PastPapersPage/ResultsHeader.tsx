import { FileText } from "lucide-react";
import { PastPaper } from "@/types/past-paper";

interface ResultsHeaderProps {
    filteredCount: number;
    totalCount: number;
    papers: PastPaper[];
}

export default function ResultsHeader({ filteredCount, totalCount, papers }: ResultsHeaderProps) {
    const totalDownloads = papers.reduce((sum, paper) => sum + paper.downloads, 0);

    return (
        <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">
                Showing {filteredCount} of {totalCount}
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