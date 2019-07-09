'use strict';

if (process.env.typeDB === 'sqlite') {

    let Sequelize = require('sequelize');
    let database = require('../database');
    let moment = require('moment');


    var Task = database.define('task', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            //Validation by sequlize
            validate: {
                notEmpty: true
            }
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false,
            //Validation by sequlize
            validate: {
                notEmpty: true
            }
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


} else {

    //Models by mongoose
    let mongoose = require('mongoose');
    let Schema = mongoose.Schema;

    //Создание схемы данных
    let TaskSchema = new Schema({
        id: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        tag: {
            type: String,
            required: false,
            set: function (arr) {
                var str = arr.join(',');
                return str;
            },
            get: function (str) {
                console.log(str);
                var asd = str.split(',');
                return str;
            }
        },

        description: {
            type: String,
            required: false
        },
        dateOfTask: {
            type: Date,
            required: false
        }
    }, {
        collection: 'tasks'
    });


    TaskSchema.path('tag').set(function (v) {
        console.log(v);
        return v.join(',');
    });

    TaskSchema.path('tag').get(function (v) {
        console.log(v);
        return v.split(',');
    });


    // Create collection and add schema
    var Task = mongoose.model('Task', TaskSchema);
}


module.exports = Task;