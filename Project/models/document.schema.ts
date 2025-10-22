import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Document Schema
const documentSchema = new Schema({
    title: { type: String, required: true , index:true },
    document:{type:String,required:true},
    department_id: { type: String},
    userId: { type: String, required: true },
    year:{type:Number,required:true},
    semester:{type:String,required:true},
    document_type:{type:String,enum:["final","midterms","repeater"]},
    teacher:{type:String,required:true},
    totalDownloads:{type:Number,default:0},
    view:{type:Number,default:0}
}, { timestamps: true });

const DocumentSchema = models?.Document || model("Document", documentSchema);

export default DocumentSchema;