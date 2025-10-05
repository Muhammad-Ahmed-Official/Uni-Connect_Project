import { z } from "zod";


//* Privacy Settings
export const privacySettingsSchema = z.object({
    profile_visibility: z.enum(["university_only", "public", "department_only", "private"]).optional(),
    show_email: z.boolean().optional(),
    show_phone: z.boolean().optional(),
    allow_direct_messages: z.boolean().optional(),
    show_online_status: z.boolean().optional(),
});

//* Advisor Details (for advisor roles)
export const advisorDetailsSchema = z.object({
    officeLocation: z.string().optional(),
    officeTiming: z.string().optional(),
    specialties: z.array(z.string()).optional(),
});

//* Notification Preferences
export const notificationPreferencesSchema = z.object({
    email_notifications: z.boolean().optional(),
    push_notifications: z.boolean().optional(),
    forum_updates: z.boolean().optional(),
    event_reminders: z.boolean().optional(),
    advisor_messages: z.boolean().optional(),
    system_updates: z.boolean().optional(),
    weekly_digest: z.boolean().optional(),
});

//* Final User Update Schema
export const profileUpdateSchema = z.object({
    firstName: z.string().min(1, "First name is required").optional(),
    lastName: z.string().min(1, "Last name is required").optional(),
    bio: z.string().max(300).nullable().optional(),
    profilePic: z.string().url().optional(),
    social_links: z.array(
        z.object({
            name: z.string().min(1),
            url: z.string().url()
        })
    ).optional(),
    advisor_details: z
        .object({
            officeLocation: z.string().optional(),
            officeTiming: z.string().optional(),
            specialties: z.array(z.string()).optional(),
        })
        .optional(),
});

