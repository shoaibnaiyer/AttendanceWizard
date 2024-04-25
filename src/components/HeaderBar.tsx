import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HeaderBar() {
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("username"));

  const handleLoginLogoutClick = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      handleLogin();
    }
  };

  const handleLogin = () => {
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
        navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setIsLoggedIn(false); // Update the isLoggedIn state to reflect logout
    navigate("/");
  };

  const handleTitleClick = () => {
    if (isLoggedIn) {
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
          navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("username"));
  }, [navigate]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a href="#" className="navbar-brand" onClick={handleTitleClick}>
          AttendanceWizard
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#" onClick={() => navigate("/")}>
                {userRole ? `${userRole} Dashboard` : "Dashboard"}
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            {isLoggedIn && (
              <li className="nav-item">
                <span className="navbar-text me-2">Logged in as: {localStorage.getItem("username")}</span>
              </li>
            )}
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleLoginLogoutClick}>
                {isLoggedIn ? "Logout" : "Login"}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default HeaderBar;
