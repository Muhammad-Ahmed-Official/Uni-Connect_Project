import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Paperclip, Send, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Advisor, EscalationFormData } from "@/types/advisor";

interface EscalationFormProps {
    advisor: Advisor;
    onSubmit: (data: any) => void;
    onClose: () => void;
}

export default function EscalationForm({ advisor, onSubmit, onClose }: EscalationFormProps) {
    const [formData, setFormData] = useState<EscalationFormData>({
        title: "",
        description: "",
        priority: "",
        category: "",
    });
    const [attachments, setAttachments] = useState<File[]>([]);
    const { toast } = useToast();

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        setAttachments([...attachments, ...files]);
    };

    const removeAttachment = (index: number) => {
        setAttachments(attachments.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.description || !formData.priority) {
            toast({
                title: "Missing Information",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
            return;
        }

        const escalationData = {
            ...formData,
            advisor: advisor.name,
            department: advisor.department,
            attachments: attachments.map((file) => file.name),
            submittedDate: new Date().toISOString().split("T")[0],
            status: "Pending",
        };

        onSubmit(escalationData);
        toast({
            title: "Escalation Submitted",
            description: `Your request has been sent to ${advisor.name}. You'll receive a response within ${advisor.responseTime.toLowerCase()}.`,
        });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Avatar className="w-12 h-12">
                    <AvatarImage src={advisor.image || "/placeholder.svg"} alt={advisor.name} />
                    <AvatarFallback>
                        {advisor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-medium">{advisor.name}</h3>
                    <p className="text-sm text-gray-600">
                        {advisor.department} • {advisor.title}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level *</Label>
                    <Select
                        value={formData.priority}
                        onValueChange={(value) => setFormData({ ...formData, priority: value })}
                    >
                        <SelectTrigger className="cursor-pointer">
                            <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className="cursor-pointer hover:bg-gray-100" value="Low">Low</SelectItem>
                            <SelectItem className="cursor-pointer hover:bg-gray-100" value="Medium">Medium</SelectItem>
                            <SelectItem className="cursor-pointer hover:bg-gray-100" value="High">High</SelectItem>
                            <SelectItem className="cursor-pointer hover:bg-gray-100" value="Urgent">Urgent</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                        <SelectTrigger className="cursor-pointer">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className="cursor-pointer hover:bg-gray-100" value="Academic Planning">Academic Planning</SelectItem>
                            <SelectItem className="cursor-pointer hover:bg-gray-100" value="Course Registration">Course Registration</SelectItem>
                            <SelectItem className="cursor-pointer hover:bg-gray-100" value="Career Guidance">Career Guidance</SelectItem>
                            <SelectItem className="cursor-pointer hover:bg-gray-100" value="Graduate School">Graduate School</SelectItem>
                            <SelectItem className="cursor-pointer hover:bg-gray-100" value="Research Opportunities">Research Opportunities</SelectItem>
                            <SelectItem className="cursor-pointer hover:bg-gray-100" value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="title">Issue Title *</Label>
                <Input
                    id="title"
                    placeholder="Brief description of your issue"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                    id="description"
                    placeholder="Please provide detailed information about your issue, including any relevant context, deadlines, or specific questions you have."
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>

            <div className="space-y-2">
                <Label>Attachments</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <Paperclip className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload files or drag and drop</p>
                        <p className="text-xs text-gray-500 mt-1">PDF, DOC, TXT, JPG, PNG (max 10MB each)</p>
                    </label>
                </div>
                {attachments.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium">Attached Files:</h4>
                        {attachments.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <span className="text-sm">{file.name}</span>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeAttachment(index)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onClose} className="cursor-pointer">
                    Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Escalation
                </Button>
            </div>
        </form>
    );
}