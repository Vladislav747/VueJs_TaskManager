let task = require('../models/task');
let express = require('express');
let router = express.Router();




router.get('/', (req, res) => {
  task.findAll({
    attributes: [
      'id', 'category', 'name', 'description'
    ]
  })
  .then(tasks => {
    res.json(tasks)
  })
  .catch(errors => {
    res.json({ message: 'error', errors: errors.errors })
  });
});

router.post('/', (req, res) => {
  task.create(req.body)
  .then(task => {
    res.json({ message: 'success', name: task.name })
  })
  .catch(errors => {
    res.json({ message: 'error', errors: errors.errors })
  });
});

router.put('/', (req, res) => {
  task.findById(req.body.id)
  .then(task => {
    /* Метод Object.assign() копирует из исходных объектов в целевой объект
    recipe - целевой, req.body исходный*/
    task = Object.assign(task, req.body);
    return task.save();
  })
  .then(() => {
    res.json({ message: 'success', name: req.body.name })
  });
});

router.get('/:id', (req, res) => {
  task.findById(req.params.id)
  .then(recipe => {
    res.json(recipe)
  });
});

router.delete('/:id', (req, res) => {
  task.findById(req.params.id)
  .then(task => {
    return task.destroy()
  })
  .then(() => {
    res.json({ message: 'success' })
  });
});

module.exports = router;
