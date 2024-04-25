import React, { useState, useEffect } from "react";
import { Container, Alert, Button, Modal } from "react-bootstrap";
import axios from "axios";
import ClassAdd from "./ClassAdd";
import ClassUpdate from "./ClassUpdate";

interface Class {
  classCode: string;
  className: string;
  assignedFaculty: string;
  facultyId: number;
}

interface Faculty {
  facultyId: number;
  name: string;
}

function ClassList() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClassCodeToDelete, setSelectedClassCodeToDelete] = useState<string | null>(
    null
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const classResponse = await axios.get<Class[]>("http://127.0.0.1:3001/ClassList");
      const facultyResponse = await axios.get<Faculty[]>("http://127.0.0.1:3001/FacultyList");

      const classesWithFaculty = classResponse.data.map((classItem) => {
        const faculty = facultyResponse.data.find((faculty) => faculty.facultyId === classItem.facultyId);
        return {
          ...classItem,
          assignedFaculty: faculty ? faculty.name : "", // Assigned faculty name
        };
      });

      setClasses(classesWithFaculty);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (classCode: string) => {
    setSelectedClassCodeToDelete(classCode);
    setShowDeleteModal(true);
  };

  const deleteClass = async () => {
    if (selectedClassCodeToDelete === null) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://127.0.0.1:3001/ClassList/${selectedClassCodeToDelete}`
      );
      console.log(response);
      // Remove the class from the state
      const filteredClasses = classes.filter(
        (classItem) => classItem.classCode !== selectedClassCodeToDelete
      );
      setClasses(filteredClasses);
      setSelectedClassCodeToDelete(null);
      setShowDeleteModal(false);
      fetchClasses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateModal = (classItem: Class) => {
    setSelectedClass(classItem);
    setShowUpdateModal(true);
  };

  const handleUpdateClass = (updatedClass: Class) => {
    if (!selectedClass) {
      return;
    }

    // Update the class in the state
    const updatedClasses = classes.map((classItem) =>
      classItem.classCode === updatedClass.classCode ? updatedClass : classItem
    );

    setClasses(updatedClasses);
    fetchClasses();
  };

  const handleAddClass = (newClassData: Class) => {
    // Add the new class to the state
    setClasses([...classes, newClassData]);
    setShowAddModal(false);
    fetchClasses();
  };

  return (
    <Container className="col-md-8 col-md-offset-6  table-responsive">
      <h2>Class List</h2>
      <table className="table table-striped table-bordered border-primary table-sm align-middle">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Class Code</th>
            <th>Class Name</th>
            <th>Assigned Faculty</th>
            <th>Faculty ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{classItem.classCode}</td>
              <td>{classItem.className}</td>
              <td>{classItem.assignedFaculty}</td>
              <td>{classItem.facultyId}</td>
              <td>
                <Button variant="info" onClick={() => handleUpdateModal(classItem)}>
                  Update
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(classItem.classCode)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" onClick={() => setShowAddModal(true)}>
        Add Class
      </Button>
        
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this class?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteClass}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <ClassAdd
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddClass={handleAddClass}
      />

      <ClassUpdate
        show={showUpdateModal}
        classItem={selectedClass}
        onClose={() => setShowUpdateModal(false)}
        onUpdateClass={handleUpdateClass}
      />
    </Container>
  );
}

export default ClassList;
