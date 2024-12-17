import mongoose from "mongoose";
const {Schema,model}  = mongoose;

interface IUser {
 userName:string,
 lastName:string,
 email:string,
 password_hash:string,
 date_of_birth:Date,
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

    password_hash:{
      type:String,
      required:true
    },

    date_of_birth:{
     type:Date,
     require:true
    }
},{timestamps:true})

const User = model<IUser>("user",userSchema);


export default User;