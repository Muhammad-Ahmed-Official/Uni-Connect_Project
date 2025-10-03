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

export interface PlatformSettings {
    siteName: string;
    siteDescription: string;
    maintenanceMode: boolean;
    registrationEnabled: boolean;
    emailVerificationRequired: boolean;
    maxFileUploadSize: string;
    sessionTimeout: string;
}

export interface SecuritySettings {
    passwordMinLength: string;
    requireSpecialChars: boolean;
    requireNumbers: boolean;
    requireUppercase: boolean;
    twoFactorEnabled: boolean;
    loginAttemptLimit: string;
    accountLockoutDuration: string;
}

export interface NotificationSettings {
    systemNotifications: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
    adminAlerts: boolean;
    userRegistrationAlerts: boolean;
    escalationAlerts: boolean;
    systemErrorAlerts: boolean;
}

export interface UserSettings {
    defaultUserRole: string;
    autoApproveRegistrations: boolean;
    allowProfilePictures: boolean;
    allowDirectMessages: boolean;
    moderateForumPosts: boolean;
    maxDepartmentsPerUser: string;
}