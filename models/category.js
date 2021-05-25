const mongoose = require('mongoose')

let DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('department', DepartmentSchema)