"use client"

import { useState } from "react"
import { Save, Shield, Database, Bell, Users, Key, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export default function AdminSettingsPage() {
  const { toast } = useToast()

  // Platform settings
  const [platformSettings, setPlatformSettings] = useState({
    siteName: "Uni-Connect",
    siteDescription: "University Social & Educational Platform",
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerificationRequired: true,
    maxFileUploadSize: "10",
    sessionTimeout: "24",
  })

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: "8",
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    twoFactorEnabled: false,
    loginAttemptLimit: "5",
    accountLockoutDuration: "30",
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    systemNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    adminAlerts: true,
    userRegistrationAlerts: true,
    escalationAlerts: true,
    systemErrorAlerts: true,
  })

  // User management settings
  const [userSettings, setUserSettings] = useState({
    defaultUserRole: "student",
    autoApproveRegistrations: false,
    allowProfilePictures: true,
    allowDirectMessages: true,
    moderateForumPosts: false,
    maxDepartmentsPerUser: "3",
  })

  const handlePlatformSave = () => {
    toast({
      title: "Platform Settings Updated",
      description: "Platform configuration has been saved successfully.",
    })
  }

  const handleSecuritySave = () => {
    toast({
      title: "Security Settings Updated",
      description: "Security configuration has been saved successfully.",
    })
  }

  const handleNotificationSave = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Notification preferences have been saved successfully.",
    })
  }

  const handleUserSettingsSave = () => {
    toast({
      title: "User Settings Updated",
      description: "User management settings have been saved successfully.",
    })
  }

  const handleBackupExport = () => {
    toast({
      title: "Backup Started",
      description: "System backup export has been initiated. You'll receive an email when complete.",
    })
  }

  const handleSystemRestart = () => {
    toast({
      title: "System Restart Scheduled",
      description: "System restart has been scheduled for the next maintenance window.",
    })
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Settings</h1>
        <p className="text-gray-600">Configure platform settings and system preferences</p>
      </div>

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
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  General Platform Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={platformSettings.siteName}
                      onChange={(e) => setPlatformSettings({ ...platformSettings, siteName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={platformSettings.sessionTimeout}
                      onChange={(e) => setPlatformSettings({ ...platformSettings, sessionTimeout: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={platformSettings.siteDescription}
                    onChange={(e) => setPlatformSettings({ ...platformSettings, siteDescription: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxFileUploadSize">Max File Upload Size (MB)</Label>
                    <Input
                      id="maxFileUploadSize"
                      type="number"
                      value={platformSettings.maxFileUploadSize}
                      onChange={(e) => setPlatformSettings({ ...platformSettings, maxFileUploadSize: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                      <p className="text-sm text-gray-600">Temporarily disable site access for maintenance</p>
                    </div>
                    <Switch
                      id="maintenanceMode"
                      checked={platformSettings.maintenanceMode}
                      onCheckedChange={(checked) =>
                        setPlatformSettings({ ...platformSettings, maintenanceMode: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="registrationEnabled">User Registration</Label>
                      <p className="text-sm text-gray-600">Allow new users to register accounts</p>
                    </div>
                    <Switch
                      id="registrationEnabled"
                      checked={platformSettings.registrationEnabled}
                      onCheckedChange={(checked) =>
                        setPlatformSettings({ ...platformSettings, registrationEnabled: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailVerificationRequired">Email Verification Required</Label>
                      <p className="text-sm text-gray-600">Require email verification for new accounts</p>
                    </div>
                    <Switch
                      id="emailVerificationRequired"
                      checked={platformSettings.emailVerificationRequired}
                      onCheckedChange={(checked) =>
                        setPlatformSettings({ ...platformSettings, emailVerificationRequired: checked })
                      }
                    />
                  </div>
                </div>

                <Button onClick={handlePlatformSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Platform Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Security Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={securitySettings.passwordMinLength}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, passwordMinLength: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="loginAttemptLimit">Login Attempt Limit</Label>
                  <Input
                    id="loginAttemptLimit"
                    type="number"
                    value={securitySettings.loginAttemptLimit}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, loginAttemptLimit: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="accountLockoutDuration">Account Lockout Duration (minutes)</Label>
                <Input
                  id="accountLockoutDuration"
                  type="number"
                  value={securitySettings.accountLockoutDuration}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, accountLockoutDuration: e.target.value })}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="requireSpecialChars">Require Special Characters</Label>
                    <p className="text-sm text-gray-600">Passwords must contain special characters</p>
                  </div>
                  <Switch
                    id="requireSpecialChars"
                    checked={securitySettings.requireSpecialChars}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, requireSpecialChars: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="requireNumbers">Require Numbers</Label>
                    <p className="text-sm text-gray-600">Passwords must contain numbers</p>
                  </div>
                  <Switch
                    id="requireNumbers"
                    checked={securitySettings.requireNumbers}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, requireNumbers: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="requireUppercase">Require Uppercase Letters</Label>
                    <p className="text-sm text-gray-600">Passwords must contain uppercase letters</p>
                  </div>
                  <Switch
                    id="requireUppercase"
                    checked={securitySettings.requireUppercase}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, requireUppercase: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactorEnabled">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600">Enable 2FA for admin accounts</p>
                  </div>
                  <Switch
                    id="twoFactorEnabled"
                    checked={securitySettings.twoFactorEnabled}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, twoFactorEnabled: checked })
                    }
                  />
                </div>
              </div>

              <Button onClick={handleSecuritySave}>
                <Save className="h-4 w-4 mr-2" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Admin Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="systemNotifications">System Notifications</Label>
                    <p className="text-sm text-gray-600">General system notifications</p>
                  </div>
                  <Switch
                    id="systemNotifications"
                    checked={notificationSettings.systemNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, systemNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="adminAlerts">Admin Alerts</Label>
                    <p className="text-sm text-gray-600">Critical admin alerts and warnings</p>
                  </div>
                  <Switch
                    id="adminAlerts"
                    checked={notificationSettings.adminAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, adminAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="userRegistrationAlerts">User Registration Alerts</Label>
                    <p className="text-sm text-gray-600">Notifications for new user registrations</p>
                  </div>
                  <Switch
                    id="userRegistrationAlerts"
                    checked={notificationSettings.userRegistrationAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, userRegistrationAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="escalationAlerts">Escalation Alerts</Label>
                    <p className="text-sm text-gray-600">Notifications for new escalations</p>
                  </div>
                  <Switch
                    id="escalationAlerts"
                    checked={notificationSettings.escalationAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, escalationAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="systemErrorAlerts">System Error Alerts</Label>
                    <p className="text-sm text-gray-600">Critical system error notifications</p>
                  </div>
                  <Switch
                    id="systemErrorAlerts"
                    checked={notificationSettings.systemErrorAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, systemErrorAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-gray-600">Send notifications via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-gray-600">Send critical alerts via SMS</p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, smsNotifications: checked })
                    }
                  />
                </div>
              </div>

              <Button onClick={handleNotificationSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User Management Settings */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="defaultUserRole">Default User Role</Label>
                  <Select
                    value={userSettings.defaultUserRole}
                    onValueChange={(value) => setUserSettings({ ...userSettings, defaultUserRole: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="advisor">Advisor</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="maxDepartmentsPerUser">Max Departments Per User</Label>
                  <Input
                    id="maxDepartmentsPerUser"
                    type="number"
                    value={userSettings.maxDepartmentsPerUser}
                    onChange={(e) => setUserSettings({ ...userSettings, maxDepartmentsPerUser: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoApproveRegistrations">Auto-Approve Registrations</Label>
                    <p className="text-sm text-gray-600">Automatically approve new user registrations</p>
                  </div>
                  <Switch
                    id="autoApproveRegistrations"
                    checked={userSettings.autoApproveRegistrations}
                    onCheckedChange={(checked) =>
                      setUserSettings({ ...userSettings, autoApproveRegistrations: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowProfilePictures">Allow Profile Pictures</Label>
                    <p className="text-sm text-gray-600">Allow users to upload profile pictures</p>
                  </div>
                  <Switch
                    id="allowProfilePictures"
                    checked={userSettings.allowProfilePictures}
                    onCheckedChange={(checked) => setUserSettings({ ...userSettings, allowProfilePictures: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="allowDirectMessages">Allow Direct Messages</Label>
                    <p className="text-sm text-gray-600">Allow users to send direct messages</p>
                  </div>
                  <Switch
                    id="allowDirectMessages"
                    checked={userSettings.allowDirectMessages}
                    onCheckedChange={(checked) => setUserSettings({ ...userSettings, allowDirectMessages: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="moderateForumPosts">Moderate Forum Posts</Label>
                    <p className="text-sm text-gray-600">Require admin approval for forum posts</p>
                  </div>
                  <Switch
                    id="moderateForumPosts"
                    checked={userSettings.moderateForumPosts}
                    onCheckedChange={(checked) => setUserSettings({ ...userSettings, moderateForumPosts: checked })}
                  />
                </div>
              </div>

              <Button onClick={handleUserSettingsSave}>
                <Save className="h-4 w-4 mr-2" />
                Save User Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system">
          <div className="space-y-6">
            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">99.9%</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">2.3GB</div>
                    <div className="text-sm text-gray-600">Database Size</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">1,247</div>
                    <div className="text-sm text-gray-600">Active Users</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Backup & Maintenance */}
            <Card>
              <CardHeader>
                <CardTitle>Backup & Maintenance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">Database Backup</h4>
                    <p className="text-sm text-gray-600">Last backup: 2 hours ago</p>
                  </div>
                  <Button onClick={handleBackupExport} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Backup
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">System Restart</h4>
                    <p className="text-sm text-gray-600">Schedule system restart for maintenance</p>
                  </div>
                  <Button onClick={handleSystemRestart} variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Schedule Restart
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium">System Logs</h4>
                    <p className="text-sm text-gray-600">Download system logs for analysis</p>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Logs
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Information */}
            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform Version:</span>
                    <Badge variant="secondary">v2.1.0</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Database Version:</span>
                    <Badge variant="secondary">PostgreSQL 15.2</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Server Environment:</span>
                    <Badge variant="secondary">Production</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="text-sm">January 15, 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
