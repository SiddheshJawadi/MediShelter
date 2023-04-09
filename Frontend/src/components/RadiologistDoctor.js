import React,{useState} from 'react'
import { Link } from "react-router-dom";
import "../components/css/Navigation.css";
import "../components/css/Patient.css";

function RadiologistDoctor() {
  
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const handleClick = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  return (
    <div>
       
    <div class="welcome">
<h1>Welcome  Doctor!</h1>
<p>Thanks for visiting. Feel free to look around.</p>
</div>


    <nav>
        <ul>
          <li>
            <Link to="/doctor">Home</Link>
          </li>
          <li>
            <Link to="/prescription">Prescription</Link>
          </li>
          <li>
            <Link to="/reportdoctor">Report</Link>
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
            <Link to="/edit-profile">
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

export default RadiologistDoctor;