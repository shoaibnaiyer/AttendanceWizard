import React, { useState, useEffect } from "react";
import { Container, Alert, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import StudentAdd from "./StudentAdd";
import StudentUpdate from "./StudentUpdate";

interface Student {
  roll: number;
  name: string;
  email: string;
  address: string;
}

function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRollToDelete, setSelectedRollToDelete] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Add this state
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get<Student[]>(
        "http://127.0.0.1:3001/StudentList"
      );
      const sortedStudents = response.data.sort((a, b) => a.roll - b.roll);
      setStudents(sortedStudents);
    } catch (error) {
      console.log(error);
    }
  };

  function fetchStudentsAndUpdateState() {
    axios
      .get<Student[]>("http://127.0.0.1:3001/StudentList")
      .then((response) => {
        const sortedStudents = response.data.sort((a, b) => a.roll - b.roll);
      setStudents(sortedStudents);
      })
      .catch((error) => {
        console.log(error);
      });
  };  

  const handleDelete = async (roll: number) => {
    setSelectedRollToDelete(roll);
    setShowDeleteModal(true);
  };

  const deleteStudent = async () => {
    if (selectedRollToDelete === null) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://127.0.0.1:3001/StudentList/${selectedRollToDelete}`
      );
      console.log(response);
      // Remove the student from the state
      const filteredStudents = students.filter(
        (student) => student.roll !== selectedRollToDelete
      );
      setStudents(filteredStudents);
      setSelectedRollToDelete(null);
      setShowDeleteModal(false);
      fetchStudentsAndUpdateState();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateModal = (student: Student) => {
    setSelectedStudent(student);
    setShowUpdateModal(true);
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    if (!selectedStudent) {
      return;
    }

    // Update the student in the state
    const updatedStudents = students.map((student) =>
      student.roll === updatedStudent.roll ? updatedStudent : student
    );

    setStudents(updatedStudents);
    fetchStudentsAndUpdateState();
  };

  const handleAddStudent = async (newStudentData: Student) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3001/StudentList",
        newStudentData
      );
      console.log(response);
      // Add the new student to the state
      setStudents([...students, newStudentData]);
      setShowAddModal(false);
      fetchStudentsAndUpdateState();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="col-md-8 col-md-offset-6  table-responsive">
      <h2>Student List</h2>
      <table className="table table-striped table-bordered border-primary table-sm align-middle">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Roll</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.roll}>
              <td>{index + 1}</td>
              <td>{student.roll}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.address}</td>
              <td>
                <Button variant="info" onClick={() => handleUpdateModal(student)}>Update</Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(student.roll)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" onClick={() => setShowAddModal(true)}>
        Add Student
      </Button>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this student?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteStudent}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <StudentAdd
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddStudent={handleAddStudent}
      />

      <StudentUpdate
        show={showUpdateModal}
        student={selectedStudent}
        onClose={() => setShowUpdateModal(false)}
        onUpdateStudent={handleUpdateStudent}
      />
    </Container>
  );
}

export default StudentList;
