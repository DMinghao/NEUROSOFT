import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import './homepage.css';
import './About.component.js';

export default function Navbar() {

  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">NeuroSoft Platform</Link>
      <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
           
          </li>
          <li className="navbar-item">
            <Link to="/about" className="nav-link">About Us</Link>
          </li>
          {/* <li className="navbar-item">
            <Link to="/" className="nav-link">Received Survey</Link>
          </li>
          <li className="navbar-item">
            <Link to="/newSurvey" className="nav-link">New Survey</Link>
          </li> */}
        </ul>
        <div>
          {userData.user ? (
            <>
              {userData.user.userType === "doctor" ? (
                <Link to={"/docdash"} style={{ color: "#ffffff", margin: "0.3rem" }}>
                  <button className="btn btn-outline-info">Dashboard</button>
                </Link>
              ) : (
                  <Link to={"/padash/"} style={{ color: "#ffffff", margin: "0.3rem" }}>
                    <button className="btn btn-outline-info">Dashboard</button>
                  </Link>
                )}
              <button className="btn btn-outline-danger" onClick={logout}>Log out</button>
            </>
          ) : (
              <>
                <Link to="/register" style={{ color: "#ffffff", margin: "0.3rem" }}>
                  <button className="btn btn-outline-secondary">Register</button>
                </Link>
                <Link to="/login" style={{ color: "#ffffff", margin: "0.3rem" }}>
                  <button className="btn btn-outline-primary">Login</button>
                </Link>
              </>
            )}
        </div>
      </div>
    </nav>
  );
}

  