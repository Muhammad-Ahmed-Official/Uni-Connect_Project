import { NextRequest, NextResponse } from "next/server"

const asyncHandler = (fn: (req: NextRequest) => Promise<NextResponse>) => {
    return async (req: NextRequest) => {
        try {
            await fn(req)
        } catch (error) {

        }
    }
}

export { asyncHandler };