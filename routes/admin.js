const router = require('express').Router()
const { body } = require('express-validator')
const AdminController = require('../controllers/admin')

router.get('/', AdminController.getAdminsPage)

router.get('/new', AdminController.createAdminPage)

router.post('/new', body(['first_name', 'surname', 'username', 'password'], 'All Fields are required'), AdminController.createAdmin)

router.get('/delete/:user_id', AdminController.removeAdmin)

module.exports = router