import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

interface FacultyData {
  facultyId: number;
  name: string;
  email: string;
  designation: string;
  department: string;
}

interface FacultyAddProps {
  show: boolean;
  onClose: () => void;
  onAddFaculty: (newFaculty: FacultyData) => void;
}

function FacultyAdd({ show, onClose, onAddFaculty }: FacultyAddProps) {
  const [newFacultyId, setNewFacultyId] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newDesignation, setNewDesignation] = useState("");
  const [newDepartment, setNewDepartment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFacultyData = {
      facultyId: Number(newFacultyId),
      name: newName,
      email: newEmail,
      designation: newDesignation,
      department: newDepartment,
    };

    try {
      // Check if any faculty with the given facultyId already exists in the database
      const response = await axios.get<FacultyData[]>(
        "http://127.0.0.1:3001/FacultyList"
      );

      const existingFaculty = response.data.find(
        (faculty) => faculty.facultyId === newFacultyData.facultyId
      );
      if (existingFaculty) {
        setError("Faculty ID already exists.");
      } else {
        onAddFaculty(newFacultyData);
        onClose();

        setNewFacultyId("");
        setNewName("");
        setNewEmail("");
        setNewDesignation("");
        setNewDepartment("");
        setError("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Faculty</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFacultyId">
            <Form.Label>Faculty ID</Form.Label>
            <Form.Control
              type="number"
              value={newFacultyId}
              onChange={(e) => setNewFacultyId(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDesignation">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              type="text"
              value={newDesignation}
              onChange={(e) => setNewDesignation(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDepartment">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              value={newDepartment}
              onChange={(e) => setNewDepartment(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Faculty
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default FacultyAdd;
