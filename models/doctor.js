const mongoose = require('mongoose')

let DoctorSchema = new mongoose.Schema({
  other_names: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  work_address: {
    type: String,
  },
  email: {
    type: String,
  },
  hospital: {
    type: String,
  },
  specialization: {
    type: [String],
    required: true,
  },
  qualification: {
    type: String,
  },
  years_of_experience: {
    type: Number,
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    default: 'doctor'
  }
})

module.exports = mongoose.model('doctor', DoctorSchema)