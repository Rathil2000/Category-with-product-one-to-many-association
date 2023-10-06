module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("product", {
        image:{
            type: DataTypes.STRING,
           
        },
        productName:{
            type:DataTypes.STRING,
            
        },
        price: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.TEXT
        },
        category_id:{
            type:DataTypes.INTEGER
        }
        
    })

    return Product

}