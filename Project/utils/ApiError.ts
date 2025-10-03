class ApiError extends Error {
    public statusCode: number;
    public data: any;
    public success: boolean;

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        data: any = null,
        success: boolean = false
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
        this.success = success;
        this.name = "ApiError";

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };