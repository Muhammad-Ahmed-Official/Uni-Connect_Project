import { NextRequest, NextResponse } from "next/server"

const asyncHandler = (fn: (req: NextRequest) => Promise<NextResponse>) => {
    return async (req: NextRequest) => {
        try {
            await fn(req)
        } catch (error) {
            return NextResponse.json( { status: 500, message: error instanceof Error ? error.message : "Internal server Error" }, { status: 500 } );
        }
    }
}
export { asyncHandler };