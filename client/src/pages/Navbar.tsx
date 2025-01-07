import { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Cookies from "js-cookie";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Navbar = () => {
  const navigate = useNavigate()

  // logout func
  const onLogOut = ()=>{
    Cookies.remove('token')
     navigate('/')
  }


  useEffect(()=>{
    const fetchUser = async()=>{
      try{
      const token = Cookies.get('token');
      const response = await axios.get("http://localhost:4000/api/dashboard",{
        headers:{
          "Authorization" : `Bearer ${token}`
        }
      })
       if(response.statusText !== "OK"){
        navigate('/api/login')
       }
     
    }catch(err){
           console.log(err)
           navigate('/api/login')
      }
    }
    fetchUser()
  },[])
  return (<>
  
  <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{background:"black"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Navbar
          </Typography>
          <Button color="inherit" variant="outlined" onClick={onLogOut}>Log out</Button>
          <Button color="inherit"><AccountCircleIcon/></Button>
        </Toolbar>
      </AppBar>
    </Box>
  
  </>
  )
}

export default Navbar