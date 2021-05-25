const DoctorModel = require('../models/doctor')

class DoctorService {
  
  static async findAll() {
    return DoctorModel.find()
  }

  static async findBySpecialization(query) {
    return DoctorModel.find(query)
  }

  static async findByName(name) {
    let nameRegex = new RegExp(name, 'ig')
    return DoctorModel.find({ $or: [{surname: nameRegex}, {other_name: nameRegex}] })
  }

  static async findByUsername(username) {
    return DoctorModel.findOne({username})
  }

  static async findById(id) {
    return DoctorModel.findById(id)
  }

  static async create(dao) {
    return DoctorModel.create(dao)
  }

  static async removeOne(customer_id) {
    return DoctorModel.findByIdAndRemove(customer_id)
  }

}

module.exports = DoctorService