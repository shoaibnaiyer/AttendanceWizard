import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

interface ClassData {
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

interface ClassAddProps {
  show: boolean;
  onClose: () => void;
  onAddClass: (newClass: ClassData) => void;
  faculties: Faculty[]; // You need to pass the list of faculties from the parent component
}

function ClassAdd({ show, onClose, onAddClass, faculties }: ClassAddProps) {
  const [newClassCode, setNewClassCode] = useState("");
  const [newClassName, setNewClassName] = useState("");
  const [newFacultyAssigned, setNewFacultyAssigned] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Perform form validation here if needed

    const newClassData = {
      classCode: newClassCode,
      className: newClassName,
      facultyAssigned: newFacultyAssigned,
    };

    onAddClass(newClassData);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Class</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formClassCode">
            <Form.Label>Class Code</Form.Label>
            <Form.Control
              type="text"
              value={newClassCode}
              onChange={(e) => setNewClassCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formClassName">
            <Form.Label>Class Name</Form.Label>
            <Form.Control
              type="text"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formFacultyAssigned">
            <Form.Label>Faculty Assigned</Form.Label>
            <Form.Control
              as="select"
              value={newFacultyAssigned}
              onChange={(e) => setNewFacultyAssigned(e.target.value)}
            >
              <option value="">Select Faculty</option>
              {faculties.map((faculty) => (
                <option key={faculty.facultyId} value={faculty.name}>
                  {faculty.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Class
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ClassAdd;
