import { Button } from "@/components/ui/button";
import { Save, Bell } from "lucide-react";
import SettingsCard from "@/components/shared/SettingsCard";
import SettingsSwitch from "@/components/shared/SettingsSwitch";
import { NotificationSettings } from "@/types/settings";

interface NotificationSettingsTabProps {
    settings: NotificationSettings;
    onSettingsChange: (settings: NotificationSettings) => void;
    onSave: () => void;
}

export default function NotificationSettingsTab({
    settings,
    onSettingsChange,
    onSave,
}: NotificationSettingsTabProps) {
    const updateSetting = (key: keyof NotificationSettings, value: any) => {
        onSettingsChange({ ...settings, [key]: value });
    };

    return (
        <SettingsCard
            title="Admin Notification Preferences"
            icon={<Bell className="h-5 w-5" />}
        >
            <div className="space-y-6">
                <div className="space-y-4">
                    <SettingsSwitch
                        id="systemNotifications"
                        label="System Notifications"
                        description="General system notifications"
                        checked={settings.systemNotifications}
                        onCheckedChange={(checked) => updateSetting('systemNotifications', checked)}
                    />
                    <SettingsSwitch
                        id="adminAlerts"
                        label="Admin Alerts"
                        description="Critical admin alerts and warnings"
                        checked={settings.adminAlerts}
                        onCheckedChange={(checked) => updateSetting('adminAlerts', checked)}
                    />
                    <SettingsSwitch
                        id="userRegistrationAlerts"
                        label="User Registration Alerts"
                        description="Notifications for new user registrations"
                        checked={settings.userRegistrationAlerts}
                        onCheckedChange={(checked) => updateSetting('userRegistrationAlerts', checked)}
                    />
                    <SettingsSwitch
                        id="escalationAlerts"
                        label="Escalation Alerts"
                        description="Notifications for new escalations"
                        checked={settings.escalationAlerts}
                        onCheckedChange={(checked) => updateSetting('escalationAlerts', checked)}
                    />
                    <SettingsSwitch
                        id="systemErrorAlerts"
                        label="System Error Alerts"
                        description="Critical system error notifications"
                        checked={settings.systemErrorAlerts}
                        onCheckedChange={(checked) => updateSetting('systemErrorAlerts', checked)}
                    />
                    <SettingsSwitch
                        id="emailNotifications"
                        label="Email Notifications"
                        description="Send notifications via email"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                    />
                    <SettingsSwitch
                        id="smsNotifications"
                        label="SMS Notifications"
                        description="Send critical alerts via SMS"
                        checked={settings.smsNotifications}
                        onCheckedChange={(checked) => updateSetting('smsNotifications', checked)}
                    />
                </div>

                <Button onClick={onSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Notification Settings
                </Button>
            </div>
        </SettingsCard>
    );
}