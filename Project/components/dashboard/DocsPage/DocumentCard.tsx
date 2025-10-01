import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Tag, Eye, Download } from "lucide-react";
import { Document } from "@/types/document";

interface DocumentCardProps {
    document: Document;
    onPreview: (docId: number, title: string) => void;
    onDownload: (docId: number, title: string) => void;
}

export default function DocumentCard({ document: doc, onPreview, onDownload }: DocumentCardProps) {
    return (
        <Card key={doc.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{doc.title}</h3>
                            {doc.isNew && <Badge className="bg-green-100 text-green-800">New</Badge>}
                        </div>

                        <p className="text-gray-600 mb-3">{doc.description}</p>

                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(doc.uploadDate).toLocaleDateString()}
                            </div>
                            <span>{doc.fileSize}</span>
                            <span>{doc.downloads.toLocaleString()} downloads</span>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                            <Badge variant="secondary">{doc.category}</Badge>
                            {doc.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                    <Tag className="h-3 w-3 mr-1" />
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onPreview(doc.id, doc.title)}
                        >
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                        </Button>
                        <Button
                            size="sm"
                            onClick={() => onDownload(doc.id, doc.title)}
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}