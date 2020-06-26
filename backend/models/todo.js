'use strict';

const TodoSchema = require('../models/todo-schema');

class Todo {
  constructor(model) {
    this.model = model;
  }

  // create a new todo
  create(name) {
    const newTodo = {name, done: false};
    const todo = new this.model(newTodo);

    return todo.save();
  }

  // get all todos
  findAll() {
    return this.model.find();
  }

  // get todo item by id
  findById(id) {
    return this.model.findById(id);
  }

  // remove todo item
  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  updateById(id, object) {
    const query = {_id: id};
    return this.model.findOneAndUpdate(query, object, {new: true})
  }
}

module.exports = new Todo(TodoSchema);