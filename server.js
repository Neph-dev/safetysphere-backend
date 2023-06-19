const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { Server } = require('socket.io')
const { MongoClient } = require('mongodb')
const Report = require('./src/models/report.model')

require('dotenv').config()

const methods = ['GET', 'POST', 'PATCH', 'DELETE']

const corsOptions = {
    origin: '*',
    methods: methods,
    optionsSuccessStatus: 204
}

const app = express()
const PORT = 4000
const URI = process.env.ATLAS_URI
const http = require('http')
const server = http.createServer(app)
const io = new Server(server, { cors: corsOptions });

app.use(cors(corsOptions))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(cookieParser())
app.use("/v1/", require("./src/routes"))

// Change Stream setup
const reportChangeStream = Report.watch()

reportChangeStream.on('change', (change) => {
    if (change.operationType === 'insert') {
        const newReport = change.fullDocument
        io.emit('newReport', newReport)
    }
})

io.on('connection', (socket) => {
    console.log('A client connected.')

    socket.on('disconnect', () => console.log('A client disconnected.'))
})

const connectMongoDB = async () => {

    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })

    // const connection = mongoose.connection
    // connection.once('open', () => console.log('MongoDB database connection established successfully'))

    console.log('MongoDB database connection established successfully')
}

connectMongoDB().then(() => {
    server.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
})