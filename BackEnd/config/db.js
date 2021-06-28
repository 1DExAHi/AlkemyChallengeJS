const { Sequelize } = require('sequelize')

const OperationsModel = require('../models/Operation');
const UsersModel = require('../models/Users')
//const ContactDataModel = require('../models/ContactData')
const CategoriesModel = require('../models/Categories')

const sequelize = new Sequelize('myblance', 'root', '', {
    host: "localhost",
    dialect : 'mysql',
    operatorsAliases: false 
  });

const Operations = OperationsModel(sequelize, Sequelize)
const Users = UsersModel(sequelize, Sequelize)
//const ContactData = ContactDataModel(sequelize, Sequelize)
const Categories = CategoriesModel(sequelize, Sequelize)

sequelize.sync({ force:false })
    .then((result) => {
        console.log("Tabla lista")
    }).catch((err) => {
        console.error("Error:"+err)
    });

module.exports = {
    Operations,
    Users,
    Categories
}