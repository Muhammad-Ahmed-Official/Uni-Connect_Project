// "use client"

// import { useState } from "react";
// import { toast } from "@/hooks/use-toast";
// import StatsCards from "@/components/admin/DocumentsPage/StatsCards";
// import DocumentFilters from "@/components/admin/DocumentsPage/DocumentFilters";
// import UploadDocumentDialog from "@/components/admin/DocumentsPage/UploadDocumentDialog";
// import DocumentsList from "@/components/admin/DocumentsPage/DocumentsList";
// import { Document, StatsCard } from "@/types/admin-documents"
// import { AlertCircleIcon, BookOpenIcon, DownloadIcon, FileTextIcon, LucideFileText } from "lucide-react";

// const mockPastPapers: Document[] = [
//   {
//     id: 1,
//     title: "Data Structures and Algorithms - Final Exam",
//     subject: "Computer Science",
//     year: "2023",
//     semester: "Fall",
//     examType: "Final",
//     uploadedBy: "Dr. Smith",
//     uploadDate: "2024-01-15",
//     status: "approved",
//     downloads: 245,
//     fileSize: "2.3 MB",
//     fileType: "PDF",
//   },
//   {
//     id: 2,
//     title: "Calculus II - Midterm Exam",
//     subject: "Mathematics",
//     year: "2023",
//     semester: "Spring",
//     examType: "Midterm",
//     uploadedBy: "Prof. Johnson",
//     uploadDate: "2024-02-10",
//     status: "pending",
//     downloads: 0,
//     fileSize: "1.8 MB",
//     fileType: "PDF",
//   },
//   {
//     id: 3,
//     title: "Organic Chemistry - Quiz 3",
//     subject: "Chemistry",
//     year: "2023",
//     semester: "Fall",
//     examType: "Quiz",
//     uploadedBy: "Dr. Wilson",
//     uploadDate: "2024-01-20",
//     status: "rejected",
//     downloads: 0,
//     fileSize: "1.2 MB",
//     fileType: "PDF",
//   },
// ]

// const mockPolicyDocs: Document[] = [
//   {
//     id: 1,
//     title: "Student Code of Conduct 2024",
//     category: "Academic Policies",
//     uploadedBy: "Admin Office",
//     uploadDate: "2024-01-01",
//     status: "approved",
//     downloads: 1250,
//     fileSize: "5.2 MB",
//     fileType: "PDF",
//     lastUpdated: "2024-01-01",
//   },
//   {
//     id: 2,
//     title: "Research Ethics Guidelines",
//     category: "Research Policies",
//     uploadedBy: "Research Office",
//     uploadDate: "2024-02-15",
//     status: "pending",
//     downloads: 0,
//     fileSize: "3.1 MB",
//     fileType: "PDF",
//     lastUpdated: "2024-02-15",
//   },
//   {
//     id: 3,
//     title: "Financial Aid Procedures",
//     category: "Financial Policies",
//     uploadedBy: "Financial Aid Office",
//     uploadDate: "2024-01-10",
//     status: "approved",
//     downloads: 890,
//     fileSize: "2.8 MB",
//     fileType: "PDF",
//     lastUpdated: "2024-01-10",
//   },
// ]

// export default function AdminDocumentsPage() {
//   const [pastPapers, setPastPapers] = useState<Document[]>(mockPastPapers);
//   const [policyDocs, setPolicyDocs] = useState<Document[]>(mockPolicyDocs);
//   const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   // Stats calculation
//   const totalPastPapers = pastPapers.length;
//   const approvedPastPapers = pastPapers.filter((p) => p.status === "approved").length;
//   const totalPolicyDocs = policyDocs.length;
//   const approvedPolicyDocs = policyDocs.filter((d) => d.status === "approved").length;
//   const pendingApprovals = [...pastPapers, ...policyDocs].filter((item) => item.status === "pending").length;
//   const totalDownloads = [...pastPapers, ...policyDocs].reduce((sum, item) => sum + item.downloads, 0);

