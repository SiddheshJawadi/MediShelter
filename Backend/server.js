const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const LocalStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')
const passport = require('passport')
const User = require('./models/users')
const UploadD = require('./models/uploadD')
const multer = require('multer')
const fs = require('fs')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  require('express-session')({
    secret: 'Secret',
    resave: false,
    saveUninitialized: false,
  }),
)

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

const jwtSecret = 'supersecretkey'

app.post('/register', async (req, res) => {
  const user = await User.findOne(
    { email: req.body.email },
    { contact: req.body.contact },
  )
  if (user) {
    res.send('<h1>Email or Phone Number Already Registered</h1>')
    return res.status(422)
  } else {
    const firstName = req.body.firstName
    const role = req.body.role
    const email = req.body.email
    const password = req.body.password
    const contact = req.body.contact
    const dob = req.body.dob
    console.log(firstName, role)

    const formData = new User({
      name: firstName,
      role: role,
      email: email,
      password: password,
      contact: contact,
      dob: dob,
    })
    try {
      await formData.save()
      res.send('inserted data..')
    } catch (err) {
      console.log(err)
    }
  }
})

app.post('/login', async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      if (req.body.password === user.password) {
        const token = jwt.sign({ email: user.email }, jwtSecret)
        res.status(200).json({ message: 'Login Approved', token })
      } else {
        console.log('Invalid Password')
        res.status(200).json({ message: 'Login Denied' })
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" })
    }
  } catch (error) {
    res.status(400).json({ error })
  }
})

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1]
    req.token = bearerToken
    next()
  } else {
    res.sendStatus(403)
  }
}

app.get('/home', verifyToken, (req, res) => {
  jwt.verify(req.token, jwtSecret, (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      res.send(`<h1>Welcome ${authData.email}</h1>`)
    }
  })
})

app.listen(3000, () => {
  console.log(`Server is running on port 3000.`)
})
