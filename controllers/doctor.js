const fs = require('fs/promises')
const path = require('path')
const sharp = require('sharp')
const { validationResult } = require('express-validator')
const DoctorService = require('../services/doctor')
const CategoryService = require('../services/category')

class DoctorController {

  static async getDoctorsPage(req, res) {
    let doctors = await DoctorService.findAll()
    res.render('doctors', {doctors})
  }

  static async createDoctorPage(req, res) {
    let departments = await CategoryService.findAll()
    res.render('doctors-new', { departments, errors: req.flash('errors') })
  }

  static async createDoctor(req, res) {
    let dao = req.body
    dao.photo = ''
    let validResults = validationResult(req)

    if (dao.password != dao.retype_password) {
      return res.render('doctors-new', { errors: validResults.errors, error_msg: 'Passwords Do Not Match', dao })
    }

    if (validResults.errors.length > 0) {
      req.flash('errors', validResults.errors)
      res.redirect('/doctors/new')
    } else {
      try {
        // // check for same username
        let sameUsername2 = await DoctorService.findByUsername(dao.username)
        if (sameUsername2) {
          return res.render('doctors-new', { error_msg: 'Username is taken', errors: [] })
        }
        if (req.files) {
          let file = req.files.photo
          let extname = path.extname(file.name)
          let filename = 'doctor_' + dao.username + extname
          await file.mv(process.cwd() + '/uploads/images/' + filename)
          dao.photo = filename
          await DoctorService.create(dao)
        } else {
          await DoctorService.create(dao)
        }
        res.redirect('/doctors')
      } catch (err) {
        console.log(err)
        res.redirect('/doctors')
      }
    }
  }

  static async editDoctorPage(req, res) {
    let doctor_id = req.query.doctor_id
    let dao = req.body
    try {
      await DoctorService.updateById(doctor_id, dao)
      req.flash('success_msg', 'Update Successful')
      res.redirect('/doctors')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/doctors')
    }
  }

  static async removeDoctor(req, res) {
    try {
      let doc = await DoctorService.removeOne(req.params.doctor_id)
      await fs.unlink(process.cwd() + '/uploads/images/' + doc.photo)
      res.redirect('/doctors')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/doctors')
    }
  }

}

module.exports = DoctorController