const express = require('express')

//const bodyParser = require('body-parser')
const cors = require('cors')

const ApiRouter = require('./routes/api')

const app = express()

require('./config/db')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(cors())

app.use('/api', ApiRouter)


app.listen(3700, ()=>{
    console.log("Server listo")
})