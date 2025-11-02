import React, { useEffect, useState } from "react";
import "./Help.css"; // optional if you want to style it separately

export default function Help() {
  const [behaviors, setBehaviors] = useState([]);

  // Load saved data from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("userBehaviors")) || [];
    setBehaviors(stored);
  }, []);

  // Clear the behavior data
  const clearBehaviors = () => {
    localStorage.removeItem("userBehaviors");
    setBehaviors([]);
  };

  return (
    <div className="help-container">
      <h1>User Behavior Logs</h1>

      {behaviors.length === 0 ? (
        <p className="no-data">No behavior data recorded yet.</p>
      ) : (
        <div className="table-wrapper">
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
        </div>
      )}

      <button className="clear-button" onClick={clearBehaviors}>
        Clear Saved Data
      </button>
    </div>
  );
}
