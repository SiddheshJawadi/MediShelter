const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/hospitalDB')
const multer = require('multer')
const passportLocalMongoose = require('passport-local-mongoose')

const upload = multer({ dest: 'uploads/' })

const Document = new mongoose.Schema({
  name: String,
  size: Number,
  path: String,
})

Document.plugin(passportLocalMongoose)

module.exports = mongoose.model('Document', Document)
