import {Types,Document} from "mongoose"
import {BaseEntity} from "./BaseEntity"

 interface IDocument extends BaseEntity {
    title:string;
    url:string;
    document:string;
    department_id:Types.ObjectId;
    userId:Types.ObjectId;
    year:number;
    semester:number;
    document_type: "final" | "midterms" | "repeater";
    teacher:string;
    totalDownloads:number;
    view:number;
}

export default IDocument;