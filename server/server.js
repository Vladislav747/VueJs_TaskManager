const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const epilogue = require('epilogue');
const database = require('./database');

let configs = require('./config/serverConfigs');

let routes = require('./routes/index');
let tasks = require('./routes/tasks');

let app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers",
             "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")

  next()
});

app.use(cors());
app.use(bodyParser.json());

app.use('/', routes);
app.use('/tasks', tasks);

//Отлов ошибок
app.use((req, res, next) => {
  let err = new Error('Invalid Endpoint')
  err.status = 404

  next(err)
});

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  })
});


// // Create Database in sql to store the data
// let database = new Sequelize({
//   dialect: 'sqlite',
//   storage: './test.sqlite'
// });


// const Task = database.define('task', {
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     //Валидация средствами sequlize
//     validate: { notEmpty: true }
//   },
//   category: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     //Валидация средствами sequlize
//     validate: { notEmpty: true }
//   },
//   description: {
//     type: Sequelize.TEXT
//   }   
// });


// // Initialize epilogue
// epilogue.initialize({
//   app: app,
//   sequelize: database
// })

// // Create the dynamic REST resource for our Post model
// let taskResource = epilogue.resource({
//   model: Task,
//   endpoints: ['/tasks', '/tasks/:id']
// })

// Resets the database and launches the express app on :8081
database
  .sync({ force: true })
  .then(() => {
    app.listen(configs.defultPort, () => {
      console.log('listening to port localhost:8081')
    })
  })