"use client"

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/dashboard/common/Header";
import PlatformSettingsTab from "@/components/admin/SettingsPage/PlatformSettingsTab";
import SecuritySettingsTab from "@/components/admin/SettingsPage/SecuritySettingsTab";
import NotificationSettingsTab from "@/components/admin/SettingsPage/NotificationSettingsTab";
import UserManagementSettingsTab from "@/components/admin/SettingsPage/UserManagementSettingsTab";
import SystemSettingsTab from "@/components/admin/SettingsPage/SystemSettingsTab";
import { useToast } from "@/hooks/use-toast";
import { PlatformSettings, SecuritySettings, NotificationSettings, UserSettings } from "@/types/settings";
import axios from "axios";
import { useSession } from "next-auth/react";
import ComingSoonWrapper from "@/components/shared/ComingSoonWrapper";

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();
  const userId = session?.user?.id;


  // Platform settings
  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>({
    siteName: "Uni-Connect",
    siteDescription: "University Social & Educational Platform",
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerificationRequired: true,
    maxFileUploadSize: "10",
    sessionTimeout: "24",
  });

  // Security settings
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    systemNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    adminAlerts: true,
    userRegistrationAlerts: true,
    escalationAlerts: true,
    systemErrorAlerts: true,
  });

  // User management settings
  const [userSettings, setUserSettings] = useState<UserSettings>({
    defaultUserRole: "student",
    autoApproveRegistrations: false,
    allowProfilePictures: true,
    allowDirectMessages: true,
    moderateForumPosts: false,
    maxDepartmentsPerUser: "3",
  });

  // Handlers
  const handlePlatformSave = () => {
    toast({
      title: "Platform Settings Updated",
      description: "Platform configuration has been saved successfully.",
    });
  };

  const handleSecuritySave = async () => {
    setIsLoading(true);
    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      toast({
        title: "Error",
        description: "New Password and Confirm Password do not match.",
        variant: "destructive"
      });
      return;
    }
    try {
      const res = await axios.put("/api/auth/update-password", {
        userId,
        newPassword: securitySettings.newPassword
      });
      toast({
        title: "Settings Updated",
        description: res.data.message || "Security configuration has been saved successfully.",
        variant: "success"
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive"
      });
      return;
    } finally {
      setIsLoading(false);
    }
    securitySettings.newPassword = "";
    securitySettings.confirmPassword = "";
  };

  const handleNotificationSave = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Notification preferences have been saved successfully.",
    });
  };

  const handleUserSettingsSave = () => {
    toast({
      title: "User Settings Updated",
      description: "User management settings have been saved successfully.",
    });
  };

  const handleBackupExport = () => {
    toast({
      title: "Backup Started",
      description: "System backup export has been initiated. You'll receive an email when complete.",
    });
  };

  const handleSystemRestart = () => {
    toast({
      title: "System Restart Scheduled",
      description: "System restart has been scheduled for the next maintenance window.",
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <Header
        title="Admin Settings"
        description="Configure platform settings and system preferences"
      />

      <Tabs defaultValue="platform" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger className="cursor-pointer" value="platform">Platform</TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="security">Security</TabsTrigger>

          <ComingSoonWrapper>
            <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
          </ComingSoonWrapper>

          <ComingSoonWrapper>
            <TabsTrigger value="users" disabled>User Management</TabsTrigger>
          </ComingSoonWrapper>

          <ComingSoonWrapper>
            <TabsTrigger value="system" disabled>System</TabsTrigger>
          </ComingSoonWrapper>
        </TabsList>

        {/* Platform Settings */}
        <TabsContent value="platform">
          <PlatformSettingsTab
            settings={platformSettings}
            onSettingsChange={setPlatformSettings}
            onSave={handlePlatformSave}
          />
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <SecuritySettingsTab
            settings={securitySettings}
            onSettingsChange={setSecuritySettings}
            onSave={handleSecuritySave}
            errors={{ newPassword: "", confirmPassword: "" }}
            loading={isLoading}
          />
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <NotificationSettingsTab
            settings={notificationSettings}
            onSettingsChange={setNotificationSettings}
            onSave={handleNotificationSave}
          />
        </TabsContent>

        {/* User Management Settings */}
        <TabsContent value="users">
          <UserManagementSettingsTab
            settings={userSettings}
            onSettingsChange={setUserSettings}
            onSave={handleUserSettingsSave}
          />
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system">
          <SystemSettingsTab
            onBackupExport={handleBackupExport}
            onSystemRestart={handleSystemRestart}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}