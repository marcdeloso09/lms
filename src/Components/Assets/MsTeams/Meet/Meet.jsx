import React from "react";
import "./Meet.css";

export default function Meet() {
  return (
    <div className="meet-page">
      <h1 className="meet-header">Meet</h1>

      <div className="meet-actions">
        <button className="action-btn primary">Create a meeting link</button>
        <button className="action-btn">Schedule a meeting</button>
        <button className="action-btn">Join with a meeting ID</button>
      </div>

      <div className="meet-section">
        <h2 className="section-title">Meeting links</h2>
        <div className="meeting-card">
          <div className="meeting-icon">🔗</div>
          <div className="meeting-info">
            <p className="meeting-desc">
              Quickly create, save, and share links with anyone.
            </p>
            <button className="learn-link">
              Learn more about meeting links
            </button>
          </div>
        </div>
      </div>

      <div className="meet-section">
        <h2 className="section-title">Scheduled meetings</h2>
        <div className="scheduled-container">
          <div className="no-meetings">
            <p>You don’t have anything scheduled.</p>
          </div>
          <div className="illustration">
            <img
              src="https://static.vecteezy.com/system/resources/previews/012/795/945/original/online-meeting-concept-illustration-free-png.png"
              alt="Meet illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

