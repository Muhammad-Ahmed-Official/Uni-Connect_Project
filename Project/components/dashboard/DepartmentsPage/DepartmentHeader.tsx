import { Users, MessageSquare, Building2 } from "lucide-react"
import { Department } from "@/app/dashboard/departments/[id]/page"
import { departmentMetaData } from "@/constants/DepartmentMetaData"

interface DepartmentHeaderProps {
    department: Department
    postCount: number
}

export const DepartmentHeader = ({ department, postCount }: DepartmentHeaderProps) => {
    return (
        <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
                <div className={`w-16 h-16 rounded-xl ${departmentMetaData.find((dept) => dept.name === department.departmentName)?.color} flex items-center justify-center text-3xl px-4`}>
                    {
                        departmentMetaData.find((dept) => dept.name === department.departmentName)?.icon || <Building2 className="h-6 w-6 text-blue-600" />
                    }
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{department.departmentName}</h1>
                    <p className="text-gray-600">{department.departmentBio}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{department.followers_count.toLocaleString()} members</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{postCount} discussions</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const DepartmentHeaderSkeleton = () => {
    return (
        <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-gray-200 animate-pulse" />
                <div className="flex-1">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-2 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4 animate-pulse" />
                    <div className="flex items-center space-x-4">
                        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    )
}