const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  classCode: {
    type: String,
    required: true,
    unique: true,
  },
  className: {
    type: String,
    required: true,
  },
  facultyAssigned: {
    type: String,
    required: true,
  },
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
