import express from 'express'

const server = express()

server.get('/',(req,res) => {
    console.log(req);
    
    res.send(`YOU REQUEST IS RESPONSE TO YOU ${req.query.pref_productdivName}`)
})
server.get('/api/about',(req,res) => {
    console.log('about page');
})

server.listen(8080, () => {
    console.log('server is runing on port 8080');
})