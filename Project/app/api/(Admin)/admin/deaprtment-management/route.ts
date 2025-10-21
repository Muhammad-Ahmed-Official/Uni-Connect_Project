import { connectDB } from "@/lib/mongodb";
import DepartmentModel from "@/models/department.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions.util";
import User from "@/models/user.model";
import Event from "@/models/event.model";

// 🚀 DEPARTMENTS FETCHING ROUTE
export const GET = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
    await connectDB();

    // 🔹 Authentication (Agar zaroori ho)
    const session = await getServerSession(authOptions);
    if (!session) {
        return nextError(401, "Unauthorized: Please login");
    }

    // 🔹 Query params nikalna
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // 🔹 Filter for Searching
    const searchFilter: any = {};
    if (search) {
        searchFilter.$or = [
            { departmentName: { $regex: search, $options: "i" } },
            { departmentChairman: { $regex: search, $options: "i" } },
        ];
    }

    // 🔹 Pagination setup
    const skip = (page - 1) * limit;

    const departments = await DepartmentModel.find(searchFilter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    // ✅ Proper Promise.all usage
    const [totalStudents, totalEvents] = await Promise.all([
        User.countDocuments({
            role: "student",
            department_id: { $in: departments.map((dept) => dept._id) },
        }),
        Event.countDocuments({
            department_id: { $in: departments.map((dept) => dept._id) },
        }),
    ]);



    // ✅ Response
    return nextResponse(200, "Departments fetched successfully", {
        departments,
        totalStudents,
        totalEvents,
    });
});