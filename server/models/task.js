'use strict'

const Sequelize = require('sequelize');


 // Create Database in sql to store the data
let database = new Sequelize({
    dialect: 'sqlite',
    storage: './test.sqlite'
  });
  
  
  const Task = database.define('task', {
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
    }   
  });
//   Recipe.associate = (models) => {
//     //Определение отношение полей??
//     // Один ко многим????
//     Recipe.Ingredients = Recipe.hasMany(models.ingredient)
//   }

//    return Recipe

// }


module.exports = Task;
