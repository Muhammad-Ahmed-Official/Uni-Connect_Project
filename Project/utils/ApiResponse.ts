export class ApiResponse {
    status:number;
    messsage:string;
    data?:any 

    constructor (status:number,message:string="success",data:any=null){
        this.status=status;
        this.messsage=message;
        this.data = data;
    }
}