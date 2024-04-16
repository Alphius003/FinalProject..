import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './profile.css';
import NavigationBar from './Nav';
const ProfileOverlay = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { userID } = useParams();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:4000/user/${userID}`);
        if (response.ok) {
          const userData = await response.json();
          setUserInfo(userData);
        } else {
          console.error('Failed to fetch user information');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, [userID]);

  return (
    <div>
      <NavigationBar/>
    
            <div className="profile">
      {userInfo && (
        <div className="profile-info">
          <form>
          <h2>Profile</h2>
          <p><strong>User ID:</strong> {userInfo.userID}</p>
          <p><strong>Name:</strong> {userInfo.firstName} {userInfo.lastName}</p>
          <p><strong>Date of Birth:</strong> {userInfo.dob}</p>
          <p><strong>Email:</strong> {userInfo.mailID}</p>
          <p><strong>Gender:</strong> {userInfo.gender}</p>
          <p><strong>Skills:</strong> {userInfo.skills}</p>
          <p><strong>Experience:</strong> {userInfo.experience}</p>
          <p><strong>Designation:</strong> {userInfo.designation}</p>
          <p><strong>Role:</strong> {userInfo.role}</p>
          </form>
         </div>
      )}
    </div>  
    </div>
  );
};

export default ProfileOverlay;
