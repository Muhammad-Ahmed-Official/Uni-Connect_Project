// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent } from "@/components/ui/card";
// import { FileText } from "lucide-react";
// import DocumentCard from "@/components/admin/DocumentsPage/DocumentCard";
// import { Document } from "@/types/admin-documents";

// interface DocumentsListProps {
//     pastPapers: Document[];
//     policyDocs: Document[];
//     onApprove: (id: number, type: string) => void;
//     onReject: (id: number, type: string) => void;
//     onDelete: (id: number, type: string) => void;
// }

// export default function DocumentsList({
//     pastPapers,
//     policyDocs,
//     // onApprove,
//     onReject,
//     onDelete,
// }: DocumentsListProps) {
//     const isEmpty = pastPapers.length === 0 && policyDocs.length === 0;

//     if (isEmpty) {
//         return (
//             <Card>
//                 <CardContent className="text-center py-12">
//                     <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
//                     <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
//                 </CardContent>
//             </Card>
//         );
//     }

//     return (
//         <Tabs defaultValue="past-papers" className="space-y-4">
//             <TabsList>
//                 <TabsTrigger value="past-papers">Past Papers</TabsTrigger>
//                 <TabsTrigger value="policy-docs">Policy Documents</TabsTrigger>
//             </TabsList>

//             <TabsContent value="past-papers" className="space-y-4">
//                 <div className="grid gap-4">
//                     {pastPapers.map((paper) => (
//                         <DocumentCard
//                             key={paper.id}
//                             document={paper}
//                             type="past-paper"
//                             // onApprove={onApprove}
//                             onReject={onReject}
//                             onDelete={onDelete}
//                         />
//                     ))}
//                 </div>
//             </TabsContent>

//             <TabsContent value="policy-docs" className="space-y-4">
//                 <div className="grid gap-4">
//                     {policyDocs.map((doc) => (
//                         <DocumentCard
//                             key={doc.id}
//                             document={doc}
//                             type="policy-doc"
//                             onReject={onReject}
//                             onDelete={onDelete}
//                         />
//                     ))}
//                 </div>
//             </TabsContent>
//         </Tabs>
//     );
// }

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Edit,
  Send,
  Clock,
  Trash2,
  Eye,
  Calendar,
  Mail,
} from "lucide-react";


export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "message";
//   priority: "low" | "medium" | "high";
//   status: "draft" | "scheduled" | "sent" | "cancelled";
//   targetAudience: string;
  createdBy?: string;
  createdAt?: string;
//   scheduledFor?: string;
  sentAt?: string;
//   readCount: number;
//   totalRecipients: number;
//   channels: ("in-app" | "email" | "sms" | "push")[];
}

interface NotificationsListProps {
  notifications: Notification[];
  onSend: (id: string) => void;
  onEdit: (id: string, updates: Partial<Notification>) => void;
  onDelete: (id: string) => void;
}

const NotificationsList = ({
  notifications,
  onSend,
  onEdit,
  onDelete,
}: NotificationsListProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

//   const getStatusColor = (status: Notification["status"]) => {
//     switch (status) {
//       case "sent":
//         return "bg-green-100 text-green-800";
//       case "scheduled":
//         return "bg-orange-100 text-orange-800";
//       case "draft":
//         return "bg-blue-100 text-blue-800";
//       case "cancelled":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getPriorityColor = (priority: Notification["priority"]) => {
//     switch (priority) {
//       case "high":
//         return "bg-red-100 text-red-800";
//       case "medium":
//         return "bg-yellow-100 text-yellow-800";
//       case "low":
//         return "bg-green-100 text-green-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

  if (notifications.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
          <p className="text-gray-600">Create your first notification message to get started.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card key={notification.id} className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  {/* <div className="space-y-1"> */}
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {notification.title}
                    </h3>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      {/* {notification.status === "draft" && (
                        <DropdownMenuItem onClick={() => onSend(notification.id)}>
                          <Send className="h-4 w-4 mr-2" />
                          Send Now
                        </DropdownMenuItem>
                      )} */}
                      <DropdownMenuItem onClick={() => onEdit(notification.id, { title: notification.title + " (edited)" })}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => onDelete(notification.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {notification.message}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <span>By: {notification.createdBy}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    {/* <span>
                      {notification.status === "sent" && notification.sentAt
                        ? `Sent: ${formatDate(notification.sentAt)}`
                        : notification.status === "scheduled" && notification.scheduledFor
                        ? `Scheduled: ${formatDate(notification.scheduledFor)}`
                        : `Created: ${formatDate(notification.createdAt)}`}
                    </span> */}
                  </div>
                  <div className="flex items-center space-x-1">
                    {/* <span>To: {notification.targetAudience.replace('_', ' ')}</span> */}
                  </div>
                </div>
              </div>
            </div>

            {/* {notification.status === "draft" && (
              <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(notification.id, { status: "scheduled" })}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
                <Button
                  size="sm"
                  onClick={() => onSend(notification.id)}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Now
                </Button>
              </div>
            )} */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NotificationsList;