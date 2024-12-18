import mongoose from "mongoose";
const {Schema,model}  = mongoose;

interface IUser {
 userName:string,
 lastName:string,
 email:string,
 password:string,
 date_of_birth:String,
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

    date_of_birth:{
     type:String,
     required:true
    }
},{timestamps:true})

const User = model<IUser>("user",userSchema);


export default User;