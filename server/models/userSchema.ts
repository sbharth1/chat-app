import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const {Schema,model}  = mongoose;

interface IUser {
 userName:string;
 lastName:string;
 email:string;
 password:string;
 dateOfBirth:String;
 passwordResetToken?: string;
 passwordResetExpires?: Date;
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
    passwordResetToken: {
      type: String,
      default: undefined
    },
    passwordResetExpires: {
      type: Date,
      default: undefined
    }
  
},{timestamps:true})

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
      const salt = await bcrypt.genSalt(15);
      this.password = await bcrypt.hash(this.password, salt);
      next();
  } catch (error) {
      next(error as Error);
  }
});

const User = model<IUser>("user",userSchema);


export default User