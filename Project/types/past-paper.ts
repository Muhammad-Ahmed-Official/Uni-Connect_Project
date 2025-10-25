export interface PastPaper {
    _id: string;
    title: string;
    document_url: string;
    subject_name: string;
    department_id: {
        _id: string;
        departmentName: string;
    };
    year?: string;
    semester: string;
    document_type: string;
    exam_type: string;
    teacher_name?: string;
    totalDownloads: number;
    view: number;
    createdAt: string;
    user_id?: {
        firstName: string;
        lastName: string;
        email: string;
    };
}