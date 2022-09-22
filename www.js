const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const expressValidator = require('express-validator')
require('dotenv').config()
// import routes


const todoRoutes = require('./routes/todo')
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')
 

//app
const app = express()

// db
const URI = process.env.MONGO_URI

mongoose.connect(
  URI,
  {
    //useCreatendex: true,
    //useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err
    console.log('Connected to MongoDB!!!')
  }
)
// middlewares

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
// routes middleware
app.use('/api', todoRoutes)
app.use('/api', userRoutes)
app.use('/api', authRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})