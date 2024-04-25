import React, { useState, useEffect } from "react";
import { Container, Alert, Button, Modal } from "react-bootstrap";
import axios from "axios";
import FacultyAdd from "./FacultyAdd";
import FacultyUpdate from "./FacultyUpdate";

interface Faculty {
  facultyId: number;
  name: string;
  email: string;
  designation: string;
  department: string;
}

function FacultyList() {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFacultyIdToDelete, setSelectedFacultyIdToDelete] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);

  useEffect(() => {
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await axios.get<Faculty[]>("http://127.0.0.1:3001/FacultyList");
      const sortedFaculties = response.data.sort((a, b) => a.facultyId - b.facultyId);
      setFaculties(sortedFaculties);
    } catch (error) {
      console.log(error);
    }
  };

  function fetchFacultiesAndUpdateState() {
    axios
      .get<Faculty[]>("http://127.0.0.1:3001/FacultyList")
      .then((response) => {
        const sortedFaculties = response.data.sort((a, b) => a.facultyId - b.facultyId);
        setFaculties(sortedFaculties);
      })
      .catch((error) => {
        console.log(error);
      });
  };  

  const handleDelete = async (facultyId: number) => {
    setSelectedFacultyIdToDelete(facultyId);
    setShowDeleteModal(true);
  };

  const deleteFaculty = async () => {
    if (selectedFacultyIdToDelete === null) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://127.0.0.1:3001/FacultyList/${selectedFacultyIdToDelete}`
      );
      console.log(response);
      // Remove the faculty from the state
      const filteredFaculties = faculties.filter(
        (faculty) => faculty.facultyId !== selectedFacultyIdToDelete
      );
      setFaculties(filteredFaculties);
      setSelectedFacultyIdToDelete(null);
      setShowDeleteModal(false);
      fetchFacultiesAndUpdateState();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateModal = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    setShowUpdateModal(true);
  };

  const handleUpdateFaculty = (updatedFaculty: Faculty) => {
    if (!selectedFaculty) {
      return;
    }

    // Update the faculty in the state
    const updatedFaculties = faculties.map((faculty) =>
      faculty.facultyId === updatedFaculty.facultyId ? updatedFaculty : faculty
    );

    setFaculties(updatedFaculties);
    fetchFacultiesAndUpdateState();
  };

  const handleAddFaculty = async (newFacultyData: Faculty) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:3001/FacultyList",
        newFacultyData
      );
      console.log(response);
      // Add the new faculty to the state
      setFaculties([...faculties, newFacultyData]);
      setShowAddModal(false);
      fetchFacultiesAndUpdateState();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="col-md-8 col-md-offset-6  table-responsive">
      <h2>Faculty List</h2>
      <table className="table table-striped table-bordered border-primary table-sm align-middle">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Faculty ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faculties.map((faculty, index) => (
            <tr key={faculty.facultyId}>
              <td>{index + 1}</td>
              <td>{faculty.facultyId}</td>
              <td>{faculty.name}</td>
              <td>{faculty.email}</td>
              <td>{faculty.designation}</td>
              <td>{faculty.department}</td>
              <td>
                <Button variant="info" onClick={() => handleUpdateModal(faculty)}>Update</Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(faculty.facultyId)}
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
        Add Faculty
      </Button>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Faculty</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this faculty?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteFaculty}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <FacultyAdd
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddFaculty={handleAddFaculty}
      />

      <FacultyUpdate
        show={showUpdateModal}
        faculty={selectedFaculty}
        onClose={() => setShowUpdateModal(false)}
        onUpdateFaculty={handleUpdateFaculty}
      />
    </Container>
  );
}

export default FacultyList;
