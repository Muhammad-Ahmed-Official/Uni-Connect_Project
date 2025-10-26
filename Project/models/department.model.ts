import { IDepartment } from "@/types/department"
import {Schema,models,model} from "mongoose"

const DepartmentSchema = new Schema<IDepartment>(
    {
        departmentName:{
            type:String,
            required:[true,"Department Name is required"],
            enum: ["Computer Science","Political Science", "Mass Communication","Law","Pharmacy"]
        },
        departmentBio:{
            type:String,
            required:[true,"Department Bio is required"]
        },
        departmentTags:{
            type:[String],
            required:true
        },
        established: {
            type: String,
            required: true,
        },
        followers_count:{
            type:Number,
            default:0
        },
        total_posts:{
            type:Number,
            default:0
        },
        departmentChairman:{
            type:String,
            required:[true,"Department Chairman is required"]
        },
        deaprtmentchairmanEmail:{
            type:String,
            required:false
        }
    }
)

const departmentModel = models?.Department || model<IDepartment>("Department",DepartmentSchema);

export default departmentModel