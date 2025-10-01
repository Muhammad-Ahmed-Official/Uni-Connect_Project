export interface Document {
    id: number;
    title: string;
    category: string;
    description: string;
    uploadDate: string;
    fileSize: string;
    downloads: number;
    tags: string[];
    isNew: boolean;
}