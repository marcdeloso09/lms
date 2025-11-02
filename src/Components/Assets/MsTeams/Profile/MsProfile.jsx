import React, { useState, useEffect } from "react";
import "./MsProfile.css"; // optional, if you want to separate styles

export default function MsProfile() {
  const [behaviors, setBehaviors] = useState([]);

  // Load saved behaviors from localStorage
  useEffect(() => {
    const loadData = () => {
      const data = JSON.parse(localStorage.getItem("userBehaviors")) || [];
      setBehaviors(data);
    };

    loadData();

    // Refresh table in real time
    const interval = setInterval(loadData, 1000);
    return () => clearInterval(interval);
  }, []);

  // Clear all stored behavior data
  const handleClearData = () => {
    localStorage.removeItem("userBehaviors");
    setBehaviors([]);
  };

  return (
    <div className="msprofile-container">
      <h2>User Behavior Log</h2>

      {behaviors.length === 0 ? (
        <p>No recorded behaviors yet.</p>
      ) : (
        <table className="behavior-table">
          <thead>
            <tr>
              <th>Scroll Velocity (&lt;30px/s)</th>
              <th>Hover Duration (&lt;3s)</th>
              <th>Click Error Rate (&lt;15%)</th>
              <th>Date and Time Recorded</th>
            </tr>
          </thead>
          <tbody>
            {behaviors.map((b, index) => (
              <tr key={index}>
                <td>{b.key.includes("Scroll") ? b.value : "-"}</td>
                <td>{b.key.includes("Hover") ? b.value : "-"}</td>
                <td>{b.key.includes("Click") ? b.value : "-"}</td>
                <td>{b.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button className="clear-button" onClick={handleClearData}>
        🧹 Clear All Data
      </button>
    </div>
  );
}
