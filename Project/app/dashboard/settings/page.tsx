"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/dashboard/common/Header";
import ProfileTab from "@/components/dashboard/SettingsPage/ProfileTab";
import NotificationsTab from "@/components/dashboard/SettingsPage/NotificationsTab";
import PrivacyTab from "@/components/dashboard/SettingsPage/PrivacyTab";
import AccountTab from "@/components/dashboard/SettingsPage/AccountTab";
import { useToast } from "@/hooks/use-toast";
import { Profile, Notifications, Privacy, PasswordData } from "@/types/settings";

export default function SettingsPage() {
  const { toast } = useToast();

  // State management
  const [profile, setProfile] = useState<Profile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@university.edu",
    phone: "+1 (555) 123-4567",
    studentId: "STU2024001",
    department: "Computer Science",
    year: "3rd Year",
    bio: "Computer Science student passionate about AI and machine learning.",
    location: "Campus Dormitory A, Room 205",
  });

  const [notifications, setNotifications] = useState<Notifications>({
    emailNotifications: true,
    pushNotifications: true,
    forumUpdates: true,
    eventReminders: true,
    advisorMessages: true,
    systemUpdates: false,
    weeklyDigest: true,
  });

  const [privacy, setPrivacy] = useState<Privacy>({
    profileVisibility: "university",
    showEmail: false,
    showPhone: false,
    allowDirectMessages: true,
    showOnlineStatus: true,
  });

  // Handlers
  const handleProfileSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleNotificationSave = () => {
    toast({
      title: "Preferences Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handlePrivacySave = () => {
    toast({
      title: "Privacy Settings Updated",
      description: "Your privacy settings have been saved successfully.",
    });
  };

  const handlePasswordChange = (passwordData: PasswordData) => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation password do not match.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
  };

  const handleProfilePictureUpload = () => {
    toast({
      title: "Profile Picture Updated",
      description: "Your profile picture has been uploaded successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Header title="Settings" description="Manage your account settings and preferences" />

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <ProfileTab
              profile={profile}
              onProfileChange={setProfile}
              onSave={handleProfileSave}
              onProfilePictureUpload={handleProfilePictureUpload}
            />
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <NotificationsTab
              notifications={notifications}
              onNotificationsChange={setNotifications}
              onSave={handleNotificationSave}
            />
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <PrivacyTab
              privacy={privacy}
              onPrivacyChange={setPrivacy}
              onSave={handlePrivacySave}
            />
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account">
            <AccountTab onPasswordChange={handlePasswordChange} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}