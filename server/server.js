const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const epilogue = require('epilogue')

let configs = require('./config/serverConfigs');


let app = express()
app.use(cors())
app.use(bodyParser.json())


// Create Database in sql to store the data
let database = new Sequelize({
  dialect: 'sqlite',
  storage: './test.sqlite'
})


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
})


// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: database
})

// Create the dynamic REST resource for our Post model
let taskResource = epilogue.resource({
  model: Task,
  endpoints: ['/tasks', '/tasks/:id']
})

// Resets the database and launches the express app on :8081
database
  .sync({ force: true })
  .then(() => {
    app.listen(configs.defultPort, () => {
      console.log('listening to port localhost:8081')
    })
  })