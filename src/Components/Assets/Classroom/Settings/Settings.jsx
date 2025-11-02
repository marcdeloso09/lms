import React, { useState, useEffect } from "react";
import "./Settings.css";

export default function Settings() {
  const [behaviors, setBehaviors] = useState([]);

  // Load behavior data from localStorage
  useEffect(() => {
    const loadData = () => {
      const data = JSON.parse(localStorage.getItem("userBehaviors")) || [];
      setBehaviors(data);
    };

    loadData();

    // Auto-refresh every second for real-time updates
    const interval = setInterval(loadData, 1000);
    return () => clearInterval(interval);
  }, []);

  // Clear all saved behavior data
  const handleClearData = () => {
    localStorage.removeItem("userBehaviors");
    setBehaviors([]);
  };

  return (
    <div className="settings-container">
      <h2>User Behavior Monitor</h2>

      {/* Saved Behavior Table */}
      <div className="behavior-log">
        <h3>🕒 Saved Behavior Data</h3>
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
      </div>

      {/* Clear Data Button */}
      <button className="clear-button" onClick={handleClearData}>
        🧹 Clear All Data
      </button>
    </div>
  );
}
