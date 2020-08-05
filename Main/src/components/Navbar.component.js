
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

render() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">NueroSoft Survey Platform</Link>
      <div className="collpase navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
        <Link to="/" className="nav-link">Received Survey</Link>
        </li>
        <li className="navbar-item">
        <Link to="/newSurvey" className="nav-link">New Survey</Link>
        </li>
        <li className="navbar-item">
        <Link to="/user" className="nav-link">Create User</Link>
        </li>
      </ul>
      </div>
    </nav>
  );
}
}
