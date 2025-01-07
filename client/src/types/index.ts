import Joi from "joi";

  export interface LoginFormData {
    email:string,
    password:string,
  }
 
  export interface SignupFormData {
      userName:string,
      lastName:string,
      email:string,
      password:string,
      dateOfBirth:string
    }


     export  const signValidateSchema = Joi.object({
        userName: Joi.string().required().label("UserName"),
        lastName: Joi.string().required().label("LastName"),
        email: Joi.string().email({ tlds: { allow: false } }).required().label("Email"),
        password: Joi.string().min(6).required().label("Password"),
        dateOfBirth: Joi.date().required().label("dateOfBirth")
      }); 

    export const loginValidateSchema = Joi.object({
          email: Joi.string().email({ tlds: { allow: false } }).required().label("Email"),
          password: Joi.string().min(6).required().label("Password"),
        }); 

         