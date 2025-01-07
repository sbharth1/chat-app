import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
 
  const navigate = useNavigate();
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box>
        <Typography variant="h1" sx={{ fontSize: '8rem', fontWeight: 600 }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ marginBottom: '2rem' }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '2rem' }}>
          Sorry, the page you're looking for doesn't exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={()=> navigate('/')}
          sx={{ padding: '10px 20px', fontSize: '1rem' }}
        >
          Go to Homepage
        </Button>
      </Box>
    </Box>
  )
}

export default NotFound