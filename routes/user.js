const router = require('express').Router()
const { body } = require('express-validator')
const UserController = require('../controllers/user')

router.get('/', UserController.getAllUsersPage)

router.get('/new', UserController.createUserPage)

router.post('/new', body(['first_name', 'surname', 'username', 'password'], 'All Fields are required'), UserController.createUser)

router.get('/delete/:user_id', UserController.removeUser)

module.exports = router