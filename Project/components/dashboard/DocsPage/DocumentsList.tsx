import DocumentCard from "@/components/dashboard/DocsPage/DocumentCard";
import { Document } from "@/types/document";
import EmptyState from "./EmptyState";

interface DocumentsListProps {
    documents: Document[];
    onPreview: (docId: number, title: string) => void;
    onDownload: (docId: number, title: string) => void;
}

export default function DocumentsList({ documents, onPreview, onDownload }: DocumentsListProps) {
    if (documents.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="space-y-4">
            {documents.map((document) => (
                <DocumentCard
                    key={document.id}
                    document={document}
                    onPreview={onPreview}
                    onDownload={onDownload}
                />
            ))}
        </div>
    );
}