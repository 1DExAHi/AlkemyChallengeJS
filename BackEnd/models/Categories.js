const { DataTypes } = require('sequelize')

module.exports = (sequelize, type) => {
    return sequelize.define('categories',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}