import mongoose from "mongoose";
const sessionSchema=new mongoose.Schema({
    businessLogin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"businessLogin",
        required:true
    },
    refreshTokenHash:{
        type:String,
        required:true
    },
    ip:{
        type:String,
        required:true
    },
    userAgent:{
        type:String,
        required:true
    },
    revoked:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

export default mongoose.model("Session",sessionSchema);