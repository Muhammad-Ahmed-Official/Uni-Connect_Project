export interface Profile {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    studentId: string;
    department: string;
    year: string;
    bio: string;
    location: string;
}

export interface Notifications {
    emailNotifications: boolean;
    pushNotifications: boolean;
    forumUpdates: boolean;
    eventReminders: boolean;
    advisorMessages: boolean;
    systemUpdates: boolean;
    weeklyDigest: boolean;
}

export interface Privacy {
    profileVisibility: string;
    showEmail: boolean;
    showPhone: boolean;
    allowDirectMessages: boolean;
    showOnlineStatus: boolean;
}

export interface PasswordData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}