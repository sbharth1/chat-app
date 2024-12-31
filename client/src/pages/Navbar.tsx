import { useEffect } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    const fetchUser = async()=>{
      try{
      const token = Cookies.get('token');
      const response = await axios.get("http://localhost:4000/api/dashboard",{
        headers:{
          "Authorization" : `Bearer ${token}`
        }
      })
       if(response.status!= 201){
        navigate('/')
       }
     
    }catch(err){
           console.log(err)
           navigate('/')
      }
    }
    fetchUser()
  },[])
  return (
    <h1>Navbar</h1>
  )
}

export default Navbar