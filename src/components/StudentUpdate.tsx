import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

interface Student {
  roll: number;
  name: string;
  email: string;
  address: string;
}

interface StudentUpdateProps {
  show: boolean;
  onClose: () => void;
  student: Student | null;
  onUpdateStudent: (updatedStudent: Student) => void;
}

function StudentUpdate({ show, onClose, student, onUpdateStudent }: StudentUpdateProps) {
  const [updatedStudent, setUpdatedStudent] = useState<Student | null>(null);
  const [error, setError] = useState("");

  // Use useEffect to update the updatedStudent state when the student prop changes
  useEffect(() => {
    setUpdatedStudent(student);
  }, [student]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!updatedStudent) {
      return;
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:3001/StudentList/${student?.roll}`,
        updatedStudent
      );
      console.log(response);
      // Call the onUpdateStudent callback to update the student in the parent component's state
      onUpdateStudent(updatedStudent);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {updatedStudent && (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formRoll">
              <Form.Label>Roll</Form.Label>
              <Form.Control
                type="number"
                value={updatedStudent.roll}
                onChange={(e) =>
                  setUpdatedStudent({
                    ...updatedStudent,
                    roll: Number(e.target.value),
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={updatedStudent.name}
                onChange={(e) =>
                  setUpdatedStudent({
                    ...updatedStudent,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={updatedStudent.email}
                onChange={(e) =>
                  setUpdatedStudent({
                    ...updatedStudent,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={updatedStudent.address}
                onChange={(e) =>
                  setUpdatedStudent({
                    ...updatedStudent,
                    address: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Student
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default StudentUpdate;
