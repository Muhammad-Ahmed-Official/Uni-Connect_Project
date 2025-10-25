import React from "react";
import PaperCard from "@/components/dashboard/PastPapersPage/PaperCard";
import { PastPaper } from "@/types/past-paper";
import EmptyState from "./EmptyState";

interface PapersGridProps {
    papers: PastPaper[];
}

export default function PapersGrid({ papers }: PapersGridProps) {
    if (papers.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {papers.map((paper) => (
                <PaperCard
                    key={paper._id}
                    paper={paper}
                />
            ))}
        </div>
    );
}