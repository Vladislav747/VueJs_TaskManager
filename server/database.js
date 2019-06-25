const Sequelize = require('sequelize');

// Create Database in sql to store the data
let database = new Sequelize({
    dialect: 'sqlite',
    storage: './test.sqlite',
    "operatorsAliases": false
});

module.exports = database;