'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
  name: {type:String, required:true},
  done: {type: Boolean},
});

module.exports = mongoose.model('todo', todoSchema);