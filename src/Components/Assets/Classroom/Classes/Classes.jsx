import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Classes.css";
import "./Stream.css";
import useClassBehavior from "./useClassesBehavior";

const classesData = [
  {
    title: "IAS - CSB3 2ND SEMESTER 2025",
    teacher: "Prof. Ivan Castillo",
    bannerColor: "#1a73e8",
    announcements: [
      "New assignment posted: FINAL EXAMINATION",
      "New material posted: Remaining Topic",
    ],
    classwork: [
      { name: "Assignment 1", due: "Jan 25, 2025" },
      { name: "Midterm Exam", due: "Feb 10, 2025" },
    ],
    people: ["John Doe", "Jane Smith", "Chris Evans"],
  },
  {
    title: "THESIS | 2025",
    teacher: "Prof. Menchie Lopez",
    bannerColor: "#19d23bff",
    announcements: [
      "New assignment posted: Chapter 1 Draft",
      "New assignment posted: Chapter 2 Draft",
      "New assignment posted: Chapter 3 and 4 Draft",
      "New assignment posted: Manuscript Checker"
    ],
    classwork: [{ name: "Chapter 1 Draft", due: "March 1, 2025" }],
    people: ["Alice", "Bob", "Charlie"],
  },
  {
    title: "PROGRAMMING LANGUAGE",
    teacher: "Prof. Jennifer Rabang",
    bannerColor: "#19cfd2ff",
    announcements: [
      "New assignment posted: Names and Bindings",
      "New module posted: Syntax and Semantics"
    ],
    classwork: [
      { name: "Names and Bindings", due: "March 1, 2025" },
      { name: "Syntax", due: "March 1, 2025" },
    ],
    people: ["Alice", "Bob", "Charlie"],
  },
];

export default function Classes() {
  const {
  focusMode,
  focusedChatIds,
  clickModeActive,
  action,
  scrollVelocity,
  hoverDuration,
  clickErrorRate,
  handleMouseEnter,
  handleMouseLeave,
} = useClassBehavior("announcement-list");

  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("stream");
  const classInfo = classesData[id];

  if (!classInfo) return <h2>Class not found</h2>;

  return (
    <div className="class-page">
      <div className={`tabs ${activeTab !== "stream" ? "compact-tabs" : ""}`}>
        <button
          className={activeTab === "stream" ? "active" : ""}
          onClick={() => setActiveTab("stream")}
        >
          Stream
        </button>
        <button
          className={activeTab === "classwork" ? "active" : ""}
          onClick={() => setActiveTab("classwork")}
        >
          Classwork
        </button>
        <button
          className={activeTab === "people" ? "active" : ""}
          onClick={() => setActiveTab("people")}
        >
          People
        </button>
      </div>

      {activeTab === "stream" && (
        <div
          className="class-banner"
          style={{ background: classInfo.bannerColor }}
        >
          <div className="banner-content">
            <h1>{classInfo.title}</h1>
            <p>Instructor: {classInfo.teacher}</p>
          </div>
        </div>
      )}

     
      <div className="tab-content">
        {activeTab === "stream" && (
          <div className="stream-section">
            <div className="announce-box">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                alt="user"
                className="announce-avatar"
              />
              <input
                type="text"
                placeholder="Announce something to your class"
                className="announce-input"
              />
            </div>

            <h3>Recent Announcements</h3>
            <div className={`announcement-container ${focusMode ? "focus-active" : ""}`}>
            {clickModeActive && <div className="recent-click-error-overlay" />}

            <div className="announcement-list">
              {classInfo.announcements.map((text, index) => (
                <div
                  key={index}
                  className={`announcement-card ${
                    focusMode && !focusedChatIds.includes(index) ? "recent-hidden-card" : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="announcement-icon">
                    <img
                      src={
                        text.toLowerCase().includes("assignment")
                          ? "https://cdn-icons-png.flaticon.com/512/3039/3039387.png"
                          : "https://cdn-icons-png.flaticon.com/512/3039/3039445.png"
                      }
                      alt="icon"
                    />
                  </div>

                  <div className="announcement-details">
                    <p className="announcement-text">
                      {focusMode && focusedChatIds.includes(index) && (
                          <div className="recent-class-attempt-popup">
                            ⓘ Student attempted to comment - <br/>
                            Focus Mode triggered
                          </div>
                        )}
                      <strong>Instructor</strong> posted a new{" "}

                        {focusMode && focusedChatIds.includes(index) && (
                          <div className="recent-class-focus-popup">
                            Focus Mode
                          </div>
                        )}
                      {text.toLowerCase().includes("assignment")
                        ? "assignment"
                        : "material"}
                      :{" "}
                      {text.replace(/New (assignment|material) posted:\s*/i, "")}
                    </p>
                    <p className="announcement-date">
                      {text.toLowerCase().includes("assignment")
                        ? "May 27, 2024"
                        : "May 22, 2024"}
                    </p>
                    <div className="announcement-resources">
                      {classInfo.classwork
                        .filter(work =>
                          text.toLowerCase().includes("assignment")
                            ? work.name.toLowerCase().includes("assignment") ||
                              text.toLowerCase().includes(work.name.toLowerCase())
                            : true
                        )
                        .map((work, i) => (
                          <div key={i} className="resource-item">
                            <img
                              src={
                                text.toLowerCase().includes("assignment")
                                  ? "https://cdn-icons-png.flaticon.com/512/3039/3039387.png"
                                  : "https://cdn-icons-png.flaticon.com/512/3039/3039445.png"
                              }
                              alt="resource icon"
                              className="resource-icon"
                            />
                            <div className="resource-info">
                              <p className="resource-name">{work.name}</p>
      
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="class-post-comment">
                      <input type="text" placeholder="Add class comment..." />
                      <button className="send-btn">➤</button>
                    </div>
                  </div>

                  <div className="announcement-menu">⋮</div>
                </div>
              ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "classwork" && (
          <div className="classwork-section">
            <h3>Assignments</h3>
            {classInfo.classwork.map((work, index) => (
              <div key={index} className="classwork-card">
                <p>📝 {work.name}</p>
                <span>Due: {work.due}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "people" && (
          <div className="people-section">
            <h3>Teacher</h3>
            <div className="teacher-card">{classInfo.teacher}</div>
            <h3>Classmates</h3>
            <ul>
              {classInfo.people.map((person, index) => (
                <li key={index}>{person}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="tracking-panel">
          <p>
            <strong>Scroll Speed:</strong>{" "}
            {Number(scrollVelocity).toFixed(1)} px/s
          </p>
          <p>
            <strong>User hovered for </strong>{" "}
            {hoverDuration > 0 ? `${hoverDuration}s` : "0s"} <strong>seconds <br /></strong>
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
  );
}
