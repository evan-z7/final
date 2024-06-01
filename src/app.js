const express =require('express')
const body_parser = require("body-parser")
const app =express()
const postRoute = require('./routers/posts')
const userRoute = require('./routers/user')
require ('./cloudinary/cloudinary')
app.use(body_parser.json())

app.use("/posts",postRoute)
app.use("/user",userRoute)


 
module.exports =app
  