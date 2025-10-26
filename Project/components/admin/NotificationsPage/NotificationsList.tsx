import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Button
} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Input
} from "@/components/ui/input";
import {
  Label
} from "@/components/ui/label";
import {
  Textarea
} from "@/components/ui/textarea";
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
  Trash2,
  Mail,
  Loader2,
} from "lucide-react";

export interface Notification {
  _id: string;
  title: string;
  content: string;
  createdBy?: string;
  targetAudience: string;
}
// Notification[]
interface NotificationsListProps {
  notifications: any;
  onEdit: (id: string, updates: Partial<Notification>) => void;
  onDelete: (id: string) => void;
  loading2:boolean
  isEditModalOpen:boolean 
  setIsEditModalOpen: (value:boolean) => void
}

const NotificationsList = ({ notifications, onEdit, onDelete, loading2, isEditModalOpen, setIsEditModalOpen }: NotificationsListProps) => {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [editData, setEditData] = useState({ title: "", content: "", targetAudience: "" });

  const handleEditClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setEditData({
      title: notification.title,
      content: notification.content,
      targetAudience: notification.targetAudience,
    });
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = () => {
    if (selectedNotification) {
      onEdit(selectedNotification._id, editData);
    }
    setIsEditModalOpen(false);
  };

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
    <>
      <div className="space-y-4">
        {notifications.map((notification:any) => (
          <Card key={notification._id} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
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
                        <DropdownMenuItem onClick={() => handleEditClick(notification)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onDelete(notification._id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {notification.content}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span>By: {notification.createdBy || "Admin"}</span>
                    <span>To: {notification.targetAudience}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Notification</DialogTitle>
            <DialogDescription>
              Update the notification details below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label className="pb-1">Title</Label>
              <Input
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              />
            </div>

            <div>
              <Label className="pb-1">Content</Label>
              <Textarea
                rows={3}
                value={editData.content}
                onChange={(e) => setEditData({ ...editData, content: e.target.value })}
              />
            </div>

            <div>
              <Label className="pb-1">Target Audience</Label>
              <Input
                value={editData.targetAudience}
                onChange={(e) => setEditData({ ...editData, targetAudience: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>{loading2 ? <span className="flex items-center gap-2"> <Loader2 className="animate-spin" /> Updating... </span> :  "Save Changes"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NotificationsList;