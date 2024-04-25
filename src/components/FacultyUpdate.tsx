import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";

interface Faculty {
  facultyId: number;
  name: string;
  email: string;
  designation: string;
  department: string;
}

interface FacultyUpdateProps {
  show: boolean;
  onClose: () => void;
  faculty: Faculty | null;
  onUpdateFaculty: (updatedFaculty: Faculty) => void;
}

export const FacultyUpdate: React.FC<FacultyUpdateProps> = ({ show, onClose, faculty, onUpdateFaculty }) => {
  const [updatedFaculty, setUpdatedFaculty] = useState<Faculty | null>(null);
  const [error, setError] = useState("");

  // Use useEffect to update the updatedFaculty state when the faculty prop changes
  useEffect(() => {
    setUpdatedFaculty(faculty);
  }, [faculty]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!updatedFaculty) {
      return;
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:3001/FacultyList/${faculty?.facultyId}`,
        updatedFaculty
      );
      console.log(response);
      // Call the onUpdateFaculty callback to update the faculty in the parent component's state
      onUpdateFaculty(updatedFaculty);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Faculty</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {updatedFaculty && (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFacultyId">
              <Form.Label>Faculty ID</Form.Label>
              <Form.Control
                type="number"
                value={updatedFaculty.facultyId}
                onChange={(e) =>
                  setUpdatedFaculty({
                    ...updatedFaculty,
                    facultyId: Number(e.target.value),
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={updatedFaculty.name}
                onChange={(e) =>
                  setUpdatedFaculty({
                    ...updatedFaculty,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={updatedFaculty.email}
                onChange={(e) =>
                  setUpdatedFaculty({
                    ...updatedFaculty,
                    email: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formDesignation">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="text"
                value={updatedFaculty.designation}
                onChange={(e) =>
                  setUpdatedFaculty({
                    ...updatedFaculty,
                    designation: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                value={updatedFaculty.department}
                onChange={(e) =>
                  setUpdatedFaculty({
                    ...updatedFaculty,
                    department: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!updatedFaculty}>
              Update Faculty
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FacultyUpdate;
