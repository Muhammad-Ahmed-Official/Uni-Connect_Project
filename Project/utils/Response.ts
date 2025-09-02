import { NextResponse } from "next/server"
import { ApiResponse } from "./ApiResponse" 



const nextResponse =(status:number,message:string,data:any=null)=>{
    return NextResponse.json(
        new ApiResponse(status,message,data),{status:status}
    )
}
const nextError =(status:number,message:string,data:any=null)=>{
    return NextResponse.json(
        {
            status:status,
            message:message,
            data
        },{status:status}
    )
}

export {nextResponse,nextError};