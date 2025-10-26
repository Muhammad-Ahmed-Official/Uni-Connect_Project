"use client"

import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import StatsCards from "@/components/admin/NotificationsPage/StatsCards";
import CreateNotification from "@/components/admin/NotificationsPage/CreateNotification";
import NotificationsList from "@/components/admin/NotificationsPage/NotificationsList";
import { 
  BellIcon, 
  UsersIcon,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";

export interface Notification {
  _id?: string;
  title: string;
  content: string;
  scheduledFor: string;
  createdBy?: string;
  createdAt?: string;
}

export interface StatsCard {
  title: string;
  value: string | number;
  icon: React.ElementType;
  iconColor?: string;
  trend?: string;
}


export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false)
  const [loading2, setLoading2] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const totalNotifications = notifications?.length;
  
  const stats: StatsCard[] = [
    {
      title: "Total Notifications",
      value: totalNotifications ?? 0,
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


  const handleEditNotification = async(id: string, updates: Partial<Notification>) => {
    setLoading2(true);
    setIsEditModalOpen(true)
    try {
      await apiClient.updateNotification(id, updates)
      setNotifications(notifications =>
        notifications.map(notification =>
          notification._id === id 
            ? { ...notification, ...updates } 
            : notification
        )
      );
      setIsEditModalOpen(false)
      toast({
        title: "Notification Updated",
        description: "The message has been successfully updated.",
      });
    } catch (error) {
      setIsEditModalOpen(false)
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      });
    }finally{
      setLoading2(false);
    }
  };

  const handleDeleteNotification = async(id: string) => {
    try {
        setNotifications(notifications => notifications.filter(notification => notification._id !== id));
      await apiClient.deleteNotification(id)
      toast({
        title: "Notification Deleted",
        description: "The message has been permanently deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      });
    }
    
  };

  const handleCreateNotification = async(newNotification: Notification) => {
    setLoading(true);
    const notification: Notification = {
      ...newNotification,
    };
    console.log(notification)
    try {
      await apiClient.createNotification(notification)
      setNotifications(prev => [notification, ...prev]);
      toast({
        title: "Notification Created",
        description: "Your message has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      });
    }finally{
      setIsCreateDialogOpen(false);
      setLoading(false)
    }
    
  };

  const getNotifications = async() => {
    try {
      const response:any = await apiClient.getNotification();
      // console.log(response?.data);
      setNotifications(response?.data);
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      });
    }
  };


  useEffect(() => {
    getNotifications();
  }, [])


  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Message Center</h1>
          <p className="text-gray-600">Create and manage notifications for users</p>
        </div>
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
        loading2={loading2}
        isEditModalOpen={isEditModalOpen} 
        setIsEditModalOpen={setIsEditModalOpen}
        notifications={notifications}
        onEdit={handleEditNotification}
        onDelete={handleDeleteNotification}
      />

      <CreateNotification
        loading={loading}
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreate={handleCreateNotification}
      />
    </div>
  );
}