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
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { ApiErrorResponse } from "@/types/ApiErrorResponse";

interface UploadDocumentModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    fetchDocuments: () => void;
}

interface Department {
    _id: string;
    departmentName: string;
}

interface FormData {
    department_id: string;
    document_type: string;
    teacher_name?: string;
    title: string;
    document_url: string;
    subject_name: string;
    year?: string;
    semester: string;
    exam_type: string;
}

export default function UploadDocumentModal({ isOpen, onOpenChange, fetchDocuments }: UploadDocumentModalProps) {
    const [uploadType, setUploadType] = useState("past-paper");
    const [departments, setDepartments] = useState<Department[]>([]);
    const [isFetchingDeparts, setIsFetchingDeparts] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
        trigger
    } = useForm<FormData>({
        defaultValues: {
            department_id: "",
            document_type: "past-paper",
            teacher_name: "",
            title: "",
            document_url: "",
            subject_name: "",
            year: "",
            semester: "",
            exam_type: ""
        }
    });

    const fetchDepartments = async () => {
        try {
            setIsFetchingDeparts(true);
            const response = await axios.get('/api/departments');
            setDepartments(response.data.data || []);
        } catch (error) {
            console.error("Error fetching departments:", error);
        } finally {
            setIsFetchingDeparts(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchDepartments();
        }
    }, [isOpen]);

    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true);
            const res = await axios.post("/api/documents", data);
            toast({ title: 'Success', description: res.data.message, variant: "success" });
            fetchDocuments();
        } catch (error) {
            console.error("Error uploading document:", error);
            if (axios.isAxiosError(error)) {
                const serverError = error.response?.data as ApiErrorResponse;
                console.log("error in signup form ==>", error);
                toast({ title: 'Error', description: serverError?.message || "Failed to upload document", variant: 'destructive' })
            }
        } finally {
            reset();
            setLoading(false);
            onOpenChange(false);
        }
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            reset();
        }
        onOpenChange(open);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Upload New Document</DialogTitle>
                    <DialogDescription>Add a new document to the repository</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Department Field, Document Type */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="department_id">Department *</Label>
                            <Select
                                onValueChange={(value) => setValue("department_id", value)}
                                disabled={isFetchingDeparts}
                            >
                                <SelectTrigger
                                    className={`w-full ${errors.department_id ? "border-red-500" : ""}`}
                                >
                                    <SelectValue placeholder={isFetchingDeparts ? "Loading departments..." : "Select department"} />
                                </SelectTrigger>
                                <SelectContent className="w-full max-w-full">
                                    {departments.length > 0 ? (
                                        departments.map((dept) => (
                                            <SelectItem key={dept._id} value={dept._id} className="w-full">
                                                {dept.departmentName}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="no-departments" disabled className="w-full">
                                            No departments found
                                        </SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                            {errors.department_id && (
                                <p className="text-sm text-red-500">{errors.department_id.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="document_type">Document Type *</Label>
                            <Select
                                value={watch("document_type")}
                                onValueChange={(value) => {
                                    setValue("document_type", value);
                                    setUploadType(value);
                                }}
                            >
                                <SelectTrigger className={`w-full ${errors.document_type ? "border-red-500" : ""}`}>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="w-full">
                                    <SelectItem value="past-paper" className="w-full">Past Paper</SelectItem>
                                    <SelectItem value="study-material" className="w-full">Study Material</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.document_type && (
                                <p className="text-sm text-red-500">{errors.document_type.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Title  and Teacher Name */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="teacher_name">Teacher Name</Label>
                            <Input
                                id="teacher_name"
                                placeholder="Enter teacher's name"
                                {...register("teacher_name")}
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                placeholder="Enter paper title"
                                {...register("title", {
                                    required: "Title is required",
                                    minLength: { value: 1, message: "Title is required" }
                                })}
                                className={`w-full ${errors.title ? "border-red-500" : ""}`}
                            />
                            {errors.title && (
                                <p className="text-sm text-red-500">{errors.title.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Year and Subject */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="subject_name">Subject Name *</Label>
                            <Input
                                id="subject_name"
                                placeholder="Enter subject name"
                                {...register("subject_name", {
                                    required: "Subject name is required",
                                    minLength: { value: 1, message: "Subject name is required" }
                                })}
                                className={`w-full ${errors.subject_name ? "border-red-500" : ""}`}
                            />
                            {errors.subject_name && (
                                <p className="text-sm text-red-500">{errors.subject_name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="year">Year</Label>
                            <Input
                                id="year"
                                placeholder="Enter year (e.g., 2024)"
                                type="number"
                                min={2000}
                                max={2030}
                                {...register("year")}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Semester, and Exam Type */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="semester">Semester *</Label>
                            <Input
                                id="semester"
                                placeholder="Enter semester (1 to 8)"
                                type="number"
                                min={1}
                                max={8}
                                {...register("semester", {
                                    required: "Semester is required",
                                    min: { value: 1, message: "Semester must be between 1-8" },
                                    max: { value: 8, message: "Semester must be between 1-8" }
                                })}
                                className={`w-full ${errors.semester ? "border-red-500" : ""}`}
                            />
                            {errors.semester && (
                                <p className="text-sm text-red-500">{errors.semester.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="exam_type">Exam Type *</Label>
                            <Select
                                onValueChange={(value) => setValue("exam_type", value)}
                            >
                                <SelectTrigger className={`w-full ${errors.exam_type ? "border-red-500" : ""}`}>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent className="w-full">
                                    <SelectItem value="final" className="w-full">Final</SelectItem>
                                    <SelectItem value="midterm" className="w-full">Midterm</SelectItem>
                                    <SelectItem value="quiz" className="w-full">Repeater</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.exam_type && (
                                <p className="text-sm text-red-500">{errors.exam_type.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Document URL */}
                    <div className="space-y-2">
                        <Label htmlFor="document_url">Document URL * (Paste Google Drive or document URL)</Label>
                        <Input
                            id="document_url"
                            // placeholder=""
                            placeholder="https://drive.google.com/file/d/..."
                            {...register("document_url", {
                                required: "Document URL is required",
                                minLength: { value: 1, message: "Document URL is required" }
                            })}
                            className={`w-full ${errors.document_url ? "border-red-500" : ""}`}
                        />
                        {errors.document_url && (
                            <p className="text-sm text-red-500">{errors.document_url.message}</p>
                        )}
                        <p className="text-sm text-gray-500">
                            Paste your Google Drive shareable link or direct document URL
                        </p>
                    </div>

                    <DialogFooter className="flex gap-2 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOpenChange(false)}
                            className="w-full sm:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="w-full sm:w-auto">
                            {loading ? "Uploading..." : "Upload Document"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}