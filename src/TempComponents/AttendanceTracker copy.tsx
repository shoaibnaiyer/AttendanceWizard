import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

interface Student {
  _id: string;
  name: string;
  roll: number;
}

function AttendanceTracker() {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceStatus, setAttendanceStatus] = useState<string[]>([]);

  useEffect(() => {
    fetchStudentList();
  }, []);

  const fetchStudentList = async () => {
    try {
      const response = await axios.get<Student[]>('http://127.0.0.1:3001/StudentList');
      const studentList = response.data;
      // Initialize the attendanceStatus state with 'A' (Absent) for each student initially, with value 0
      const initialAttendanceStatus = Array(studentList.length).fill('A');
      setStudents(studentList);
      setAttendanceStatus(initialAttendanceStatus);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAttendanceClick = async (index: number) => {
    const studentRollNumber = students[index].roll;
    const updatedAttendanceStatus = [...attendanceStatus];
    updatedAttendanceStatus[index] = updatedAttendanceStatus[index] === 'A' ? 'P' : 'A';
    setAttendanceStatus(updatedAttendanceStatus);

    try {
      const response = await axios.put(`http://127.0.0.1:3001/StudentList/${studentRollNumber}`, {
        attendance: updatedAttendanceStatus[index] === 'A' ? 0 : 1, // Toggle between 0 and 1
      });
      console.log(response); // You can handle the response as needed.
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="col-md-8 col-md-offset-6  table-responsive">
      <h2>Attendance Table</h2>
      <table className="table table-striped table-bordered  border-primary table-sm align-middle">
        <thead>
          <tr>
            <th>Roll</th>
            <th className="w-50">Name</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.roll}</td>
              <td>{student.name}</td>
              <td>
                <button
                  className={`btn ${
                    attendanceStatus[index] === 'A' ? 'btn-danger' : 'btn-success'
                  }`}
                  onClick={() => handleAttendanceClick(index)}
                >
                  {attendanceStatus[index] === 'A' ? 'A' : 'P'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary">Save Attendance</button>
    </Container>
  );
}

export default AttendanceTracker;









//best working code

import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

interface Student {
  _id: string;
  name: string;
  roll: number;
  attendance: number;
}

function AttendanceTracker() {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceStatus, setAttendanceStatus] = useState<string[]>([]);

  useEffect(() => {
    fetchStudentList();
  }, []);

  const fetchStudentList = async () => {
    try {
      const response = await axios.get<Student[]>('http://127.0.0.1:3001/StudentList');
      const studentList = response.data.map((student) => ({
        ...student,
      }));

      // Initialize the attendanceStatus state only on the first fetch when it's empty
      if (attendanceStatus.length === 0) {
        setAttendanceStatus(studentList.map((student) => 'A'));
      }

      setStudents(studentList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAttendanceClick = (index: number) => {
    const updatedAttendanceStatus = [...attendanceStatus];
    updatedAttendanceStatus[index] = updatedAttendanceStatus[index] === 'A' ? 'P' : 'A';
    setAttendanceStatus(updatedAttendanceStatus);
  };

  const handleSaveAttendance = async () => {
    try {
      // Loop through students and send separate PUT requests to update attendance
      for (let i = 0; i < students.length; i++) {
        if (attendanceStatus[i] === 'P') {
          const student = students[i];
          const updatedAttendance = student.attendance + 1;

          // Send the attendance update to the backend using PUT request
          await axios.put(`http://127.0.0.1:3001/StudentList/${student.roll}`, {
            attendance: updatedAttendance,
          });

          // Update the attendance value in the local state as well
          setStudents((prevStudents) => [
            ...prevStudents.slice(0, i),
            { ...student, attendance: updatedAttendance },
            ...prevStudents.slice(i + 1),
          ]);
        }
      }

      // Optional: You may want to show a success message here.
      console.log('Attendance saved successfully!');
    } catch (error) {
      console.log(error);
      // Optional: You may want to show an error message here.
    }
  };

  const handleCancelAttendance = () => {
    // Reset the attendanceStatus state to 'A' for all students
    setAttendanceStatus(attendanceStatus.map(() => 'A'));
  };

  return (
    <Container className="col-md-8 col-md-offset-6  table-responsive">
      <h2>Attendance Table</h2>
      <table className="table table-striped table-bordered  border-primary table-sm align-middle">
        <thead>
          <tr>
            <th>Roll</th>
            <th className="w-50">Name</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.roll}</td>
              <td>{student.name}</td>
              <td>
                <button
                  className={`btn ${
                    attendanceStatus[index] === 'A' ? 'btn-danger' : 'btn-success'
                  }`}
                  onClick={() => handleAttendanceClick(index)}
                >
                  {attendanceStatus[index] === 'A' ? 'A' : 'P'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={handleSaveAttendance}>
        Save Attendance
      </button>
      <button className="btn btn-secondary" onClick={handleCancelAttendance}>
        Cancel
      </button>
    </Container>
  );
}

export default AttendanceTracker;
