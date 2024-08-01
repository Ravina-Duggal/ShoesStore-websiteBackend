const express = require('express')
const app = express()
const port = 3000
const config = require('./config/db')


const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json({limit:'50mb'}))
app.use(express.static(__dirname+('/public')))

const adminroutes = require('./routes/adminroutes')
app.use("/admin",adminroutes)
const userRoutes = require('./routes/userroutes')
app.use("/user",userRoutes)
const localroutes = require('./routes/localroutes')
app.use("/",localroutes)

const seeder = require('./config/seeder')
seeder.adminseeder()

app.listen(port,()=>{
    console.log("server runningat port "+port)
})