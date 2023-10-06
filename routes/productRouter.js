// import controllers products, categories
const categoryController = require('../controllers/categoryController.js')
const productController = require('../controllers/productController.js')


// router
const router = require('express').Router()


// use routers
router.post('/addCategory', categoryController.upload , categoryController.addCategory)

router.get('/allCategories', categoryController.getAllCategories)

router.get('/published', categoryController.getPublishedCategory)



// Review Url and Controller

router.get('/allProducts', productController.getAllProducts)
router.post('/addProduct',productController.upload, productController.addProduct)
router.post('/addMultipleProduct/:categoy_id',productController.upload, productController.addMultipleProducts)

// get Category products
router.get('/getCategoryProducts/:id', categoryController.getCategoryProducts)

// get products Category
router.get('/getProductsCategory/:id', productController.getProductsCategory)




// Products router
router.get('/:id', categoryController.getOneCategory)

router.put('/update/:id', categoryController.upload,categoryController.updateCategory)

router.delete('/:id', categoryController.deleteCategory)

module.exports = router