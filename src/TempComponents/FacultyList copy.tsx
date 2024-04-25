import React, { useState } from 'react';
import { Container, Button, Form, Alert } from 'react-bootstrap';

const FacultyList = () => {
  const headings = ['Name', 'Mobile Number', 'Email'];
  const [names, setNames] = useState(['Shabib Ahmed', 'Pankaj Kulkarni', 'Tabassum Shaikh', 'Priyanka Kumari']);
  const [mobno, setMobNo] = useState(['9876543210', '9876543211', '9876543212', '9876543213']);
  const [emails, setEmails] = useState([
    'shabibahmed@gmail.com',
    'pankajkulkarni@gmail.com',
    'tabassumshaikh@gmail.com',
    'priyankakumari@gmail.com',
  ]);

  const [newName, setNewName] = useState('');
  const [newMobNo, setNewMobNo] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');

  const addRecord = () => {
    const newNames = [...names];
    const newMobNos = [...mobno];
    const newEmails = [...emails];

    // Check if the new email already exists
    if (newEmails.includes(newEmail)) {
      setError('Email already exists.');
      return;
    }

    newNames.push(newName);
    newMobNos.push(newMobNo);
    newEmails.push(newEmail);

    setNames(newNames);
    setMobNo(newMobNos);
    setEmails(newEmails);

    // Reset the input fields and error message
    setNewName('');
    setNewMobNo('');
    setNewEmail('');
    setError('');
  };

  return (
    <Container className="col-md-8 col-md-offset-6 table-responsive">
      <h2>Faculty List</h2>
      <table className="table table-striped table-bordered border-primary table-sm align-middle">
        <thead>
          <tr>
            {headings.map((heading) => (
              <th key={heading}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {names.map((name, index) => (
            <tr key={index}>
              <td>{name}</td>
              <td>{mobno[index]}</td>
              <td>{emails[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form>
        <h3>Add Record</h3>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formMobNo">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control type="text" value={newMobNo} onChange={(e) => setNewMobNo(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={addRecord}>
          Add Record
        </Button>
      </Form>
    </Container>
  );
};

export default FacultyList;
