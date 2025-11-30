import mongoose , {Schema} from "mongoose";

// creating use schema
const  userSchema = new Schema({
    userName : {
        type : String,
        required : [true , "Username is required"],
        unique : true,
        lowercase : true,
        trim : true,
        index : true
    },
    fullName : {
        type : String,
        required : [true , "Fullname is required"],
        unique : true,
        trim : true
    },
    email : {
        type : String,
        required : [true ,  "Email is required"],
        unique : true,
        trim : true,
        lowercase : true,
        index : true
    },
    avatar : {
        type : string,
        required : true,
    },
    coverImage : {
        type : string,
    },
    watchHistory : [
        {
            type : Schema.Types.ObjectId,
            ref : "Video"
        }
    ],
    password : {
        type : String,
        required : [true , "Password is required"]
    },
    refreshToken : {
        type : String,
    },
},{timestamps : true})

// In the mongoDB the mongoose is going to create a document with this structure
// The name of teh document is User and the sturcture which is being followed id userSchema
export const User = mongoose.model("User" , userSchema)