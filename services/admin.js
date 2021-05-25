const AdminModel = require('../models/admin')

class AdminService {

  static async findByUsername(username) {
    return AdminModel.findOne({username})
  }
  
  static async findAll() {
    return AdminModel.find()
  }

  static async create(dao) {
    return AdminModel.create(dao)
  }

  static async update(id, update = {}) {
    return AdminModel.findByIdAndUpdate(id, {$set: update})
  }

  static async removeOne(id) {
    return AdminModel.findByIdAndRemove(id)
  }

}

module.exports = AdminService