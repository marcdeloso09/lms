import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Activity.css";

export default function Activity() {
  const location = useLocation();
  const navigate = useNavigate();

  const { cls } = location.state || {};

  
  if (!cls) {
    navigate("/msteams/communities");
    return null;
  } 
  
  const activities = {
    Mathematics: {
      code: "MATH101",
      title: "Understanding Algebraic Concepts",
      author: "Prof. Smith",
      description:
        "Algebra is one of the key foundations of mathematics. This lesson focuses on simplifying expressions, solving linear equations, and understanding variable relationships.",
      time: "9:35AM",
      date: "10/17/25",
    },
    Biology: {
      code: "BIO102",
      title: "Exploring Cell Structures",
      author: "Dr. Reyes",
      description:
        "We explore plant and animal cell structures, cell membranes, and genetic components. Prepare your lab kits for next class.",
      time: "8:15AM",
      date: "10/18/25",
    },
    History: {
      code: "HIST201",
      title: "Ancient Civilizations",
      author: "Mr. Lopez",
      description:
        "We’ll study Mesopotamia, Egypt, and Greece to understand how their systems shaped the modern world.",
      time: "1:00PM",
      date: "10/19/25",
    },
    Chemistry: {
      code: "CHEM301",
      title: "Chemical Bonding Fundamentals",
      author: "Ms. Cruz",
      description:
        "A look into ionic, covalent, and metallic bonding. Learn how atoms form stable structures and compounds.",
      time: "10:45AM",
      date: "10/20/25",
    },
    Programming: {
      code: "CS101",
      title: "Programming Tips and Tricks 101",
      author: "Engr. Santos",
      description:
        "Introduction to clean code, debugging practices, and efficient algorithm design.",
      time: "9:35AM",
      date: "10/21/25",
    },
    Physics: {
      code: "PHYS105",
      title: "Newton’s Laws of Motion",
      author: "Dr. Johnson",
      description:
        "Exploring inertia, acceleration, and action-reaction forces through interactive simulations.",
      time: "11:00AM",
      date: "10/22/25",
    },
    Statistics: {
      code: "STAT210",
      title: "Introduction to Probability",
      author: "Prof. Lee",
      description:
        "Learn basic probability concepts, random events, and data interpretation.",
      time: "7:30AM",
      date: "10/23/25",
    },
  };

  const activity = cls ? activities[cls.title] : null;

  return (
    <div className="activity-page">
      <h1 className="activity-header">Activities</h1>
      <div className="activity-container">
        <div className="activity-sidebar">
          <h3>Today</h3>
          {activity ? (
            <div className="activity-item">
              <div className="avatar">{activity.author.charAt(0)}</div>
              <div className="activity-info">
                <p className="activity-author">
                  {activity.author} added a new task
                </p>
                <p className="activity-class">
                  {activity.code} • {activity.title}
                </p>
                <p className="activity-role">{activity.author}</p>
              </div>
              <span className="activity-time">{activity.time}</span>
            </div>
          ) : (
            <p className="no-activity">No activity found for this class.</p>
          )}
        </div>

        <div className="activity-details">
          {activity ? (
            <>
              <div className="details-header">
                <h3>/{activity.code}</h3>
                <span className="details-time">
                  {activity.time} {activity.date}
                </span>
              </div>
              <h2 className="details-title">{activity.title}</h2>
              <p className="details-author">{activity.author}</p>
              <p className="details-text">{activity.description}</p>
              <p className="details-text">{activity.description}</p>
            </>
          ) : (
            <p className="no-activity">Select a valid class to view details.</p>
          )}
        </div>
      </div>

      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to Communities
      </button>
    </div>
  );
}