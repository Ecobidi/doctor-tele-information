const router = require('express').Router()
const CategoryController = require('../controllers/category')

router.get('/', CategoryController.getCategoriesPage)

router.get('/new', CategoryController.createCategoryPage)

router.post('/new', CategoryController.createCategory)

router.get('/remove/:category_id', CategoryController.removeCategory)

module.exports = router