import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';

interface Student {
  _id: string;
  name: string;
  roll: number;
  attendance: number; // We add the attendance property to the Student interface
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
      const studentList = response.data.map((student) => {
        // Initialize the attendanceStatus state with 'A' (Absent) for each student initially
        setAttendanceStatus((prevAttendanceStatus) => [...prevAttendanceStatus, 'A']);
        return { ...student, attendance: 0 }; // Add the attendance property to each student with value 0
      });
      setStudents(studentList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAttendanceClick = (index: number) => {
    const updatedAttendanceStatus = [...attendanceStatus];
    updatedAttendanceStatus[index] = updatedAttendanceStatus[index] === 'A' ? 'P' : 'A';
    setAttendanceStatus(updatedAttendanceStatus);

    // No need to update the attendance value in the state here; we'll update it in the database when clicking 'Save Attendance'.
  };

  const handleSaveAttendance = async () => {
    try {
      // Loop through students and send separate PUT requests to update attendance
      for (let i = 0; i < students.length; i++) {
        const student = students[i];
        const updatedAttendance = student.attendance + (attendanceStatus[i] === 'A' ? 1 : 0);
  
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
  
      // Optional: You may want to show a success message here.
      console.log('Attendance saved successfully!');
    } catch (error) {
      console.log(error);
      // Optional: You may want to show an error message here.
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
      <button className="btn btn-primary" onClick={handleSaveAttendance}>
        Save Attendance
      </button>
    </Container>
  );
}

export default AttendanceTracker;
