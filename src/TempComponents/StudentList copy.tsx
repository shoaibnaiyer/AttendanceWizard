// import React, { useState } from "react";
// import { Container, Button, Form, Alert } from "react-bootstrap";

// function AttendanceTracker() {
//   let headings = ["Roll", "Name", "Email", "Address"];
//   const [rolls, setRolls] = useState([101, 102, 103, 104]);
//   const [students, setStudents] = useState(["Ravi", "Aman", "Manish", "Amit"]);
//   const [emails, setEmails] = useState([
//     "ravi@gmail.com",
//     "aman@gmail.com",
//     "manish@gmail.com",
//     "amit@gmail.com",
//   ]);
//   const [addresses, setAddresses] = useState([
//     "Chapra",
//     "Darbhanga",
//     "Buxar",
//     "Patna",
//   ]);

//   const [newRoll, setNewRoll] = useState("");
//   const [newStudent, setNewStudent] = useState("");
//   const [newEmail, setNewEmail] = useState("");
//   const [newAddress, setNewAddress] = useState("");
//   const [error, setError] = useState("");

//   const addRecord = () => {
//     const newRolls = [...rolls];
//     const newStudents = [...students];
//     const newEmails = [...emails];
//     const newAddresses = [...addresses];

//     // Check if the new roll number already exists
//     if (newRolls.includes(parseInt(newRoll))) {
//       setError("Roll number already exists.");
//       return;
//     }

//     // Check if the new email already exists
//     if (newEmails.includes(newEmail)) {
//       setError("Email already exists.");
//       return;
//     }

//     newRolls.push(parseInt(newRoll));
//     newStudents.push(newStudent);
//     newEmails.push(newEmail);
//     newAddresses.push(newAddress);

//     setRolls(newRolls);
//     setStudents(newStudents);
//     setEmails(newEmails);
//     setAddresses(newAddresses);

//     // Reset the input fields and error message
//     setNewRoll("");
//     setNewStudent("");
//     setNewEmail("");
//     setNewAddress("");
//     setError("");
//   };

//   return (
//     <Container className="col-md-8 col-md-offset-6  table-responsive">
//       <h2>Student List</h2>
//       <table className="table table-striped table-bordered  border-primary table-sm align-middle">
//         <thead>
//           <tr>
//             {headings.map((heading) => (
//               <th key={heading}>{heading}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {rolls.map((roll, index) => (
//             <tr key={roll}>
//               <td>{roll}</td>
//               <td>{students[index]}</td>
//               <td>{emails[index]}</td>
//               <td>{addresses[index]}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {error && <Alert variant="danger">{error}</Alert>}

//       <Form>
//       <h3>Add records</h3>
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
//         <Button variant="primary" onClick={addRecord}>
//           Add Record
//         </Button>
//       </Form>
//     </Container>
//   );
// }

// export default AttendanceTracker;














import React, { useState, useEffect } from "react";
import { Container, Button, Form, Alert } from "react-bootstrap";
import axios from 'axios';

function AttendanceTracker() {
  const [students, setStudents] = useState<{ roll: number; name: string; email: string; address: string; }[]>([]);
  const [newRoll, setNewRoll] = useState("");
  const [newStudent, setNewStudent] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/StudentList");
      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check for empty fields
    if (!newRoll || !newStudent || !newEmail || !newAddress) {
      setError("Please fill in all fields.");
      return;
    }

    // Check for duplicate roll number or email
    const duplicateRoll = students.find(student => student.roll === Number(newRoll));
    const duplicateEmail = students.find(student => student.email === newEmail);
    if (duplicateRoll || duplicateEmail) {
      setError("Roll number or email already exists.");
      return;
    }

    const newStudentData = {
      roll: Number(newRoll),
      name: newStudent,
      email: newEmail,
      address: newAddress
    };

    try {
      const response = await axios.post("http://localhost:3001/StudentList", newStudentData);
      console.log(response);
      // Add the new student to the state
      setStudents([...students, newStudentData]);
      // Reset the input fields and error message
      setNewRoll("");
      setNewStudent("");
      setNewEmail("");
      setNewAddress("");
      setError("");
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
            <th>Roll</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.roll}>
              <td>{student.roll}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.address}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <h3>Add records</h3>
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
          Add Record
        </Button>
      </Form>
    </Container>
  );
}

export default AttendanceTracker;
