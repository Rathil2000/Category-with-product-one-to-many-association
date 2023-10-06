module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define("category", {
        image: {
            type: DataTypes.STRING
        },
        categoryName : {
            type: DataTypes.STRING,
            allowNull: false
        },
        
        published: {
            type: DataTypes.BOOLEAN
        }
    
    })

    return Category

}