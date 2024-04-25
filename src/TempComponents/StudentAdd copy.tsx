// import React, { useState } from "react";
// import { Container, Button, Form, Alert } from "react-bootstrap";
// import axios from 'axios';

// function StudentAdd () {
//   const [newRoll, setNewRoll] = useState("");
//   const [newStudent, setNewStudent] = useState("");
//   const [newEmail, setNewEmail] = useState("");
//   const [newAddress, setNewAddress] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: { preventDefault: () => void; }) => {
//     e.preventDefault();

//     // Check for empty fields
//     if (!newRoll || !newStudent || !newEmail || !newAddress) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     const newStudentData = {
//       roll: Number(newRoll),
//       name: newStudent,
//       email: newEmail,
//       address: newAddress
//     };

//     try {
//       const response = await axios.post("http://localhost:3001/StudentList", newStudentData);
//       console.log(response);
//       // Call the parent component's onAddStudent function
//       onAddStudent(newStudentData);
//       // Reset the input fields and error message
//       setNewRoll("");
//       setNewStudent("");
//       setNewEmail("");
//       setNewAddress("");
//       setError("");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Container className="col-md-8 col-md-offset-6  table-responsive">
//       <Form onSubmit={handleSubmit}>
//         <h3>Add records</h3>
//         <Form.Group controlId="formRoll">
//           <Form.Label>Roll</Form.Label>
//           <Form.Control
//             type="number"
//             value={newRoll}
//             onChange={(e) => setNewRoll(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId="formName">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="text"
//             value={newStudent}
//             onChange={(e) => setNewStudent(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId="formEmail">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             value={newEmail}
//             onChange={(e) => setNewEmail(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId="formAddress">
//           <Form.Label>Address</Form.Label>
//           <Form.Control
//             type="text"
//             value={newAddress}
//             onChange={(e) => setNewAddress(e.target.value)}
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Add Record
//         </Button>
//       </Form>

//       {error && <Alert variant="danger">{error}</Alert>}

//     </Container>
//   );
// }

// export default StudentAdd;




import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface StudentData {
  roll: number;
  name: string;
  email: string;
  address: string;
}

interface StudentAddProps {
  show: boolean;
  onClose: () => void;
  onAddStudent: (newStudent: StudentData) => void;
}

function StudentAdd({ show, onClose, onAddStudent }: StudentAddProps) {
  const [newRoll, setNewRoll] = useState("");
  const [newStudent, setNewStudent] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAddress, setNewAddress] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newStudentData: StudentData = {
      roll: Number(newRoll),
      name: newStudent,
      email: newEmail,
      address: newAddress
    };
    onAddStudent(newStudentData);
    onClose();
  };

  return (
     <Modal show={show} onHide={onClose}>
       <Modal.Header closeButton>
         <Modal.Title>Add Student</Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <Form onSubmit={handleSubmit}>
           <Form.Group controlId="formRoll">
             <Form.Label>Roll</Form.Label>
             <Form.Control
              type="number"
              value={newRoll}
              onChange={(e) => setNewRoll(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={newStudent}
              onChange={(e) => setNewStudent(e.target.value)}
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
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Student
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default StudentAdd;
