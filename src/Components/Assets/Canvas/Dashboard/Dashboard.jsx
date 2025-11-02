// Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import useCanvaBehavior from "../useCanvaBehavior";

const courses = [
  { 
    id: 1, 
    title: "Intro to Computing", 
    subtitle: "2SY2324 1_CS3B2",
    assignments: [
      "New Assignment: Intro Activity 1.docx",
      "New Assignment: Intro Activity 2.docx",
    ],
    lessons: [
      "Chapter 1 - Basics.pdf",
      "Chapter 2 - Binary and Logic.pdf",
    ],
  },
  { 
    id: 2, 
    title: "Data Structures", 
    subtitle: "2SY2324 1_CS3B2",
    assignments: [
      "New Assignment: Stack Implementation.docx",
      "New Assignment: Queue Lab.docx",
    ],
    lessons: [
      "Chapter 1 - Arrays.pdf",
      "Chapter 2 - Linked Lists.pdf",
      "Chapter 3 - Trees.pdf",
    ],
  },
  { 
    id: 3, 
    title: "Programming 1", 
    subtitle: "2SY2324 1_CS3B2",
    assignments: [
      "New Assignment: Basic Syntax.docx",
      "New Assignment: Functions.docx",
    ],
    lessons: [
      "Chapter 1 - Introduction.pdf",
      "Chapter 2 - Variables.pdf",
    ],
  },
  { 
    id: 4, 
    title: "CS 8/L 2024 B2", 
    subtitle: "CS 8/L 2024 B2",
    assignments: [
      "New Assignment: Truth Table.docx",
      "New Assignment: Quiz 1.docx",
    ],
    lessons: [
      "Chapter 1 - Basic Syntax.pdf",
      "Chapter 2 - Functions and Relations.pdf",
    ],
  },
  { 
    id: 5, 
    title: "1STSEM SY 2025-2026", 
    subtitle: "CS1B1 CC2",
    assignments: [
      "Exercise 1.docx",
      "Exercise 2.docx",
    ],
    lessons: [
      "Course Outline.pdf",
      "CommonEthicalTheories.pdf",
    ],
  },
  { 
    id: 6, 
    title: "2SY2526 - THESIS 1_CS3B2", 
    subtitle: "2SY2526 1_CS3B2",
    assignments: [
      "Proposal Rating Sheet.docx",
      "FORMAT-THESIS-involving-FOUNDATION-OF-COMPUTER-SCIENCE.docx",
    ],
    lessons: [
      "Chapter 1.pdf",
      "Chapter 2.pdf",
    ],
  },
];

const Dashboard = () => {
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
} = useCanvaBehavior("dashboard-grid");

  const navigate = useNavigate();

  const handleCourseClick = (course) => {
    navigate("/canvas/modules", { state: { course } });
  };

  return (
  <>  
    {clickModeActive && <div className="dashboard-click-error-overlay" />}

    <div className="dashboard-container">
  
  <h2 className="dashboard-header">Dashboard</h2>

  <div
    className={`dashboard-grid ${focusMode ? "focus-active" : ""}`}
  >
    {courses.map((course) => (
      <div
        key={course.id}
        id={`course-${course.id}`}
        className={`dashboard-card ${
          focusMode && !focusedChatIds.includes(course.id)
            ? "hidden-card"
            : ""
        }`}
        onMouseEnter={() => handleMouseEnter(course.id)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleCourseClick(course)}
      >
        <div className="card-top"></div>
        <div className="card-content">
          <h3>{course.title}</h3>
          <p>{course.subtitle}</p>
        </div>

        {focusMode && focusedChatIds.includes(course.id) && (
          <div className="dashboard-focus-popup">FOCUS MODE <br /></div>
        )}
      </div>
    ))}
  </div>

    <div className="tracking-panel">
    <p><strong>Scroll Speed:</strong> {Number(scrollVelocity).toFixed(1)} px/s</p>
    <p><strong>Hover Duration:</strong> {hoverDuration}s</p>
    <p><strong>Click Error Rate:</strong> {clickErrorRate.toFixed(1)}%</p>
    <p><strong>Action:</strong> {action}</p>
    <p>
      <strong>Selected Module: <br /></strong>{" "}
      {focusedChatIds.length > 0
        ? focusedChatIds
            .map((id) => courses.find((c) => c.id === id)?.title || "Unknown")
            .join(", ")
        : "None"}
    </p>
  </div>

</div>
</>
  );
};

export default Dashboard;
