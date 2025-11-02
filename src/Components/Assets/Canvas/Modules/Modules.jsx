import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Modules.css";
import useCanvaBehavior from "../useCanvaBehavior";

const Modules = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  // ✅ bring in all behavior states
  const {
    handleMouseEnter,
    handleMouseLeave,
    scrollVelocity,
    focusMode,
    hoverDuration,
    focusedChatIds,
    clickErrorRate,
    clickModeActive,
  } = useCanvaBehavior("main-content");

  if (!course) {
    return (
      <div className="no-course">
        <p>No course selected.</p>
        <button onClick={() => navigate("/canvas/dashboard")}>
          Go Back to Dashboard
        </button>
      </div>
    );
  }

  const isItemFocused = (id) => focusedChatIds.includes(id);

  return (
    <>
      {clickModeActive && <div className="click-error-overlay" />}

      <div className="subjects-container">
        <aside className="sidebar">
          <h2>Menu</h2>
          <ul>
            {[
              "Home",
              "Announcements",
              "Discussions",
              "Grades",
              "People",
              "Files",
              "Syllabus",
              "Modules",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>

        <main className="main-content">
          <h1 className="course-title">{course.title}</h1>

          {/* --- Assignments --- */}
            <section className="section">
              <h2>Assignments</h2>
              <div className="item-list assignments-list">
                {course.assignments.map((assignment, index) => {
                  const id = `assign-${index}`;
                  const isFocused = focusMode && isItemFocused(id);
                  const isHidden =
                    focusMode &&
                    id.startsWith("assign") &&
                    !isFocused;

                  return (
                    <div
                      key={id}
                      className={`assignment-item ${
                        isFocused ? "focused-assign" : ""
                      } ${isHidden ? "hidden-assign" : ""}`}
                      onMouseEnter={() => handleMouseEnter(id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {assignment}
                      {isFocused && hoverDuration < 3 && (
                        <div className="focus-mode-label">Focus Mode Active</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* --- Lessons --- */}
            <section className="section">
              <h2>Lessons</h2>
              <div className="item-list lessons-list">
                {course.lessons.map((lesson, index) => {
                  const id = `lesson-${index}`;
                  const isFocused = focusMode && isItemFocused(id);
                  const isHidden =
                    focusMode &&
                    id.startsWith("lesson") &&
                    !isFocused;

                  return (
                    <div
                      key={id}
                      className={`lesson-item ${
                        isFocused ? "focused-lesson" : ""
                      } ${isHidden ? "hidden-lesson" : ""}`}
                      onMouseEnter={() => handleMouseEnter(id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {lesson}
                      {isFocused && hoverDuration < 3 && (
                        <div className="focus-mode-label">Focus Mode Active</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

          {/* ✅ Behavior Tracking Panel */}
          <div className="tracking-panel">
            <p><strong>Scroll Speed:</strong> {Number(scrollVelocity).toFixed(1)} px/s</p>
            <p>Hover Duration: {hoverDuration}s</p>
            <p>Focus Mode: {focusMode ? "Active" : "Inactive"}</p>
            <p>Focused Items: {focusedChatIds.join(", ") || "None"}</p>
            <p>
              Click Error Rate:{" "}
              <span
                className={
                  clickErrorRate >= 15 ? "error-rate-high" : "error-rate-normal"
                }
              >
                {clickErrorRate.toFixed(1)}%
              </span>
            </p>
          </div>
        </main>

        <aside className="right-panel">
          {[
            "View Course Stream",
            "Drop the Course",
            "View Course Calendar",
            "View Course Notification",
          ].map((btn, index) => (
            <button key={index} className="right-button">
              {btn}
            </button>
          ))}
        </aside>
      </div>
    </>
  );
};

export default Modules;
