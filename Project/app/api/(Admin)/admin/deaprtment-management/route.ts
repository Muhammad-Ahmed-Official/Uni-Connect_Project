import { connectDB } from "@/lib/mongodb";
import DepartmentModel from "@/models/department.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions.util";
import User from "@/models/user.model";
import Event from "@/models/event.model";

export const GET = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session) {
    return nextError(401, "Unauthorized: Please login");
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  const searchFilter: any = {};
  if (search) {
    searchFilter.$or = [
      { departmentName: { $regex: search, $options: "i" } },
      { departmentChairman: { $regex: search, $options: "i" } },
    ];
  }

  const departments = await DepartmentModel.find(searchFilter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const departmentsWithCounts = await Promise.all(
    departments.map(async (dept) => {
      const [studentsCount, advisorsCount, eventsCount] = await Promise.all([
        User.countDocuments({ role: "student", department_id: dept._id }),
        User.countDocuments({
          role: { $in: ["department_Student_Advisor", "university_Student_Advisor"] },
          department_id: dept._id,
        }),
        Event.countDocuments({ department_id: dept._id }),
      ]);

      return {
        ...dept.toObject(),
        studentsCount,
        advisorsCount,
        eventsCount,
      };
    })
  );

  return nextResponse(200, "Departments fetched successfully", {
    departments: departmentsWithCounts,
    pagination: { page, limit },
  });
});
