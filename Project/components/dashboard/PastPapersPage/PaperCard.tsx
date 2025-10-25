import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Download, User, Building, Eye } from "lucide-react";
import { PastPaper } from "@/types/past-paper";
import { useState } from "react";
import DocumentPreview from "./DocumentPreview";
import axios from "axios";

interface PaperCardProps {
    paper: PastPaper;
}

export default function PaperCard({ paper }: PaperCardProps) {
    const [showPreview, setShowPreview] = useState(false);
    const [downloads, setDownloads] = useState(paper.totalDownloads);
    const [views, setViews] = useState(paper.view);
    const [isViewing, setIsViewing] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const formatExamType = (type: string) => {
        const typeMap: { [key: string]: string } = {
            "final": "Final",
            "midterms": "Midterm",
            "quiz": "Repeater"
        };
        return typeMap[type] || type;
    };

    const handleDownload = async () => {
        try {
            setIsDownloading(true);
            const response = await axios.post(`/api/documents/${paper._id}/download`);

            const data = response.data;
            setDownloads(data.totalDownloads);

            window.open(paper.document_url, '_blank');
        } catch (error) {
            console.error('Download tracking error:', error);
            window.open(paper.document_url, '_blank');
        } finally {
            setIsDownloading(false);
        }
    };

    const handlePreviewOpen = async () => {
        try {
            setIsViewing(true);
            const response = await axios.post(`/api/documents/${paper._id}/view`);

            const data = response.data;
            setViews(data.totalViews);

            setShowPreview(true);
        } catch (error) {
            console.error('View tracking error:', error);
            setShowPreview(true);
        } finally {
            setIsViewing(false);
        }
    };

    return (
        <>
            <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
                <CardHeader className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary" className="mb-2">
                            {paper.department_id.departmentName}
                        </Badge>
                        <Badge variant="outline">
                            {paper.document_type === "past-paper" ? "Past Paper" : "Study Material"}
                        </Badge>
                    </div>

                    <CardTitle className="text-lg mb-3 line-clamp-2">
                        {paper.title}
                    </CardTitle>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Building className="h-4 w-4" />
                            <span>{paper.subject_name}</span>
                        </div>

                        {paper.teacher_name && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <User className="h-4 w-4" />
                                <span>{paper.teacher_name}</span>
                            </div>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="flex flex-col justify-end">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>Sem {paper.semester}</span>
                                {paper.year && <span>• {paper.year}</span>}
                            </div>
                            <Badge variant="outline">
                                {formatExamType(paper.exam_type)}
                            </Badge>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{downloads} downloads</span>
                            <span>{views} views</span>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={handlePreviewOpen}
                                variant="outline"
                                className="flex-1"
                            >
                                <Eye className="h-4 w-4 mr-2" />
                                {isViewing ? "Viewing..." : "Preview"}
                            </Button>
                            <Button
                                onClick={handleDownload}
                                className="flex-1"
                                variant="default"
                            >
                                <Download className="h-4 w-4 mr-2" />
                                { isDownloading ? "Downloading..." : "Download"}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Preview Modal */}
            <DocumentPreview
                documentUrl={paper.document_url}
                title={paper.title}
                isOpen={showPreview}
                onClose={() => setShowPreview(false)}
                handleDownload={handleDownload}
                isDownloading={isDownloading}
            />
        </>
    );
}   