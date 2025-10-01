import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Download } from "lucide-react";
import { PastPaper } from "@/types/past-paper";

interface PaperCardProps {
    paper: PastPaper;
    onDownload: (paperId: number, title: string) => void;
}

export default function PaperCard({ paper, onDownload }: PaperCardProps) {
    return (
        <Card key={paper.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{paper.title}</CardTitle>
                        <p className="text-sm text-gray-600 mb-2">{paper.professor}</p>
                    </div>
                    <Badge variant="secondary">{paper.subject}</Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {paper.year} {paper.semester}
                        </div>
                        <Badge variant="outline">{paper.examType}</Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{paper.fileSize}</span>
                        <span>{paper.downloads.toLocaleString()} downloads</span>
                    </div>

                    <Button
                        onClick={() => onDownload(paper.id, paper.title)}
                        className="w-full"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Download Paper
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}