//   const stats: StatsCard[] = [
//     {
//       title: "Past Papers",
//       value: totalPastPapers,
//       description: `${approvedPastPapers} approved`,
//       icon: BookOpenIcon,
//     },
//     {
//       title: "Policy Docs",
//       value: totalPolicyDocs,
//       description: `${approvedPolicyDocs} approved`,
//       icon: FileTextIcon,
//     },
//     {
//       title: "Pending Approval",
//       value: pendingApprovals,
//       description: "Awaiting review",
//       icon: AlertCircleIcon,
//       iconColor: "text-yellow-600",
//     },
//     {
//       title: "Total Downloads",
//       value: totalDownloads,
//       description: "All documents",
//       icon: DownloadIcon,
//     },
//     {
//       title: "Storage Used",
//       value: "24.7 GB",
//       description: "of 100 GB limit",
//       icon: LucideFileText,
//     },
//   ];

//   // Filter documents
//   const filterDocuments = (documents: Document[]) => {
//     return documents.filter((doc) => {
//       const matchesSearch =
//         doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (doc as any).subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (doc as any).category?.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesStatus = statusFilter === "all" || doc.status === statusFilter;

//       return matchesSearch && matchesStatus;
//     });
//   };

//   const filteredPastPapers = filterDocuments(pastPapers);
//   const filteredPolicyDocs = filterDocuments(policyDocs);

//   // Document actions
//   const handleApproveDocument = (id: number, type: string) => {
//     if (type === "past-paper") {
//       setPastPapers((papers) =>
//         papers.map((paper) => (paper.id === id ? { ...paper, status: "approved" } : paper))
//       );
//     } else {
//       setPolicyDocs((docs) =>
//         docs.map((doc) => (doc.id === id ? { ...doc, status: "approved" } : doc))
//       );
//     }
//     toast({
//       title: "Document Approved",
//       description: "The document has been approved and is now available to users.",
//     });
//   };

//   const handleRejectDocument = (id: number, type: string) => {
//     if (type === "past-paper") {
//       setPastPapers((papers) =>
//         papers.map((paper) => (paper.id === id ? { ...paper, status: "rejected" } : paper))
//       );
//     } else {
//       setPolicyDocs((docs) =>
//         docs.map((doc) => (doc.id === id ? { ...doc, status: "rejected" } : doc))
//       );
//     }
//     toast({
//       title: "Document Rejected",
//       description: "The document has been rejected and will not be visible to users.",
//     });
//   };

//   const handleDeleteDocument = (id: number, type: string) => {
//     if (type === "past-paper") {
//       setPastPapers((papers) => papers.filter((paper) => paper.id !== id));
//     } else {
//       setPolicyDocs((docs) => docs.filter((doc) => doc.id !== id));
//     }
//     toast({
//       title: "Document Deleted",
//       description: "The document has been permanently deleted.",
//     });
//   };

//   const handleUploadDocument = () => {
//     setIsUploadDialogOpen(false);
//     toast({
//       title: "Document Uploaded",
//       description: "Document has been uploaded and is pending approval.",
//     });
//   };

//   return (
//     <div className="p-2 sm:p-6 space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
//           <p className="text-gray-600">Manage past papers, policy documents, and approvals</p>
//         </div>
//         <UploadDocumentDialog
//           isOpen={isUploadDialogOpen}
//           onOpenChange={setIsUploadDialogOpen}
//           onUpload={handleUploadDocument}
//         />
//       </div>

//       {/* Stats Cards */}
//       <StatsCards stats={stats} />

//       {/* Filters */}
//       <DocumentFilters
//         searchTerm={searchTerm}
//         onSearchChange={setSearchTerm}
//         statusFilter={statusFilter}
//         onStatusFilterChange={setStatusFilter}
//       />

//       {/* Documents List */}
//       <DocumentsList
//         pastPapers={filteredPastPapers}
//         policyDocs={filteredPolicyDocs}
//         onApprove={handleApproveDocument}
//         onReject={handleRejectDocument}
//         onDelete={handleDeleteDocument}
//       />
//     </div>
//   );
// }

"use client"

import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import StatsCards from "@/components/admin/NotificationsPage/StatsCards";
import CreateNotification from "@/components/admin/NotificationsPage/CreateNotification";
import NotificationsList from "@/components/admin/NotificationsPage/NotificationsList";
import { 
  BellIcon, 
  MessageSquareIcon, 
  SendIcon, 
  UsersIcon,
  EyeIcon,
  ClockIcon,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "message";
  // priority: "low" | "medium" | "high";
  // status: "draft" | "scheduled" | "sent" | "cancelled";
  // targetAudience: string;
  createdBy?: string;
  createdAt?: string;
  // scheduledFor?: string;
  sentAt?: string;
  // readCount: number;
  // totalRecipients: number;
  // channels: ("in-app" | "email" | "sms" | "push")[];
}

