let models = require('../models')
let express = require('express')
let router = express.Router()

router.get('/', (req, res) => {
  models.tasks.findAll({
    attributes: [
      'id', 'category', 'name', 'description'
    ]
  })
  .then(tasks => {
    res.json(tasks)
  })
})

router.post('/', (req, res) => {
  models.tasks.create(req.body, {
    include: [models.tasks.Ingredients]
  })
  .then(task => {
    res.json({ message: 'success', name: task.name })
  })
  .catch(errors => {
    res.json({ message: 'error', errors: errors.errors })
  })
})

router.put('/', (req, res) => {
  models.tasks.findById(req.body.id, {
    include: [models.tasks.Ingredients]
  })
  .then(task => {
    // Метод Object.assign() копирует из исходных объектов в целевой объект
    //recipe - целевой, req.body исходный
    task = Object.assign(task, req.body)
    return task.save()
  })
  .then(() => {
    res.json({ message: 'success', name: req.body.name })
  })
})

router.get('/:id', (req, res) => {
  models.recipe.findById(req.params.id, {
    include: [models.recipe.Ingredients]
  })
  .then(recipe => {
    res.json(recipe)
  })
})

router.delete('/:id', (req, res) => {
  models.recipe.findById(req.params.id, {
    include: [models.recipe.Ingredients]
  })
  .then(recipe => {
    return recipe.destroy()
  })
  .then(() => {
    res.json({ message: 'success' })
  })
})

module.exports = router
