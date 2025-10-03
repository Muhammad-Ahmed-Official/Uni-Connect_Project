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

export default function AdminSettingsPage() {
  const { toast } = useToast();

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
    passwordMinLength: "8",
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    twoFactorEnabled: false,
    loginAttemptLimit: "5",
    accountLockoutDuration: "30",
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

  const handleSecuritySave = () => {
    toast({
      title: "Security Settings Updated",
      description: "Security configuration has been saved successfully.",
    });
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
          <TabsTrigger value="platform">Platform</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
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