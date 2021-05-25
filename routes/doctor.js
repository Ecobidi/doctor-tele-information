const router = require('express').Router()
const { body } = require('express-validator')
const DoctorController = require('../controllers/doctor')


router.get('/', DoctorController.getDoctorsPage)

router.get('/new', DoctorController.createDoctorPage)

router.post('/new', body(['other_names', 'surname', 'username', 'password', 'specialization', 'email', 'phone', 'work_address'], 'All Fields are required').notEmpty(), DoctorController.createDoctor)

router.get('/delete/:doctor_id', DoctorController.removeDoctor)

module.exports = router