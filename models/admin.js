const mongoose = require('mongoose')

let AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  first_name: {
    type: String,
  },
  surname: {
    type: String
  },
  email: {
    type: String
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'admin'
  }
})

module.exports = mongoose.model('admin', AdminSchema)