const db = require('../models')

// image Upload
const multer = require('multer')
const path = require('path')


// create main Model
const Category = db.categories
const Product = db.products

// main work

// 1. create category

const addCategory = async (req, res) => {


    let info = {

        image: req.file.path,
        categoryName: req.body.categoryName,
        published: req.body.published ? req.body.published : false
    }
    console.log(info);
    const category = await Category.create(info)
    res.status(200).send(category)
    console.log(category)
    

}



// 2. get all categories

const getAllCategories = async (req, res) => {

    let categories = await Category.findAll({})
    res.status(200).send(categories)

}

// 3. get single product

const getOneCategory = async (req, res) => {


    let id = req.params.id
    let category = await Category.findOne({ where: { id: id } })
    res.status(200).send(category)

}

// 4. update Product

const updateCategory = async (req, res) => {
                    
     const {categoryName,published}=req.body;
     const id = req.params.id;
     const image=req.file.path;
     let category = await Category.findOne({ where: { id: id } })
     if(published){
        category.categoryName=categoryName;
        category.published=published;
     }
     if(req.file){
        category.image=image;
     }
     await category.save();

     res.status(200).send("Category updated succesfully...")
    
}
// 5. delete product by id

const deleteCategory = async (req, res) => {

    let id = req.params.id

    await Category.destroy({ where: { id: id } })

    res.status(200).send('Cetegory is deleted !')

}

// 6. get published product

const getPublishedCategory = async (req, res) => {

    const categories = await Category.findAll({ where: { published: true } })

    res.status(200).send(categories)

}

// 7. connect one to many relation Category and products

const getCategoryProducts = async (req, res) => {

    const id = req.params.id

    const data = await Category.findOne({
        include: [{
            model: Product,
            as: 'product'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

}


// 8. Upload Image Controller

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')









module.exports = {
    addCategory,
    getAllCategories,
    getOneCategory,
    updateCategory,
    deleteCategory,
    getPublishedCategory,
    getCategoryProducts,
    upload

}