import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditProfile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');


  useEffect(() => {
    axios.get('/api/profile')
      .then(response => {
        setUsername(response.data.username);
        setEmail(response.data.email);
        
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you would make a request to your backend server to update the user's profile with the new data
    axios.put('/api/profile', {
        username: username,
        email: email,
       
      })
      .then(response => {
        // Handle the response from the server if needed
      })
      .catch(error => {
        // Handle any errors if needed
      });
  };

  return (
    <div className="logIn-form">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditProfile;
