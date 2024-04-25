const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    roll: {
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
        unique: true,
      },
      address: {
        type: String,
        required: true,
      },

      attendance: {
        type: Number,
        default: 0
      },

})

const StudentModel = mongoose.model("studentList", studentSchema)
module.exports = StudentModel