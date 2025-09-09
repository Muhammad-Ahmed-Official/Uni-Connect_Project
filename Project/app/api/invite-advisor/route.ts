import { NextRequest, NextResponse } from "next/server";
import { asyncHandler } from "@/utils/asyncHandler";
import { nextError, nextResponse } from "@/utils/Response";
import { emailQueue } from "@/lib/bullMq";
import jwt from "jsonwebtoken";
import { inviteAdvisor } from "@/helpers/inviteAdvisor";



export const POST = asyncHandler(async (req: NextRequest): Promise<NextResponse> => {
    const body = await req.json();


    if (body.email && body.role && body.department) {
        const job = inviteAdvisor(body.email, body.role, body.department);
        await emailQueue.add(job?.name, job.data);
        return nextResponse(200, `Advisor invitation queued for ${body.email}`);
    }

    const { advisors } = body;
    if (!advisors || !Array.isArray(advisors) || advisors.length === 0) {
        return nextError(400, "Advisors array required for bulk invite");
    }

    const jobs = advisors
        .filter(a => {
            if (!a.email || !a.role) return false;

            if (a.role === "department_student_advisor" && !a.department) return false;

            return true;
        })
        .map(a => inviteAdvisor(a.email, a.role, a.department));

    if (jobs.length === 0) return nextError(400, "No valid advisors found");

    await emailQueue.addBulk(jobs);

    return nextResponse(200, `${jobs.length} advisor invitations queued`);
});
