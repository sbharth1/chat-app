import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
const App = () => {
  const navigate = useNavigate();
  return (
    <>
    
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
          <Button color="inherit" onClick={()=> navigate('/api/login')} variant="outlined" sx={{marginRight:3}}>Login</Button>
          <Button color="inherit" onClick={()=> navigate('/api/signup')} variant="outlined">Singup</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  )
}

export default App