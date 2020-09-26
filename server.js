require('dotenv').config()
const express = require('express')
const http = require('http')
const cors = require('cors')
const router = require('./routes')

const app = express()
const server = http.createServer(app)

app.get('/', (req, res) =>{
    return res.json('hello')
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(__dirname+'/public'))
app.use(router)



server.listen(3000 || process.env.PORT, () => {
    console.log('Listening to port 3000')
})