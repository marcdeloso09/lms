import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import classBehavior from "../useClassBehavior";

export default function Home() {
  const navigate = useNavigate();
  const {
    scrollVelocity,
    hoverDuration,
    clickErrorRate,
    action,
    handleMouseEnter,
    handleMouseLeave,
    clickModeActive,
    focusMode,
    focusedChatIds,
  } = classBehavior("classes");

  const classes = [
    { id: 0, title: "IAS - CSB3 2ND SEMESTER 2025" },
    { id: 1, title: "THESIS | 2025" },
    { id: 2, title: "PROGRAMMING LANGUAGE" },
    { id: 3, title: "Math Elective" },
    { id: 4, title: "Web Development" },
    { id: 5, title: "Data Structures" },
  ];

  const tasks = [
    { title: "Submit Act. 2", date: "May 25" },
    { title: "Read Chapter 3", date: "May 26" },
  ];

  const handleView = (cls) => {
    navigate(`../class/${cls.id}`, { state: { cls } });
  };

  return (
    <>
      {clickModeActive && <div className="class-click-error-overlay" />}

      <div
        className={`home-contents ${
          focusMode ? "class-focus-active" : ""
        }`}
      >
        <div className="classes">
          {classes.map((cls) => (
            <div
              key={cls.id}
              id={`class-${cls.id}`}
              className={`class-box ${
                focusMode && !focusedChatIds.includes(cls.id)
                  ? "hidden-card"
                  : ""
              }`}
              onMouseEnter={() => handleMouseEnter(cls.id)}
              onMouseLeave={handleMouseLeave}
            >
              <h2>{cls.title}</h2>
              {focusMode && focusedChatIds.includes(cls.id) && (
                  <div className="class-focus-popup">
                    Focus Mode
                  </div>
                )}
              <button onClick={() => handleView(cls)}>View</button>
            </div>
          ))}
        </div>

        <div className="announcements">
          <div className="reminder-box">
            <h2>Upcoming Tasks</h2>
            <ul className="task-list">
              {tasks.map((task, index) => (
                <li key={index}>
                  <input type="checkbox" />
                  <span>
                    {task.title} - {task.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {focusMode && (
          <div className="home-focus-popup">
            <span>Scroll speed below 30px/s - <br />activating focused view</span>
            <img
              src="https://cdn-icons-png.flaticon.com/512/159/159604.png"
              alt="eye icon"
              className="focus-eye-icon"
            />
          </div>
        )}
        <div className="tracking-panel">
          <p>
            <strong>Scroll Speed:</strong>{" "}
            {Number(scrollVelocity).toFixed(1)} px/s
          </p>
          <p>
            <strong>Hover Duration:</strong>{" "}
            {hoverDuration > 0 ? `${hoverDuration}s` : "0s"}
          </p>
          <p>
            <strong>Click Error Rate:</strong>{" "}
            {clickErrorRate.toFixed(1)}%
          </p>
          <p>
            <strong>Action:</strong> {action}
          </p>
        </div>
      </div>
    </>
  );
}
