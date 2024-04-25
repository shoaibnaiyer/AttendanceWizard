// // const express = require('express')
// // const mongoose = require('mongoose')
// // const cors = require('cors')
// // const UserModel = require('./models/students')



// // const app = express()
// // app.use(cors())
// // app.use(express.json())

// // // mongoose.connect("mongodb://localhost:27017/AttendanceWizard")
// // mongoose.connect("mongodb://127.0.0.1:27017/AttendanceWizard")

// // app.get("/StudentList", (req, res) => {
// //     UserModel.find()
// //       .then(studentLists => res.json(studentLists))
// //       .catch(err => res.json(err));
// //   });

// // app.post("/StudentList", (req, res) => {
// //     UserModel.create(req.body)
// //     .then(studentLists => res.json(studentLists))
// //     .catch(err => res.json (err))
// // })

// // app.listen(3001, () => {
// //     console.log("Server is running");
// // })


// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const StudentModel = require('./models/students');
// const FacultyModel = require('./models/faculty');


// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/AttendanceWizard');


// // Add a new student
// app.post('/StudentList', async (req, res) => {
//   try {
//     const newStudent = await StudentModel.create(req.body);
//     res.json(newStudent);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Fetch all students
// app.get('/StudentList', async (req, res) => {
//   try {
//     const students = await StudentModel.find();
//     res.json(students);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Delete a student by roll number
// app.delete('/StudentList/:roll', async (req, res) => {
//   try {
//     const deletedStudent = await StudentModel.findOneAndDelete({ roll: req.params.roll });
//     if (!deletedStudent) {
//       return res.status(404).json({ error: 'Student not found' });
//     }
//     res.json(deletedStudent);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Update a student by roll number
// app.put('/StudentList/:roll', async (req, res) => {
//     try {
//       const updatedStudent = await StudentModel.findOneAndUpdate(
//         { roll: req.params.roll },
//         req.body,
//         { new: true }
//       );
//       if (!updatedStudent) {
//         return res.status(404).json({ error: 'Student not found' });
//       }
//       res.json(updatedStudent);
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//     }
//   });

// // Add a new faculty
// app.post('/FacultyList', async (req, res) => {
//     try {
//       const newFaculty = await FacultyModel.create(req.body);
//       res.json(newFaculty);
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//     }
//   });
  
//   // Fetch all faculties
//   app.get('/FacultyList', async (req, res) => {
//     try {
//       const faculties = await FacultyModel.find();
//       res.json(faculties);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });
  
//   // Delete a faculty by facultyId
//   app.delete('/FacultyList/:facultyId', async (req, res) => {
//     try {
//       const deletedFaculty = await FacultyModel.findOneAndDelete({ facultyId: req.params.facultyId });
//       if (!deletedFaculty) {
//         return res.status(404).json({ error: 'Faculty not found' });
//       }
//       res.json(deletedFaculty);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });
  
//   // Update a faculty by facultyId
//   app.put('/FacultyList/:facultyId', async (req, res) => {
//     try {
//       const updatedFaculty = await FacultyModel.findOneAndUpdate(
//         { facultyId: req.params.facultyId },
//         req.body,
//         { new: true }
//       );
//       if (!updatedFaculty) {
//         return res.status(404).json({ error: 'Faculty not found' });
//       }
//       res.json(updatedFaculty);
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//     }
//   });
  
// // Start the server
// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
