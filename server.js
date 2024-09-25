import express from 'express'
import cors from 'cors'
import fs from 'fs'
import { arr as data} from './dataBase.js'

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}))

app.get('/api/getData',(req,res) => {
    try {
        res.send(data)
    } catch (error) {
        res.send({message : 'server error!'})
    }
})

app.post('/api/createData', (req,res) => {
    try {
        const {username, email} = req.body

        const existingUsername = data.find(info => info.username === username)
        const existingUseremail = data.find(info => info.email === email)

        if (existingUseremail || existingUsername) {
            return res.send({error: 'user already exist!'})
        }

        data.push({username, email, id: Date.now()})
        console.log(data);
        
        fs.writeFileSync('./dataBase.js', `export const arr = ${JSON.stringify(data, null, 2)}`)
        res.send({message: 'data created succ!'})
    } catch (error) {
        console.log(error.message); 
    }
})

app.get('/api/getSingleData/:userId',(req, res) => {
    try {
        const {userId} = req.params
        const singleUser = data.find(info => info.id == userId)
        if (singleUser === undefined) {
            return res.send({message: 'user not found!'})
        }
        res.send({user: singleUser})
    } catch (error) {
        console.log(error.message);
        
    }
})

app.delete('/api/deleteUser/:userId', (req,res) => {
    try {
        const index = data.findIndex(info => info.id === Number(req.params.userId))
        if (index !== -1) {
            data.splice(index, 1)
            fs.writeFileSync('./dataBase.js', `export const arr = ${JSON.stringify(data, null, 2)}`)
            res.send('data deleted successfully!')
        }else{
            res.send({ message: 'user not found!' })
        }
        
    } catch (error) {
        console.log(error.message);
           
    }
})

app.put('/api/updateUser/:userId', (req,res) => {
    try {
        const index = data.findIndex(info => info.id === Number(req.params.userId))
        if (index != -1 ) {
            const obj = { username: req.body.username, email: req.body.email, id: Number(req.params.userId) }
            data.splice(index,1,obj)
            fs.writeFileSync('./dataBase.js',`export const arr = ${JSON.stringify(data, null, 2)}`)
            res.send({message: 'user updated sccessfully!'})
        }else{
            res.send({message : "user not found!"})
        }
    } catch (error) {
        res.send(error.message)
    }
})

app.listen(8080, () => {
    console.log('server is runing on port!');
    
})