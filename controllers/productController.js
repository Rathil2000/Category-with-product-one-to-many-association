const db = require('../models')

// image Upload
const multer = require('multer');
const path = require('path');

// model
const Category = db.categories
const Product = db.products

// functions

//1. Add Product

const addProduct = async (req, res) => {
console.log("file data is:",req.file);
    
    const categoryId =req.body.category_id;
    console.log("category id is:" ,categoryId);
    image =req.file.path;
    console.log(image);
    let data = {
        category_id: categoryId,
        image: req.file.path,
        productName :req.body.productName,
        description: req.body.description,
        price:req.body.price
    }

    const product = await Product.create(data)
    res.status(200).send(product)
    console.log(product);
}

// 2. Add multiple product under single category

const addMultipleProducts =async (req,res)=>{
   
    let data = req.body;
    // let = req.params.id;
      
    const product = await Product.bulkCreate(data);
    res.status(200).send(product);
    console.log(product);
}

// 2. Get All Reviews

const getAllProducts = async (req, res) => {

    const products = await Product.findAll({})
    res.status(200).send(products)
    console.log(req.body)

}

// 3. Get many to one relationship with products and category

const getProductsCategory =  async (req, res) => {

    const id = req.params.id

    const data = await Product.findAll({
        include: [{
            model: Category,
            as: 'category'
        }],
        where: { category_id: id }
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

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')

module.exports = {
    addProduct,
    addMultipleProducts,
    getAllProducts,
    getProductsCategory,
    upload
}