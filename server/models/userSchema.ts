import mongoose from "mongoose";
const {Schema,model}  = mongoose;

interface IUser {
 userName:string,
 lastName:string,
 email:string,
 password:string,
 dateOfBirth:String,
}

const userSchema = new Schema<IUser>({
    userName:{
        type:String,
        required:true,
        unique:true,
    }, 
   
    lastName:{
        type:String,
        required:true,
        unique:true,
    },
    email: {
        type: String,
        required: true,
        unique: true
      },

    password:{
      type:String,
      required:true,
    },

    dateOfBirth:{
     type:String,
     required:true
    },
},{timestamps:true})

const User = model<IUser>("user",userSchema);


export default User;