import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Activity.css";
import useUserBehavior from "../useUserBehavior";

export default function Activity() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cls } = location.state || {};
  const [selectedActivity, setSelectedActivity] = useState(null);

  // ✅ bring in all the behavioral logic from useCanvaBehavior
  const {
    handleMouseEnter,
    handleMouseLeave,
    scrollVelocity,
    focusMode,
    hoverDuration,
    focusedChatIds,
    clickErrorRate,
    clickModeActive,
  } = useUserBehavior("activity-container");

  if (!cls) {
    navigate("/msteams/communities");
    return null;
  }

  const activities = {
    Mathematics: [
      {
        code: "MATH101",
        title: "Understanding Algebraic Concepts",
        author: "Prof. Smith",
        description:
          "Algebra is one of the key foundations of mathematics. This lesson focuses on simplifying expressions, solving linear equations, and understanding variable relationships.",
        time: "9:35AM",
        date: "10/17/25",
      },
      {
        code: "MATH102",
        title: "Advanced Quadratic Equations",
        author: "Prof. Smith",
        description:
          "Dive deeper into solving and graphing quadratic equations. We'll explore discriminants, parabolas, and real-world applications.",
        time: "10:20AM",
        date: "10/18/25",
      },
    ],
    Biology: [
      {
        code: "BIO102",
        title: "Exploring Cell Structures",
        author: "Dr. Reyes",
        description:
          "We explore plant and animal cell structures, cell membranes, and genetic components. Prepare your lab kits for next class.",
        time: "8:15AM",
        date: "10/18/25",
      },
      {
        code: "BIO103",
        title: "Photosynthesis in Action",
        author: "Dr. Reyes",
        description:
          "Learn how light energy converts to chemical energy. We'll conduct a chlorophyll absorption experiment next week.",
        time: "9:00AM",
        date: "10/19/25",
      },
    ],
    History: [
      {
        code: "HIST201",
        title: "Ancient Civilizations",
        author: "Mr. Lopez",
        description:
          "We’ll study Mesopotamia, Egypt, and Greece to understand how their systems shaped the modern world.",
        time: "1:00PM",
        date: "10/19/25",
      },
      {
        code: "HIST202",
        title: "Medieval Europe and Its Legacy",
        author: "Mr. Lopez",
        description:
          "Discover the feudal system, the Crusades, and cultural evolution of medieval Europe.",
        time: "2:00PM",
        date: "10/20/25",
      },
    ],
    Chemistry: [
      {
        code: "CHEM301",
        title: "Chemical Bonding Fundamentals",
        author: "Ms. Cruz",
        description:
          "A look into ionic, covalent, and metallic bonding. Learn how atoms form stable structures and compounds.",
        time: "10:45AM",
        date: "10/20/25",
      },
      {
        code: "CHEM302",
        title: "Periodic Table Trends",
        author: "Ms. Cruz",
        description:
          "Understand electronegativity, ionization energy, and atomic radius trends across periods and groups.",
        time: "11:30AM",
        date: "10/21/25",
      },
    ],
    Programming: [
      {
        code: "CS101",
        title: "Programming Tips and Tricks 101",
        author: "Engr. Santos",
        description:
          "Introduction to clean code, debugging practices, and efficient algorithm design.",
        time: "9:35AM",
        date: "10/21/25",
      },
      {
        code: "CS102",
        title: "Object-Oriented Principles",
        author: "Engr. Santos",
        description:
          "Learn encapsulation, inheritance, and polymorphism through interactive coding exercises.",
        time: "10:00AM",
        date: "10/22/25",
      },
    ],
    Physics: [
      {
        code: "PHYS105",
        title: "Newton’s Laws of Motion",
        author: "Dr. Johnson",
        description:
          "Exploring inertia, acceleration, and action-reaction forces through interactive simulations.",
        time: "11:00AM",
        date: "10/22/25",
      },
      {
        code: "PHYS106",
        title: "Energy and Work Dynamics",
        author: "Dr. Johnson",
        description:
          "A closer look at kinetic, potential, and mechanical energy in motion systems.",
        time: "11:30AM",
        date: "10/23/25",
      },
    ],
    Statistics: [
      {
        code: "STAT210",
        title: "Introduction to Probability",
        author: "Prof. Lee",
        description:
          "Learn basic probability concepts, random events, and data interpretation.",
        time: "7:30AM",
        date: "10/23/25",
      },
      {
        code: "STAT211",
        title: "Sampling and Data Variability",
        author: "Prof. Lee",
        description:
          "Learn about statistical sampling methods and how variability affects conclusions.",
        time: "8:00AM",
        date: "10/24/25",
      },
    ],
  };

  const activityList = cls ? activities[cls.title] || [] : [];
  const activeActivity = selectedActivity || activityList[0];

  // Helper: check if this item is currently in focus
  const isItemFocused = (id) => focusedChatIds.includes(id);

  return (
    <>
      {clickModeActive && <div className="activity-error-overlay" />}

      <div className="activity-page">
        <h1 className="activity-header">Activities</h1>

        <div className="activity-container">
          {/* Sidebar List */}
          <div className="activity-sidebar">
            <h3>Today</h3>
            {activityList.length > 0 ? (
              activityList.map((activity, index) => {
                const id = activity.code;
                const isFocused = focusMode && isItemFocused(id);
                const isHidden =
                  focusMode && !isFocused && id !== selectedActivity?.code;

                return (
                  <div
                    key={id}
                    className={`activity-item ${
                      selectedActivity?.code === id ? "active" : ""
                    } ${isFocused ? "focused-activity" : ""} ${
                      isHidden ? "hidden-activity" : ""
                    }`}
                    onMouseEnter={() => handleMouseEnter(id)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => setSelectedActivity(activity)}
                  >
                    <div className="avatar">{activity.author.charAt(0)}</div>
                    <div className="activity-info">
                      <p className="activity-author">
                        {activity.author} added a new task
                      </p>
                      <p className="activity-class">
                        {activity.code} • {activity.title}
                      </p>
                    </div>
                    <span className="activity-time">{activity.time}</span>

                    {isFocused && hoverDuration < 3 && (
                      <div className="focus-mode-label">Focus Mode</div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="no-activity">No activity found for this class.</p>
            )}
          </div>

          {/* Activity Details */}
          <div className="activity-details">
            {activeActivity ? (
              <>
                <div className="details-header">
                  <h3>/{activeActivity.code}</h3>
                  <span className="details-time">
                    {activeActivity.time} {activeActivity.date}
                  </span>
                </div>
                <h2 className="details-title">{activeActivity.title}</h2>
                <p className="details-author">{activeActivity.author}</p>
                <p className="details-text">{activeActivity.description}</p>
              </>
            ) : (
              <p className="no-activity">Select a valid class to view details.</p>
            )}
          </div>
        </div>

        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to Communities
        </button>

        {/* --- Tracking Panel --- */}
        <div className="tracking-panel">
          <p>
            <strong>Scroll Velocity:</strong> {scrollVelocity.toFixed(1)} px/s
          </p>
          <p>Hover Duration: {hoverDuration}s</p>
          <p>Focus Mode: {focusMode ? "Active" : "Inactive"}</p>
          <p>
            Focused Items: {focusedChatIds.join(", ") || "None"}
          </p>
          <p>
            Click Error Rate:{" "}
            <span
              className={
                clickErrorRate >= 15
                  ? "error-rate-high"
                  : "error-rate-normal"
              }
            >
              {clickErrorRate.toFixed(1)}%
            </span>
          </p>
        </div>
      </div>
    </>
  );
}