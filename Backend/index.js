const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const StudentModel = require('./models/students');
const FacultyModel = require('./models/faculty');
const ClassModel = require('./models/class');



const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/AttendanceWizard');


// Add a new student
app.post('/StudentList', async (req, res) => {
  try {
    const newStudent = await StudentModel.create(req.body);
    res.json(newStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Fetch all students
app.get('/StudentList', async (req, res) => {
  try {
    const students = await StudentModel.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a student by roll number
app.delete('/StudentList/:roll', async (req, res) => {
  try {
    const deletedStudent = await StudentModel.findOneAndDelete({ roll: req.params.roll });
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(deletedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update a student by roll number
app.put('/StudentList/:roll', async (req, res) => {
  try {
    const updatedStudent = await StudentModel.findOneAndUpdate(
      { roll: req.params.roll },
      req.body,
      { new: true }
      );
      if (!updatedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.json(updatedStudent);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Update student attendance by ID
  app.put('/StudentList/:id', async (req, res) => {
    try {
      const studentId = req.params.id;
      const { attendance } = req.body;
  
      // Find the student by ID and update the attendance field
      const updatedStudent = await StudentModel.findByIdAndUpdate(
        studentId,
        { attendance },
        { new: true } // Return the updated document
      );
  
      if (!updatedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      res.json(updatedStudent);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

// Add a new faculty
app.post('/FacultyList', async (req, res) => {
    try {
      const newFaculty = await FacultyModel.create(req.body);
      res.json(newFaculty);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Fetch all faculties
  app.get('/FacultyList', async (req, res) => {
    try {
      const faculties = await FacultyModel.find();
      res.json(faculties);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Delete a faculty by facultyId
  app.delete('/FacultyList/:facultyId', async (req, res) => {
    try {
      const deletedFaculty = await FacultyModel.findOneAndDelete({ facultyId: req.params.facultyId });
      if (!deletedFaculty) {
        return res.status(404).json({ error: 'Faculty not found' });
      }
      res.json(deletedFaculty);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Update a faculty by facultyId
  app.put('/FacultyList/:facultyId', async (req, res) => {
    try {
      const updatedFaculty = await FacultyModel.findOneAndUpdate(
        { facultyId: req.params.facultyId },
        req.body,
        { new: true }
      );
      if (!updatedFaculty) {
        return res.status(404).json({ error: 'Faculty not found' });
      }
      res.json(updatedFaculty);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });



// Get all classes
app.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single class by classCode
app.getClassByCode = async (req, res) => {
  try {
    const classCode = req.params.classCode;
    const classObj = await Class.findOne({ classCode });
    if (classObj) {
      res.status(200).json(classObj);
    } else {
      res.status(404).json({ message: 'Class not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new class
app.createClass = async (req, res) => {
  try {
    const { classCode, className, facultyAssigned } = req.body;
    const newClass = await Class.create({ classCode, className, facultyAssigned });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
};

// Update a class by classCode
app.updateClass = async (req, res) => {
  try {
    const classCode = req.params.classCode;
    const { className, facultyAssigned } = req.body;

    const updatedClass = await Class.findOneAndUpdate(
      { classCode },
      { className, facultyAssigned },
      { new: true }
    );

    if (updatedClass) {
      res.status(200).json(updatedClass);
    } else {
      res.status(404).json({ message: 'Class not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
};

// Delete a class by classCode
app.deleteClass = async (req, res) => {
  try {
    const classCode = req.params.classCode;
    const deletedClass = await Class.findOneAndDelete({ classCode });
    if (deletedClass) {
      res.status(200).json(deletedClass);
    } else {
      res.status(404).json({ message: 'Class not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});