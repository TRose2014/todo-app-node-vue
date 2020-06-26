'use strict';

const express = require('express');
const app = express.Router();
const model = require('../models/todo');

// get all todo items from db
app.get('/', (req, res) => {
  model.findAll()
    .then((todos) => {
    res.json(todos);
  })
  .catch((err) => console.log(err))
});

// create a todo item
app.post('/', (req, res) => {
  const { name } = req.body;
  model.create(name)
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => console.log(err));
});

app.put('/:id', (req, res) => {
  const { id } = req.params;
  const todo = {name: req.body.name, done: req.body.done};
  model.updateById(id, todo)
    .then(res.status(200).json('Item updated successfully!'))
    .catch((err) => console.log(err));
});

app.delete('/:id', (req, res) => {
  const { id } = req.params;
  model.deleteById(id)
    .then(res.status(200).json('Item deleted successfully!'))
    .catch((err) => console.log(err));
})

module.exports = app;