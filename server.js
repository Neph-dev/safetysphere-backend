const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

require('dotenv').config()

const app = express()
const PORT = 4000
const URI = process.env.ATLAS_URI

const whitelist = [`http://localhost:${PORT}`]
const methods = ['GET', 'POST', 'PATCH', 'DELETE']

const corsOptions = {
    origin: whitelist,
    methods: methods,
    optionsSuccessStatus: 204,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use("/v1/", require("./src/routes"));

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection

connection.once('open', () => console.log('MongoDB database connection established successfully'))
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))