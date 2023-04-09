import React ,{useState}from "react";
import Button from "./Button/Button";
import Navigation from "../components/MainHeader/Navigation";
import { Link } from "react-router-dom";
import "../components/css/Navigation.css";
import "../components/css/Patient.css";

const Patient = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
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
            <Link to="/download">Report</Link>
          </li>
          {/* <li>
            <Link to="/about">Edit Profile</Link>
          </li> */}
          {/* <li>
            <Link to="/login">Logout</Link>
          </li> */}
        
      <li>
      <div>
      <button onClick={handleClick}>
      <div className="menu-icon">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </button>
      {isMenuOpen && (
        <ul className="menu-options">
          <li>
            <Link to="/editprofile">
              Edit Profile
              
            </Link>
          </li>
          <li>
          <Link to="/login">
              Logout
              
            </Link>
          </li>
        </ul>
      )}
    </div>
    </li>
    </ul>
    </nav>
    </div>

  );
};

export default Patient;
