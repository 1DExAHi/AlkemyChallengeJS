const { DataTypes } = require('sequelize')

module.exports = (sequelize, type) => {
    return sequelize.define('operations',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usr_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        concept: {
            type: DataTypes.STRING
        },
        amount: {
            type: DataTypes.FLOAT
        }, 
        dateOf: {
            type: DataTypes.DATEONLY
        }, 
        category: {
            type: DataTypes.INTEGER
        },
        typeOf: {
            type: DataTypes.STRING
        }
    })
}