const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  facultyId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

const FacultyModel = mongoose.model("Faculty", facultySchema);

module.exports = FacultyModel;
