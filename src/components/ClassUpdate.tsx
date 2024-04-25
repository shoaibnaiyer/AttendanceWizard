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

interface ClassUpdateProps {
  show: boolean;
  onClose: () => void;
  onUpdateClass: (updatedClass: ClassData) => void;
  classObj: ClassData;
  faculties: Faculty[]; // You need to pass the list of faculties from the parent component
}

function ClassUpdate({ show, onClose, onUpdateClass, classObj, faculties }: ClassUpdateProps) {
  const [className, setClassName] = useState(classObj.className);
  const [facultyAssigned, setFacultyAssigned] = useState(classObj.facultyAssigned);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Perform form validation here if needed

    const updatedClassData = {
      ...classObj,
      className: className,
      facultyAssigned: facultyAssigned,
    };

    onUpdateClass(updatedClassData);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Class</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formClassName">
            <Form.Label>Class Name</Form.Label>
            <Form.Control
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formFacultyAssigned">
            <Form.Label>Faculty Assigned</Form.Label>
            <Form.Control
              as="select"
              value={facultyAssigned}
              onChange={(e) => setFacultyAssigned(e.target.value)}
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
            Update Class
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ClassUpdate;
