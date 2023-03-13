const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/hospitalDB')

const tableSchema = new mongoose.Schema({
  name: String,
  role: String,
  email: String,
  password: String,
  contact: String,
  dob: Date,
})

const User = mongoose.model('User', tableSchema)

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/message', (req, res) => {
  res.json({ message: 'Hello from server!' })
})

app.post('/insert', async (req, res) => {
  const FirstName = req.body.firstName
  const Role = req.body.role
  const Email = req.body.email
  const Password = req.body.password
  const Contact = req.body.contact
  const Dob = req.body.dob
  console.log(FirstName, Role)

  const formData = new User({
    name: FirstName,
    role: Role,
    email: Email,
    password: Password,
    contact: Contact,
    dob: Dob,
  })
  try {
    await formData.save()
    res.send('inserted data..')
  } catch (err) {
    console.log(err)
  }
})

app.listen(3000, () => {
  console.log(`Server is running on port 3000.`)
})
