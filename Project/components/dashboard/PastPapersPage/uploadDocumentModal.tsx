import { useEffect, useState } from "react";
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
import axios from "axios";

interface uploadDocumentModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onUpload: () => void;
}

interface Department{
    _id: string;
  departmentName: string;
}

export default function UploadDocumentModal({ isOpen, onOpenChange, onUpload }: uploadDocumentModalProps) {
    const [uploadType, setUploadType] = useState("past-paper");
    const [departments, setDepartments] = useState<Department[]>([]);
    const [isFetchingDeparts, setIsFetchingDeparts] = useState(false);

    const fetchDepartments = async () => {
        try {
            setIsFetchingDeparts(true);
            const response = await axios.get('/api/departments');
            setDepartments(response.data.data || []);
        }
        catch (error) {
            console.error("Error fetching departments:", error);
        } finally {
            setIsFetchingDeparts(false);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, [])

    console.log(departments)

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
                        <Label htmlFor="department">Department</Label>
                        <Select disabled={isFetchingDeparts}>
                            <SelectTrigger>
                                <SelectValue placeholder={isFetchingDeparts ? "Loading departments..." : "Select department"} />
                            </SelectTrigger>
                            <SelectContent>
                                {departments.length > 0 ? (
                                    departments.map((dept) => (
                                        <SelectItem key={dept._id} value={dept._id}>
                                            {dept.departmentName}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="no-departments" disabled>
                                        No departments found
                                    </SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="document-type">Document Type</Label>
                            <Select value={uploadType} onValueChange={setUploadType}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="past-paper">Past Paper</SelectItem>
                                    <SelectItem value="policy-doc">Study Material</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="teacher">Teacher Name</Label>
                            <Input id="teacher" placeholder="Enter teacher's name" />
                        </div>
                    </div>
                </div>
                {/* --- */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
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
                        <Input
                            id="year"
                            placeholder="Enter year (e.g., 2024)"
                            type="number"
                            min={1} // Agar sirf numbers chahiye
                            maxLength={4} // Sirf 4 digits allow karega
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="semester">Semester</Label>
                        <Input
                            id="semester-input"
                            placeholder="Enter semester (1 to 8)"
                            type="number"
                            min={1} // User 1 se chota number enter nahi kar sakta
                            max={8} // User 8 se bada number enter nahi kar sakta
                        />
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
                                <SelectItem value="quiz">Repeater</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                {/* ----- */}


                <div className="space-y-2">
                    <Label htmlFor="file">Upload File</Label>
                    <Input id="file" type="file" accept=".pdf,.doc,.docx" />
                    <p className="text-sm text-gray-500">Supported formats: PDF, DOC, DOCX (Max 10MB)</p>
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

