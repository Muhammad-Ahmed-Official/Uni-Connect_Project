import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Save } from "lucide-react";
import { Notifications } from "@/types/settings";

interface NotificationsTabProps {
    notifications: Notifications;
    onNotificationsChange: (notifications: Notifications) => void;
    onSave: () => void;
}

export default function NotificationsTab({
    notifications,
    onNotificationsChange,
    onSave
}: NotificationsTabProps) {
    const toggleNotification = (key: keyof Notifications, checked: boolean) => {
        onNotificationsChange({ ...notifications, [key]: checked });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <NotificationSwitch
                        id="emailNotifications"
                        label="Email Notifications"
                        description="Receive notifications via email"
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => toggleNotification('emailNotifications', checked)}
                    />
                    <NotificationSwitch
                        id="pushNotifications"
                        label="Push Notifications"
                        description="Receive push notifications in browser"
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) => toggleNotification('pushNotifications', checked)}
                    />
                    <NotificationSwitch
                        id="forumUpdates"
                        label="Forum Updates"
                        description="Get notified about new posts and replies"
                        checked={notifications.forumUpdates}
                        onCheckedChange={(checked) => toggleNotification('forumUpdates', checked)}
                    />
                    <NotificationSwitch
                        id="eventReminders"
                        label="Event Reminders"
                        description="Reminders for upcoming events"
                        checked={notifications.eventReminders}
                        onCheckedChange={(checked) => toggleNotification('eventReminders', checked)}
                    />
                    <NotificationSwitch
                        id="advisorMessages"
                        label="Advisor Messages"
                        description="Messages from academic advisors"
                        checked={notifications.advisorMessages}
                        onCheckedChange={(checked) => toggleNotification('advisorMessages', checked)}
                    />
                    <NotificationSwitch
                        id="systemUpdates"
                        label="System Updates"
                        description="Platform updates and maintenance notices"
                        checked={notifications.systemUpdates}
                        onCheckedChange={(checked) => toggleNotification('systemUpdates', checked)}
                    />
                    <NotificationSwitch
                        id="weeklyDigest"
                        label="Weekly Digest"
                        description="Weekly summary of platform activity"
                        checked={notifications.weeklyDigest}
                        onCheckedChange={(checked) => toggleNotification('weeklyDigest', checked)}
                    />
                </div>
                <Button onClick={onSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                </Button>
            </CardContent>
        </Card>
    );
}

interface NotificationSwitchProps {
    id: string;
    label: string;
    description: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
}

function NotificationSwitch({ id, label, description, checked, onCheckedChange }: NotificationSwitchProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <Label htmlFor={id}>{label}</Label>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
            <Switch
                id={id}
                checked={checked}
                onCheckedChange={onCheckedChange}
            />
        </div>
    );
}