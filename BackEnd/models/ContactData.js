const { DataTypes } = require('sequelize')

module.exports = (sequelize, type) => {
    return sequelize.define('contact_data',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        usr_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        numberPhone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}