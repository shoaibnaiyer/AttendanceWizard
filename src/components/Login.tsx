import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  function handleLogin(e: { preventDefault: () => void; }) {
    e.preventDefault();

    let loginSuccessful = false;

    // Perform login based on the selected role
    switch (role) {
      case 'admin':
        // Perform admin login logic
        if (username === 'admin' && password === 'admin123') {
          // Admin login successful
          console.log('Admin logged in');
          loginSuccessful = true;
          // Redirect to admin dashboard or perform other actions
          navigate('/DashboardAdmin');
        } else {
          // Admin login failed
          setErrorMessage('Invalid username or password');
          console.log('Admin login failed');
          // Display error message or perform other actions
        }
        break;
      case 'faculty':
        // Perform faculty login logic
        if (username === 'faculty' && password === 'faculty123') {
          // Faculty login successful
          console.log('Faculty logged in');
          loginSuccessful = true;
          // Redirect to faculty dashboard or perform other actions
          navigate('/DashboardFaculty');
        } else {
          // Faculty login failed
          setErrorMessage('Invalid username or password');
          console.log('Faculty login failed');
          // Display error message or perform other actions
        }
        break;
      case 'student':
        // Perform student login logic
        if (username === 'student' && password === 'student123') {
          // Student login successful
          console.log('Student logged in');
          loginSuccessful = true;
          // Redirect to student dashboard or perform other actions
          navigate('/DashboardStudent');
        } else {
          // Student login failed
          setErrorMessage('Invalid username or password');
          console.log('Student login failed');
          // Display error message or perform other actions
        }
        break;
      default:
        // Invalid role
        break;
    }

    if (!loginSuccessful) {
      // Invalid credentials, display warning or perform other actions
      console.log('Invalid credentials');
    }
  }

  return (
    <Container className="col-md-4 col-md-offset-4">
      <h2>Login</h2>
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
          {errorMessage}
        </Alert>
      )}
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="role">
          <Form.Label>Login As:</Form.Label>
          <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="faculty">Faculty</option>
            <option value="student">Student</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
