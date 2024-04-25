import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HeaderBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication-related data and perform logout actions
    // For example, clearing tokens, resetting state, etc.

    // Update the isLoggedIn state to false
    setIsLoggedIn(false);

    // Redirect the user to the login page
    navigate("/");
  };

  const handleLogin = () => {
    // Perform login logic

    // Assuming login is successful, update the isLoggedIn state to true
    setIsLoggedIn(true);

    // Redirect the user to the desired page
    navigate("/StudentList");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          AttendanceWizard
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Attendance
              </a>
            </li>
            {isLoggedIn ? (
              <li className="nav-item">
                <a className="nav-link" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            ) : (
              <li className="nav-item">
                <a className="nav-link" onClick={handleLogin}>
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default HeaderBar;








import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function HeaderBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(""); // Add user role state
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication-related data and perform logout actions
    // For example, clearing tokens, resetting state, etc.

    // Update the isLoggedIn state to false
    setIsLoggedIn(false);

    // Redirect the user to the login page
    navigate("/");
  };

  const handleLogin = () => {
    // Perform login logic

    // Assuming login is successful, update the isLoggedIn state to true
    setIsLoggedIn(true);

    // Redirect the user to the desired page based on the user's role
    switch (userRole) {
      case "admin":
        navigate("/DashboardAdmin");
        break;
      case "faculty":
        navigate("/DashboardFaculty");
        break;
      case "student":
        navigate("/DashboardStudent");
        break;
      default:
        navigate("/"); // Redirect to the default page if user role is not set
    }
  };

  const handleTitleClick = () => {
    // Redirect to the dashboard panel based on the user's role
    switch (userRole) {
      case "admin":
        navigate("/DashboardAdmin");
        break;
      case "faculty":
        navigate("/DashboardFaculty");
        break;
      case "student":
        navigate("/DashboardStudent");
        break;
      default:
        // Redirect to the default page if user role is not set or unknown
        navigate("/");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" onClick={handleTitleClick}>
          AttendanceWizard
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Attendance
              </a>
            </li>
            {isLoggedIn ? (
              <li className="nav-item">
                <a className="nav-link" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            ) : (
              <li className="nav-item">
                <a className="nav-link" onClick={handleLogin}>
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default HeaderBar;

