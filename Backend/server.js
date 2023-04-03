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

const { ReturnDocument } = require('mongodb')

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
    // check if the user exists
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      //check if password matches
      const result = req.body.password === user.password
      if (result) {
        console.log('Login Succesful')
        res.status(200).json({ message: 'Login Approved' })
      } else {
        console.log('Invalid Password')
        res.status(301).json({ message: 'Login Denied' })
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" })
    }
  } catch (error) {
    res.status(400).json({ error })
  }
})

app.listen(3000, () => {
  console.log(`Server is running on port 3000.`)
})
