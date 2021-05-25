const CategoryModel = require('../models/category')

class CategoryService {

  static async findAll() {
    return CategoryModel.find()
  }

  static async findById(category_id) {
    return CategoryModel.findById(category_id)
  }

  static async findByName(category_name) {
    return CategoryModel.findById(category_name)
  }

  static async create(dao) {
    return CategoryModel.create(dao)
  }

  static async removeOne(id) {
    return CategoryModel.findByIdAndRemove(id)
  }

}

module.exports = CategoryService