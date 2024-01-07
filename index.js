const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')

const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use('/api/users',userRoutes)

app.listen(3000, (req, res) => {
    console.log('server is running on port 3000')
})

mongoose.connect(process.env.MONGO_URL).then(() => console.log('connected')).catch((err) => console.log(err.message))