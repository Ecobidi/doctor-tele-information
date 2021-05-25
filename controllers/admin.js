const { validationResult } = require('express-validator')
const AdminService = require('../services/admin')

class AdminController {

  static async getAdminsPage(req, res) {
    let admins = await AdminService.findAll()
    res.render('admins', {admins})
  }

  static async createAdminPage(req, res) {
    res.render('admins-new', { errors: req.flash('errors') })
  }

  static async createAdmin(req, res) {
    let dao = req.body
    let validResults = validationResult(req)

    if (dao.password != dao.retype_password) {
      return res.render('doctors-new', { errors: validResults.errors, error_msg: 'Passwords Do Not Match', dao })
    }

    if (validResults.errors.length > 0) {
      req.flash('errors', validResults.errors)
      res.redirect('/admins/new')
    } else {
      try {
        // check for same username
        let sameUsername2 = await AdminService.findByUsername(dao.username)
        if (sameUsername2) {
          return res.render('admins-new', { error_msg: 'Username is taken', errors: [] })
        }
        await AdminService.create(dao)
        res.redirect('/admins')
      } catch (err) {
        console.log(err)
        res.redirect('/admins')
      }
    }
  }

  static async removeAdmin(req, res) {
    try {
      await AdminService.removeOne(req.params.admin_id)
      res.redirect('/admins')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/admins')
    }
  }

}

module.exports = AdminController