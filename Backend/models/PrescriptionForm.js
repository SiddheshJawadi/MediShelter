const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/hospitalDB')
const passportLocalMongoose = require('passport-local-mongoose')
const PrescriptionForm = new mongoose.Schema({
    patientName: String,
    email: String,
    medicines: [{ 
        medicineName: String, 
        quantity: Number, 
        usage: String }],
    remarks: String,
  });

PrescriptionForm.plugin(passportLocalMongoose)

module.exports = mongoose.model('PrescriptionForm', PrescriptionForm)