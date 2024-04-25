import React, { useState, useEffect } from "react";
import { Container, Alert, Button, Modal } from "react-bootstrap";
import axios from "axios";
import ClassAdd from "./ClassAdd";
import ClassUpdate from "./ClassUpdate";

interface Class {
  classCode: string;
  className: string;
  facultyAssigned: string;
}

interface Faculty {
  facultyId: number;
  name: string;
  email: string;
  designation: string;
  department: string;
}

function ClassList() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClassToDelete, setSelectedClassToDelete] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);

  useEffect(() => {
    fetchClasses();
    fetchFaculties();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get<Class[]>(
        "http://127.0.0.1:3001/ClassList"
      );
      setClasses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFaculties = async () => {
    try {
      const response = await axios.get<Faculty[]>(
        "http://127.0.0.1:3001/FacultyList"
      );
      setFaculties(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (classCode: string) => {
    setSelectedClassToDelete(classCode);
    setShowDeleteModal(true);
  };

  const deleteClass = async () => {
    if (selectedClassToDelete === null) {
      return;
    }

    try {
      await axios.delete(
        `http://127.0.0.1:3001/ClassList/${selectedClassToDelete}`
      );

      // Remove the class from the state
      const filteredClasses = classes.filter(
        (cls) => cls.classCode !== selectedClassToDelete
      );
      setClasses(filteredClasses);

      setSelectedClassToDelete(null);
      setShowDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateModal = (classObj: Class) => {
    setSelectedClass(classObj);
    setShowUpdateModal(true);
  };

  const handleUpdateClass = async (updatedClass: Class) => {
    if (!selectedClass) {
      return;
    }

    try {
      await axios.put(
        `http://127.0.0.1:3001/ClassList/${selectedClass.classCode}`,
        updatedClass
      );

      // Update the class in the state
      const updatedClasses = classes.map((cls) =>
        cls.classCode === updatedClass.classCode ? updatedClass : cls
      );

      setClasses(updatedClasses);
      setShowUpdateModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddClass = async (newClassData: Class) => {
    try {
      await axios.post("http://127.0.0.1:3001/ClassList", newClassData);

      // Add the new class to the state
      setClasses([...classes, newClassData]);
      setShowAddModal(false);
    } catch (error) {
      console.log(error);
    }
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
            <th>Faculty Assigned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classObj, index) => (
            <tr key={classObj.classCode}>
              <td>{index + 1}</td>
              <td>{classObj.classCode}</td>
              <td>{classObj.className}</td>
              <td>{classObj.facultyAssigned}</td>
              <td>
                <Button variant="info" onClick={() => handleUpdateModal(classObj)}>
                  Update
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(classObj.classCode)}>
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

      <ClassAdd show={showAddModal} onClose={() => setShowAddModal(false)} onAddClass={handleAddClass} faculties={faculties} />

      {selectedClass && (
        <ClassUpdate
          show={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          onUpdateClass={handleUpdateClass}
          classObj={selectedClass}
          faculties={faculties}
        />
      )}
    </Container>
  );
}

export default ClassList;
