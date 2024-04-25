import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

interface Student {
  _id: string;
  name: string;
  roll: number;
  attendance: number;
}

function AttendanceSummary() {
  const [studentsAttendance, setStudentsAttendance] = useState<Student[]>([]);

  useEffect(() => {
    fetchStudentsAttendance();
  }, []);

  const fetchStudentsAttendance = async () => {
    try {
      const response = await axios.get<Student[]>('http://127.0.0.1:3001/StudentList');
      setStudentsAttendance(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="col-md-8 col-md-offset-6  table-responsive">
      <h2>Attendance Summary</h2>
      <table className="table table-striped table-bordered border-primary table-sm align-middle ">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Roll</th>
            <th>Name</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {studentsAttendance.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{student.roll}</td>
              <td>{student.name}</td>
              <td>{student.attendance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}

export default AttendanceSummary;
