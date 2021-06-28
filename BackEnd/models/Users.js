const { DataTypes } = require('sequelize')

module.exports = (sequelize, type) => {
    return sequelize.define('users',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pass: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        validateEmail: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        } 
    })
}