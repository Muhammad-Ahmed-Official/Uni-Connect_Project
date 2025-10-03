import { IAdvisorDetails, INotificationPreferences, IPrivacySettings, ISocialLink, IUser } from "@/types/user";
import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";
import { deflate } from "zlib";

//* SOCIAL LINKS SCHEMA

const SocialLinkSchema = new Schema<ISocialLink>({
    name: { type: String, required: true },
    url: { type: String, required: true },
});

//* PRIVACY SETTING SCHEMA

const PrivacySettingsSchema = new Schema<IPrivacySettings>({
    profile_visibility: {
        type: String,
        enum: ["university_only", "public", "department_only", "private"],
        default: "public",
    },
    show_email: { type: Boolean, default: false },
    show_phone: { type: Boolean, default: false },
    allow_direct_messages: { type: Boolean, default: true },
    show_online_status: { type: Boolean, default: true },
});

//* ADVISOR DETAIL SCHEMA 

const AdvisorDetailsSchema = new Schema<IAdvisorDetails>({
    officeLocation: { type: String },
    officeTiming: { type: String },
    specialties: [{ type: String }],
});

//* NOTIFICATION PREFERENCE SCHEMA

const NotificationPreferencesSchema = new Schema<INotificationPreferences>({
    email_notifications: { type: Boolean, default: true },
    push_notifications: { type: Boolean, default: true },
    forum_updates: { type: Boolean, default: true },
    event_reminders: { type: Boolean, default: true },
    advisor_messages: { type: Boolean, default: true },
    system_updates: { type: Boolean, default: true },
    weekly_digest: { type: Boolean, default: false },
});

//* USER SCHEMA

const UserSchema = new Schema<IUser>({
    username: { type: String, unique: true, required: true, index: true, immutable: true },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, "please use a valid email address"],
        immutable: true
    },
    password: {
        type: String,
        required: [true, "Password is reqired"],
        unique: true,
    },
    studentId: {
        type: String,
        required: function () {
            return this.role === "student"
        },
        index: true,
        immutable: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: null
    },
    profilePic: {
        type: String
    },
    idCard: {
        type: String,
        // required: function () {
        //     return this.role === "student"
        // },
    },
    social_links: { type: [SocialLinkSchema], default: [] },
    department_id: { type: Schema.Types.ObjectId, ref: "Department" },
    isVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["student", "admin", "department_Student_Advisor", "university_Student_Advisor"],
        default: "student",
    },
    privacy_settings: {
        type: PrivacySettingsSchema, default: {
            profile_visibility: "university_only",
            show_email: false,
            show_phone: false,
            allow_direct_messages: true,
            show_online_status: true,
        },
    },
    advisor_details: {
        type: AdvisorDetailsSchema, required: function () {
            return ["department_Student_Advisor", "university_Student_Advisor"].includes(this.role);
        }
    },
    employeeId: {
        type: String,
        required: function (this: IUser) {
            return ["department_Student_Advisor", "university_Student_Advisor"].includes(this.role);
        },
        index: true,
        immutable: true
    },
    notification_preferences: {
        type: NotificationPreferencesSchema,
        default: {
            email_notifications: true,
            push_notifications: true,
            forum_updates: true,
            event_reminders: true,
            advisor_messages: true,
            system_updates: true,
            weekly_digest: false,
        },
    },
},
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    };
    next();
});

const User = models?.User || model<IUser>("User", UserSchema);
export default User;