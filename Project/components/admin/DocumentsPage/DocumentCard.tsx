import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Edit, CheckCircle, XCircle, Trash2, BookOpen, Calendar, User, FileText } from "lucide-react";
import { Document } from "@/types/admin-documents";

interface DocumentCardProps {
    document: Document;
    type: "past-paper" | "policy-doc";
    // onApprove: (id: number, type: string) => void;
    onReject: (id: number, type: string) => void;
    onDelete: (id: number, type: string) => void;
}

export default function DocumentCard({ document, type, onReject, onDelete }: DocumentCardProps) {
    // const getStatusBadge = (status: string) => {
    //     switch (status) {
    //         case "approved":
    //             return (
    //                 <Badge className="bg-green-100 text-green-800">
    //                     <CheckCircle className="w-3 h-3 mr-1" />
    //                     Approved
    //                 </Badge>
    //             );
    //         case "pending":
    //             return (
    //                 <Badge className="bg-yellow-100 text-yellow-800">
    //                     <AlertCircle className="w-3 h-3 mr-1" />
    //                     Pending
    //                 </Badge>
    //             );
    //         case "rejected":
    //             return (
    //                 <Badge className="bg-red-100 text-red-800">
    //                     <XCircle className="w-3 h-3 mr-1" />
    //                     Rejected
    //                 </Badge>
    //             );
    //         default:
    //             return <Badge variant="secondary">{status}</Badge>;
    //     }
    // };

    const renderDocumentDetails = () => {
        if (type === "past-paper") {
            const paper = document as any;
            return (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-2" />
                        {paper.subject}
                    </div>
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {paper.year} {paper.semester}
                    </div>
                    <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        {paper.examType}
                    </div>
                    <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {paper.uploadedBy}
                    </div>
                </div>
            );
        } else {
            const doc = document as any;
            return (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        {doc.category}
                    </div>
                    <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        {doc.uploadedBy}
                    </div>
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Updated: {new Date(doc.lastUpdated).toLocaleDateString()}
                    </div>
                </div>
            );
        }
    };

    return (
        <Card key={document.id}>
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        {/* <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{document.title}</h3>
                            {getStatusBadge(document.status)}
                        </div> */}

                        {renderDocumentDetails()}

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span suppressHydrationWarning >Uploaded: {new Date(document.uploadDate).toLocaleDateString()}</span>
                            <span>Downloads: {document.downloads}</span>
                            <span>Size: {document.fileSize}</span>
                            <span>Type: {document.fileType}</span>
                        </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                            <Download className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                        </Button>

                        {/* {document.status === "pending" && (
                            <>
                                <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => onApprove(document.id, type)}
                                >
                                    <CheckCircle className="w-3 h-3" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => onReject(document.id, type)}
                                >
                                    <XCircle className="w-3 h-3" />
                                </Button>
                            </>
                        )} */}

                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onDelete(document.id, type)}
                        >
                            <Trash2 className="w-3 h-3" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function AlertCircle(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
    );
}