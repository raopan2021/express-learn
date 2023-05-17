const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

const userRouter = require('./router/user')
app.use('/api/user',userRouter)

const attendanceRouter = require('./router/attendance')
app.use('/api/attendance',attendanceRouter)

app.listen(3018,() => {
    console.log('api server running at http://127.0.0.1:3018')
})