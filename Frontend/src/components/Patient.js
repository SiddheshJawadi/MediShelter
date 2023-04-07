import React from "react";
import Button from "./Button/Button";
import Navigation from "../components/MainHeader/Navigation";
import { Link } from "react-router-dom";
import "../components/css/Navigation.css";
import "../components/css/Patient.css";

const Patient = () => {
  return (
    <div>
      <div class="welcome">
  <h1>Welcome  Patient!</h1>
  <p>Thanks for visiting. Feel free to look around.</p>
</div>
      <nav>
        <ul>
          <li>
            <Link to="/patient">Home</Link>
          </li>
          <li>
            <Link to="/prescription">Prescription</Link>
          </li>
          <li>
            <Link to="/report">Report</Link>
          </li>
          <li>
            <Link to="/about">Edit Profile</Link>
          </li>
          <li>
            <Link to="/login">Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Patient;
