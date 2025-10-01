import PaperCard from "@/components/dashboard/PastPapersPage/PaperCard";
import { PastPaper } from "@/types/past-paper";
import EmptyState from "./EmptyState";

interface PapersGridProps {
    papers: PastPaper[];
    onDownload: (paperId: number, title: string) => void;
}

export default function PapersGrid({ papers, onDownload }: PapersGridProps) {
    if (papers.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {papers.map((paper) => (
                <PaperCard
                    key={paper.id}
                    paper={paper}
                    onDownload={onDownload}
                />
            ))}
        </div>
    );
}