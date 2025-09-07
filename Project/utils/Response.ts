import { NextResponse } from "next/server"
import { ApiResponse } from "./ApiResponse" 



const nextResponse =(status:number,message:string,data:any=null,success:boolean=true)=>{
    return NextResponse.json(
        new ApiResponse(success,status,message,data),{status:status}
    )
}
const nextError =(status:number,message:string,data:any=null,success:boolean=false)=>{
    return NextResponse.json(
        {
            status:status,
            message:message,
            data,
            success:success,
        },{status:status}
    )
}

export {nextResponse,nextError};