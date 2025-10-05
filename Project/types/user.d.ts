import { Document, Types } from "mongoose";
import { BaseEntity } from "./BaseEntity"; 

export interface ISocialLink {
  name: string;
  url: string;
}

export interface IPrivacySettings {
  profile_visibility: "university_only" | "public" | "department_only" | "private";
  show_email: boolean;
  show_phone: boolean;
  allow_direct_messages: boolean;
  show_online_status: boolean;
}

export interface IAdvisorDetails {
  officeLocation: string;
  officeTiming: string;
  specialties: string[];
}

export interface INotificationPreferences {
  email_notifications: boolean;
  push_notifications: boolean;
  forum_updates: boolean;
  event_reminders: boolean;
  advisor_messages: boolean;
  system_updates: boolean;
  weekly_digest: boolean;
}

export interface IUser extends Document,BaseEntity {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  year?: number;
  bio?: string;
  profilePic?: string;
  idCard: string;
  social_links?: SocialLink[];
  studentId: string;
  employeeId:string;
  department_id: Types.ObjectId;
  role: "student" | "admin" | "department_Student_Advisor" | "University_Student_Advisor";
  privacy_settings?: PrivacySettings;
  advisor_details?: AdvisorDetails;
  notification_preferences?: NotificationPreferences;
  isVerified: boolean,
}
