if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config() 
}
const express = require('express')
const http = require('http')
const cors = require('cors')
const router = require('./routes')

const app = express()
const server = http.Server(app)

app.get('/', (req, res) =>{
    return res.json('hello')
})

app.use(cors()) 
app.use(express.json())
//app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(router)


const PORT = process.env.PORT || 3000 
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})