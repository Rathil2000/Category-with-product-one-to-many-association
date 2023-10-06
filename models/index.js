const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.categories = require('./categoryModel.js')(sequelize, DataTypes)
db.products = require('./productModel.js')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})



// 1 to Many Relation

db.categories.hasMany(db.products, {
    foreignKey: 'category_id',
    as: 'product'
})

db.products.belongsTo(db.categories, {
    foreignKey: 'category_id',
    as: 'category'
})





module.exports = db
