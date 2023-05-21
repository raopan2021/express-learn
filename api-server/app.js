const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 用户管理
const userRouter = require('./router/user')
app.use('/api/user',userRouter)

// 考勤管理
const attendanceRouter = require('./router/attendance')
app.use('/api/attendance',attendanceRouter)

// 出差管理
const evectionRouter = require('./router/evection')
app.use('/api/evection',evectionRouter)

// 加班管理
const overtimeRouter = require('./router/overtime')
app.use('/api/overtime',overtimeRouter)

// 其他
const otherRouter = require('./router/other')
app.use('/api/other',otherRouter)

app.listen(3018,() => {
    console.log('api server running at http://127.0.0.1:3018')
})