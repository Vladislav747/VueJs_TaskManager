const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./database');

let configs = require('./config/serverConfigs');
let port = process.env.PORT || configs.defultPort;
let routes = require('./routes/index');


let tasks = (process.env.typeDB === 'sqlite') ? require('./routes/tasks') : require('./routes/tasksM');

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



//We can use either the MongoDb or Sqlite database - depends on what env.typeDb - we use
if (process.env.typeDB === 'sqlite') {
  console.log("You are now using sqlite database");
  // Resets the database and launches the express app
  database
    .sync({
      force: true
    })
    .then(() => {
      app.listen(port, () => {
        console.log(`Server started on port ${port}`)
      })
    })
} else {

  console.log("You are now using mongodb database");
  //Config DB and start it
  require('./config/db');
  // Start server
  app.listen(port, () => console.log(`Server started on port ${port}`));
}