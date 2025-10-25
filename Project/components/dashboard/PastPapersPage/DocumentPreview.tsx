"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Download, ExternalLink, X } from "lucide-react";

interface DocumentPreviewProps {
    documentUrl: string;
    title: string;
    isOpen: boolean;
    onClose: () => void;
    handleDownload: () => void;
    isDownloading: boolean;
}

export default function DocumentPreview({ documentUrl, title, isOpen, onClose, handleDownload, isDownloading }: DocumentPreviewProps) {
    const [isLoading, setIsLoading] = useState(true);

    const getPreviewUrl = (url: string) => {
        const fileIdMatch = url.match(/[-\w]{25,}/);
        if (!fileIdMatch) return url;

        const fileId = fileIdMatch[0];
        return `https://drive.google.com/file/d/${fileId}/preview`;
    };

    const previewUrl = getPreviewUrl(documentUrl);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="p-0 overflow-hidden bg-white border-0 shadow-2xl flex flex-col gap-0"
                style={{
                    width: '95vw',
                    height: '90vh',
                    maxWidth: '1400px',
                    borderRadius: '0.5rem'
                }}
            >
                {/* Header */}
                <DialogHeader>
                    <DialogTitle className="flex items-center p-4 gap-4">
                        <Eye className="h-5 w-5 text-blue-600" />
                        {title}
                    </DialogTitle>
                </DialogHeader>

                {/* Preview Content */}
                <div className="flex-1 min-h-0">
                    <div className="relative w-full h-full bg-gray-100 rounded-lg border">
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg">
                                <div className="text-gray-500">Loading document preview...</div>
                            </div>
                        )}

                        <iframe
                            src={previewUrl}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            onLoad={() => setIsLoading(false)}
                            className="rounded-lg"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-t bg-gray-50">
                    <div className="text-sm text-gray-600">
                        Document preview powered by Google Drive
                    </div>
                    <div className="flex gap-2 flex-wrap justify-center">
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                        >
                            <a
                                href={documentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                            >
                                <ExternalLink className="h-4 w-4" />
                                New Tab
                            </a>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDownload}
                        >
                                <Download className="h-4 w-4" />
                                {isDownloading ? "Downloading..." : "Download"}
                        </Button>
                        <Button
                            onClick={onClose}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}