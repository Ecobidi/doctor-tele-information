const { validationResult } = require('express-validator')
const UserService = require('../services/user')
const SpecializationService = require('../services/category')
const DoctorService = require('../services/doctor')

class UserController {

  static async homePage(req, res) {
    let departments = await SpecializationService.findAll()
    res.render('mobile/user-home', {departments})
  }

  static async listDoctorsPage(req, res) {
    let query = req.query.specialization
    console.log(query)
    if (query == 'all') {
      query = {}
    } else {
      let pattern = new RegExp(query, 'ig')
      query = { specialization: pattern }
    }
    try {
      let doctors = await DoctorService.findBySpecialization(query)
      console.log(query)
      console.log(doctors)
      res.render('mobile/doctor-list', {doctors})
    } catch (error) {
      console.log(error)
      res.redirect('/mobile/users/home')
    }
  }

  static async loginUserPage(req, res) {
    res.render('mobile/user-login', {error_msg: req.flash('error_msg')})
  }

  static async login(req, res) {
    let dao = req.body
    try {
      let user
      user = await UserService.findByUsername(dao.username)
      // check for password match
      if (user && user.password == dao.password) {
        req.session.loggedIn = true
        req.session.user = user
        res.redirect('/mobile/users/home')
      } else {
        req.flash('error_msg', 'Incorrect Login Details')
        res.redirect('/mobile/users/login')
      }
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/mobile/users/login')
    }
  }

  static async createUserPage(req, res) {
    res.render('mobile/user-register', { errors: req.flash('errors'), error_msg: req.flash('error_msg') })
  }

  static async createUser(req, res) {
    let dao = req.body
    console.log(dao)
    console.log('create user')
    if (dao.password != dao.retype_password) {
      req.flash('error_msg', 'Passwords do not match')
      return res.render('mobile/user-register', { errors: [], error_msg: 'Passwords Do Not Match', dao })
    }
    try {
      // check for same username
      let sameUsername2 = await UserService.findByUsername(dao.username)
      if (sameUsername2) {
        return res.render('mobile/user-register', { error_msg: 'Username is taken', errors: [] })
      }
      await UserService.create(dao)
      res.redirect('/mobile/users/login')
    } catch (err) {
      console.log(err)
      res.redirect('/mobile/users/register')
    }
  }

  static async logout(req, res) {
    req.session.isLoggedIn = false;
    req.session.user = null
    res.redirect('/mobile/users/login')
  }

}

module.exports = UserController