export interface StatsCard {
  title: string;
  value: string | number;
  // description: string;
  icon: React.ElementType;
  iconColor?: string;
  trend?: string;
}

// Mock data for notifications
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Welcome to the New Academic Year",
    message: "We are excited to welcome all students and faculty to the new academic year. Check the updated academic calendar for important dates and events.",
    type: "message",
    // priority: "medium",
    // status: "sent",
    // targetAudience: "all",
    createdBy: "Admin Office",
    createdAt: "2024-03-15T10:30:00Z",
    // scheduledFor: "2024-03-15T10:30:00Z",
    sentAt: "2024-03-15T10:30:00Z",
    // readCount: 1245,
    // totalRecipients: 1500,
    // channels: ["in-app"],
  },
  {
    id: "2",
    title: "Library Hours Update",
    message: "The main library will have extended hours during finals week. New timings: 7:00 AM to 11:00 PM from Monday to Sunday.",
    type: "message",
    // priority: "medium",
    // status: "sent",
    // targetAudience: "all_students",
    createdBy: "Library Department",
    createdAt: "2024-03-14T14:20:00Z",
    // scheduledFor: "2024-03-14T14:20:00Z",
    sentAt: "2024-03-14T14:20:00Z",
    // readCount: 890,
    // totalRecipients: 1200,
    // channels: ["in-app"],
  },
];

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Stats calculation
  const totalNotifications = notifications.length;
  // const sentNotifications = notifications.filter(n => n.status === "sent").length;
  // const scheduledNotifications = notifications.filter(n => n.status === "scheduled").length;
  // const draftNotifications = notifications.filter(n => n.status === "draft").length;
  // const totalRecipients = notifications.reduce((sum, item) => sum + item.totalRecipients, 0);
  // const totalReads = notifications.reduce((sum, item) => sum + item.readCount, 0);
  // const readRate = totalRecipients > 0 ? Math.round((totalReads / totalRecipients) * 100) : 0;

  const stats: StatsCard[] = [
    {
      title: "Total Notifications",
      value: totalNotifications,
      // description: `${sentNotifications} sent`,
      icon: BellIcon,
    },
    // {
    //   title: "Scheduled",
    //   value: scheduledNotifications,
    //   description: "Waiting to send",
    //   icon: ClockIcon,
    //   iconColor: "text-orange-600",
    // },
    // {
    //   title: "Drafts",
    //   value: draftNotifications,
    //   description: "In progress",
    //   icon: MessageSquareIcon,
    //   iconColor: "text-blue-600",
    // },
    {
      title: "Total Recipients",
      value: "",
      // description: "All notifications",
      icon: UsersIcon,
    },
  ];

  // Notification actions
  const handleSendNotification = (id: string) => {
    setNotifications(notifications =>
      notifications.map(notification =>
        notification.id === id 
          ? { 
              ...notification, 
              status: "sent", 
              sentAt: new Date().toISOString() 
            } 
          : notification
      )
    );
    toast({
      title: "Notification Sent",
      description: "The message has been sent to all recipients.",
    });
  };

  const handleEditNotification = (id: string, updates: Partial<Notification>) => {
    setNotifications(notifications =>
      notifications.map(notification =>
        notification.id === id 
          ? { ...notification, ...updates } 
          : notification
      )
    );
    toast({
      title: "Notification Updated",
      description: "The message has been successfully updated.",
    });
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications => notifications.filter(notification => notification.id !== id));
    toast({
      title: "Notification Deleted",
      description: "The message has been permanently deleted.",
    });
  };

  const handleCreateNotification = (newNotification: Omit<Notification, 'id' | 'createdAt' | 'readCount'>) => {
    const notification: Notification = {
      ...newNotification,
      id: Date.now().toString(),
      // createdAt: new Date().toISOString(),
      // readCount: 0,
    };
    
    setNotifications(prev => [notification, ...prev]);
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Notification Created",
      description: "Your message has been created successfully.",
    });
  };

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Message Center</h1>
          <p className="text-gray-600">Create and manage notifications for users</p>
        </div>
     {/* This button opens the dialog */}
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Message
        </Button>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Notifications List */}
      <NotificationsList
        notifications={notifications}
        onSend={handleSendNotification}
        onEdit={handleEditNotification}
        onDelete={handleDeleteNotification}
      />

      <CreateNotification
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreate={handleCreateNotification}
      />
    </div>
  );
}