import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <Container className="mt-4">
      <h2>Student Dashboard</h2>
      <Row>
        <Col>
          <Link to="/StudentList">
            <Card className="dashboard-card">
              <Card.Body>
                <Card.Title>View Student List</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/ClassList">
            <Card className="dashboard-card">
              <Card.Body>
                <Card.Title>View Class</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to="/FacultyList">
            <Card className="dashboard-card">
              <Card.Body>
                <Card.Title>View Faculty</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/AttendanceSummary">
            <Card className="dashboard-card">
              <Card.Body>
                <Card.Title>View Attendance</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDashboard;
