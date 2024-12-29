import http from 'http'
import app from './app'
import dotenv from 'dotenv'
dotenv.config();
const PORT  = process.env.PORT || 5000;

const server  = http.createServer(app);

server.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}`);
    
})

