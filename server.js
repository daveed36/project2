const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
require('dotenv').config()
const session = require('express-session')
// const multer = require('multer')


const PORT = process.env.PORT || 3003
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

app.use(express.static('public'))
app.use(express.static('public/css'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
)



// Controllers
const productsController = require('./controllers/products_controllers.js')
app.use('/products', productsController)
const userController = require('./controllers/users_controllers.js')
app.use('/users', userController)
const sessionsController = require('./controllers/sessions_controllers.js')
app.use('/sessions', sessionsController)
// Routes
app.get('/', (req, res) => {
  res.redirect('/products')
})







db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI))
db.on('disconnected', () => console.log('mongo disconnected'))

app.get('/', (req, res) => {
  res.send('Hello World')
})
app.listen(PORT, () => {
  console.log('Listening on port: ', PORT)
})
