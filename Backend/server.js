const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const LocalStrategy = require('passport-local')
const passport = require('passport')
const User = require('./models/users')
const Report = require('./models/report')
const PrescriptionForm = require('./models/PrescriptionForm')
const multer = require('multer')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())
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
        const role = user.role
        const token = jwt.sign({ email: user.email }, jwtSecret)
        res.status(200).json({
          message: 'Login Approved',
          token,
          role,
          email: user.email,
          name: user.name,
        })
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

// Import the File model

// Define route for file upload
app.post('/report', upload.single('file'), async (req, res) => {
  // const {Patientname,email,filename, path, size } = req.file;
  const Patientname = req.body.name
  const email = req.body.email
  const { filename, path, size } = req.file
  const file = new Report({
    Patientname,
    email,
    filename,
    path,
    size,
  })
  try {
    await file.save()
    res.send(file)
  } catch (err) {
    console.log(err)
    res.status(500).send('Error uploading file')
  }
})

app.post('/form', async(req, res) => {
  console.log('Request', req.body);
  let reqPatientName=req.body.patientName
  let reqEmail=req.body.email
  let reqMedicines=req.body.medicines
  let reqRemarks=req.body.remarks

  let newForm = new PrescriptionForm({
    patientName:reqPatientName,
    email:reqEmail,
    medicines:reqMedicines,
    remarks:reqRemarks,
  });
console.log('NEW FORM', newForm);
  try {
    await newForm.save();
    res.send(newForm)
    res.status(200);
  } catch (err) {
    console.log(err)
    res.status(500).send('Error sending data')
  }
});

app.get('/patient', verifyToken, async (req, res) => {
  try {
    const decoded = jwt.verify(req.token, jwtSecret)
    const user = await User.findOne({ email: decoded.email })
    if (user) {
      res.json({
        name: user.name,
        email: user.email,
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (err) {
    res.status(403).json({ message: 'Unauthorized' })
  }
})

app.get('/patient/reports', verifyToken, async (req, res) => {
  try {
    const decoded = jwt.verify(req.token, jwtSecret)
    const reports = await Report.find({ email: decoded.email }) // get all reports with the matching email
    if (reports.length > 0) {
      const reportsData = reports.map((report) => {
        return {
          Patientname: report.Patientname,
          email: report.email,
          filename: report.filename,
        }
      })
      res.status(200).json(reportsData) // send an array of reports to the frontend
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (err) {
    res.status(403).json({ message: 'Unauthorized' })
  }
})

app.get('/patient/reports/:filename', verifyToken, async (req, res) => {
  try {
    const decoded = jwt.verify(req.token, jwtSecret)
    const report = await Report.findOne({
      email: decoded.email,
      filename: req.params.filename,
    })
    if (!report) {
      res.status(404).json({ message: 'Report not found' })
    } else {
      const filePath = `uploads\\${report.filename}`
      res.download(filePath, report.filename)
    }
  } catch (err) {
    res.status(403).json({ message: 'Unauthorized' })
  }
})

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000') // Replace with your React app URL
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001') // Replace with your React app URL
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use(bodyParser.urlencoded({ extended: true }))



app.listen(3000, () => {
  console.log(`Server is running on port 3000.`)
})
