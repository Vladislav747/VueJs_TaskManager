'use strict'

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('task', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      //Валидация средствами sequlize
      validate: { notEmpty: true }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      //Валидация средствами sequlize
      validate: { notEmpty: true }
    },
    description: {
      type: DataTypes.TEXT
    }   
  })

//   Recipe.associate = (models) => {
//     //Определение отношение полей??
//     // Один ко многим????
//     Recipe.Ingredients = Recipe.hasMany(models.ingredient)
//   }

   return Recipe

}
