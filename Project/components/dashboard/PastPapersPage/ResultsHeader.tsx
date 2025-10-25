import { Card, CardContent } from "@/components/ui/card";
import { PastPaper } from "@/types/past-paper";

interface ResultsHeaderProps {
    filteredCount: number;
    totalCount: number;
    papers: PastPaper[];
}

export default function ResultsHeader({ filteredCount, totalCount, papers }: ResultsHeaderProps) {
    const pastPapersCount = papers.filter(p => p.document_type === "past-paper").length;
    const studyMaterialsCount = papers.filter(p => p.document_type === "study-material").length;

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h3 className="text-lg font-semibold">
                            Showing {filteredCount} of {totalCount} documents
                        </h3>
                        <p className="text-sm text-gray-600">
                            {pastPapersCount} past papers • {studyMaterialsCount} study materials
                        </p>
                    </div>

                    {filteredCount < totalCount && (
                        <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                            Filters applied
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}