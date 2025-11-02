import React from 'react';
import './Profile.css';
import userpic from '../../Sections/user.png';

export default function Profile() {
  return (
    <div className="profile-page">
      <h2 className="profile-title">Profile</h2>

      <div className="profile-section">
        <div className="profile-row">
          <img src={userpic} alt="Profile" className="profile-picture" />
          <div className="profile-info">
            <p className="label">Profile picture</p>
            <button className="link-button">Change</button>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <p className="label">Account settings</p>
        <p className="description">
          Change your password and security options, and access other services.
          <button className="link-button">Manage</button>
        </p>
      </div>

      <div className="profile-section">
        <p className="label">Change name</p>
        <p className="description">
          To change your name, ask your admin.
          <button className="link-button">Learn more</button>
        </p>
      </div>
    </div>
  );
}
