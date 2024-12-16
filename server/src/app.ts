import express from 'express'
import http from 'http'
import cors from 'cors'
// import mongoose from 'mongoose'

const app = express()
const server = http.createServer(app)

app.use(cors())

app.get("/api/chat",(req,res)=>{
    res.send("hello world");
})

app.listen(3000)