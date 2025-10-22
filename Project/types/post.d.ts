import { Document, Types } from "mongoose";
import { BaseEntity } from "./BaseEntity";

export interface IPost extends Document, BaseEntity {
  user_id: Types.ObjectId;
  title: string;
  content: string;
  tags?: string[];
  department_id: Types.ObjectId;
  share_count: number;
  likes_count: number;
  comment_count: number;
  views: number;
  isPinned: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  _id?: string;
}

export interface User {
  _id: string;
  email: string;
  studentId: string;
  year: number | null;
  firstName: string;
  lastName: string;
  profilePic: string | null;
  bio: string | null;
  social_links: SocialLink[];
  createdAt: string;
}

export interface Post {
  _id: string;
  user_id: User;
  title: string;
  content: string;
  tags: string[];
  department_id: string;
  share_count: number;
  likes_count: number;
  comment_count: number;
  views: number;
  createdAt: string;
  isPinned: boolean;
}