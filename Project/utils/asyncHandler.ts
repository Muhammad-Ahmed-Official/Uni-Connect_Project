import { NextRequest, NextResponse } from "next/server";
import { nextResponse } from "./Response";
import { ApiError } from "./ApiError";

const asyncHandler = (
    fn: (req: NextRequest) => Promise<NextResponse>
) => {
    return async (req: NextRequest) => {
        try {
            return await fn(req);
        } catch (error) {
            console.log("error in asyncHandler ==>", error);

            if (error instanceof ApiError) {
                return nextResponse(
                    error.statusCode,
                    error.message,
                    error.data,
                    false
                );
            }

            return nextResponse(
                500,
                error instanceof Error ? error.message : "Internal Server Error",
                null,
                false
            );
        }
    };
};

export { asyncHandler };