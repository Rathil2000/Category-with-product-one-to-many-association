const express = require('express')
const cors = require('cors')
const cookieParser = require("cookie-parser");

const app = express()

// middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use(express.urlencoded({ extended: true }))


// routers
const router = require('./routes/productRouter.js')
app.use('/api/categories', router)

//static Images Folder

app.use('/Images', express.static('./Images'))


//port

const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})