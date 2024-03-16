const http = require('http')
const express = require("express")
const app = express()

const apps=require('./app')

const port = process.env.PORT || 3000   

//routers
app.use("/apps",apps)

//static images
app.use('/images',express.static('./images'))

//create connect with the server
const server = http.createServer(app)
//testing the port page
app.get('/', (req, res)=>{ res.send('hello')})
//listen to the port
server.listen(port,console.log('hello from port '+ port))