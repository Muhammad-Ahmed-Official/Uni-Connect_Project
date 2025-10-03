import { NextResponse } from "next/server"
import { ApiResponse } from "./ApiResponse"
import { ApiError } from "./ApiError"

const nextResponse = (status: number, message: string, data: any = null, success: boolean = true) => {
    return NextResponse.json(
        new ApiResponse(success, status, message, data), { status: status }
    )
}
const nextError = (status: number, message: string, data: any = null, success: boolean = false) => {
    throw new ApiError(status, message, data)
}

export { nextResponse, nextError };