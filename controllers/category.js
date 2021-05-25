const CategoryService = require('../services/category')

class CategoryController {

  static async getCategoriesPage(req, res) {
    if (req.query.search && req.query.search.length > 1) {
      let departments = await CategoryService.findByName(req.query.search) 
      return res.render('departments', {departments}) 
    }
    let departments = await CategoryService.findAll()
    res.render('departments', {departments})
  }
 
  static async createCategoryPage(req, res) {
    res.render('departments-new', {error_msg: req.flash('error_msg'), errors: []})
  }

  static async createCategory(req, res) {
    let dao = req.body
    try {
      await CategoryService.create(dao)
      res.redirect('/departments')
    } catch (err) {
      console.log(err)
      res.redirect('/departments')
    }
  }

  static async removeCategory(req, res) {
    try {
      await CategoryService.removeOne(req.params.category_id)
      res.redirect('/departments')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/departments')
    }
  }

}

module.exports = CategoryController