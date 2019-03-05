'use strict'

const Sequelize = require('sequelize');
const database = require('../database');




const Task = database.define('task', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        //Валидация средствами sequlize
        validate: { notEmpty: true }
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
        //Валидация средствами sequlize
        validate: { notEmpty: true }
    },
    description: {
        type: Sequelize.TEXT
    },
    tag: {
        type: Sequelize.TEXT
    },
    dateOfTask: {
        type: Sequelize.DATE
    }
});

module.exports = Task;
