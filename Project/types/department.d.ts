import { BaseEntity } from "./BaseEntity";

export interface IDepartment extends BaseEntity {
    departmentName: string;
    departmentBio: string
    departmentTags: string[]
    followers_count: number
    total_posts: number
}