import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";

interface UploadDocumentDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onUpload: () => void;
}

export default function UploadDocumentDialog({ isOpen, onOpenChange, onUpload }: UploadDocumentDialogProps) {
    const [uploadType, setUploadType] = useState("past-paper");

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Upload New Document</DialogTitle>
                    <DialogDescription>Add a new document to the repository</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="document-type">Document Type</Label>
                        <Select value={uploadType} onValueChange={setUploadType}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="past-paper">Past Paper</SelectItem>
                                <SelectItem value="policy-doc">Policy Document</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {uploadType === "past-paper" ? (
                        <PastPaperForm />
                    ) : (
                        <PolicyDocForm />
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="file">Upload File</Label>
                        <Input id="file" type="file" accept=".pdf,.doc,.docx" />
                        <p className="text-sm text-gray-500">Supported formats: PDF, DOC, DOCX (Max 10MB)</p>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={onUpload}>
                        Upload Document
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function PastPaperForm() {
    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Paper Title</Label>
                    <Input id="title" placeholder="Enter paper title" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="computer-science">Computer Science</SelectItem>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="chemistry">Chemistry</SelectItem>
                            <SelectItem value="physics">Physics</SelectItem>
                            <SelectItem value="biology">Biology</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                            <SelectItem value="2022">2022</SelectItem>
                            <SelectItem value="2021">2021</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="spring">Spring</SelectItem>
                            <SelectItem value="fall">Fall</SelectItem>
                            <SelectItem value="summer">Summer</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="exam-type">Exam Type</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="final">Final</SelectItem>
                            <SelectItem value="midterm">Midterm</SelectItem>
                            <SelectItem value="quiz">Quiz</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </>
    );
}

function PolicyDocForm() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="doc-title">Document Title</Label>
                <Input id="doc-title" placeholder="Enter document title" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="academic-policies">Academic Policies</SelectItem>
                        <SelectItem value="research-policies">Research Policies</SelectItem>
                        <SelectItem value="financial-policies">Financial Policies</SelectItem>
                        <SelectItem value="student-services">Student Services</SelectItem>
                        <SelectItem value="administrative">Administrative</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}