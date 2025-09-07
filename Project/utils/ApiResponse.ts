export class ApiResponse {
    status:number;
    message:string;
    data?:any ;
    success?:boolean

    constructor (success:boolean,status:number,message:string="success",data:any=null){
        this.status=status;
        this.message=message;
        this.data = data;
        this.success=success;
    }
}