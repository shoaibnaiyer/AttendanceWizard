import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AttendanceTracker from "./components/AttendanceTracker";
import AttendanceSummary from "./components/AttendanceSummary";
import DashboardAdmin from "./components/DashboardAdmin";
import DashboardFaculty from "./components/DashboardFaculty";
import DashboardStudent from "./components/DashboardStudent";
import HeaderBar from "./components/HeaderBar";
import SideBar from "./components/SideBar";
import StudentList from "./components/StudentList";
import FacultyList from "./components/FacultyList"
import ClassList from "./components/ClassList"
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";


function App() {
  return (
    <Router>
      <HeaderBar />
      <SideBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/StudentList/" element={<StudentList />} />
        <Route path="/ClassList/" element={<ClassList />} />
        <Route path="/FacultyList/" element={<FacultyList />} />
        <Route path="DashboardAdmin" element={<DashboardAdmin />} />
        <Route path="DashboardFaculty" element={<DashboardFaculty />} />
        <Route path="DashboardStudent" element={<DashboardStudent />} />
        <Route path="AttendanceTracker" element={<AttendanceTracker />} />
        <Route path="AttendanceSummary" element={<AttendanceSummary />} />
        {/* <Route path="StudentAdd" element={<StudentAdd onAddStudent={undefined} />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
