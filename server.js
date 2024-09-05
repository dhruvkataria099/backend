import express from 'express'
import cors from 'cors'

const server = express()

server.use(express.json())
server.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

server.get('/',(req,res) => {
    console.log('we get your request and responsing your response');
    res.send({message: "we get your request and responsing your response"})
})

server.get('/api/about',(req,res) => {
    console.log('we get your request and responsing your response');
    res.send({message: "we get your request and responsing your response"})
})

server.listen(8080, () => {
    console.log('server is runing on port 8080');
})