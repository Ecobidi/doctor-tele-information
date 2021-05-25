const router = require('express').Router()
const MobileUserController = require('../controllers/mobile-user')

router.get('/login', MobileUserController.loginUserPage)

router.post('/login', MobileUserController.login)

router.get('/register', MobileUserController.createUserPage)

router.post('/register', MobileUserController.createUser)

router.get('/home', MobileUserController.homePage)

router.use('/', (req, res, next) => {
  // for authenticating login
  if (req.session.loggedIn && req.session.user.role == 'user') {
    next()
  } else {
    res.redirect('/mobile/users/home')
  }
})



router.get('/doctor-list', MobileUserController.listDoctorsPage)

router.get('/logout', MobileUserController.logout)


module.exports = router