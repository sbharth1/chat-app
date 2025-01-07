
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



 export  const validateEmail = (email: string) => {
   const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   return regex.test(email);
 };

    export  const validatePassword = (password: string) => {
             const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
             return regex.test(password);
    };