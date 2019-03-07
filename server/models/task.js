'use strict'

const Sequelize = require('sequelize');
const database = require('../database');
const moment = require('moment');

const Task = database.define('task', {
    id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement:true,
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
        type: Sequelize.TEXT,
        set: function (arr) {
            var str = arr.join(',');
            this.setDataValue('tag', str);
        },
        get: function () {
            return this.getDataValue('tag').split(',');
        }
    },
    dateOfTask: {
        type: Sequelize.DATE,
        get: function () {
            return moment.utc(this.getDataValue('dateOfTask')).format('LLL')
        }
    }
});

module.exports = Task;
