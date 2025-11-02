import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Communities.css";

export default function Communities() {
  const navigate = useNavigate();

  // --- States ---
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [hoverDuration, setHoverDuration] = useState(0);
  const [action, setAction] = useState("Normal Layout");
  const [focusMode, setFocusMode] = useState(false);
  const [focusedClassIds, setFocusedClassIds] = useState([]);
  const [clickErrorRate, setClickErrorRate] = useState(0);
  const [clickModeActive, setClickModeActive] = useState(false);

  // --- Refs ---
  const lastScrollY = useRef(window.scrollY);
  const lastTime = useRef(Date.now());
  const hoverStartTime = useRef(null);
  const enlargeTimeoutRef = useRef(null);
  const clickModeTimeoutRef = useRef(null);
  const idleTimeoutRef = useRef(null);
  const totalClicksRef = useRef(0);
  const errorClicksRef = useRef(0);

  const classes = [
    { id: 1, title: "Mathematics", teacher: "Prof." },
    { id: 2, title: "Biology", teacher: "Dr." },
    { id: 3, title: "History", teacher: "Mr." },
    { id: 4, title: "Chemistry", teacher: "Ms." },
    { id: 5, title: "Programming", teacher: "Engr." },
    { id: 6, title: "Physics", teacher: "Dr." },
    { id: 7, title: "Statistics", teacher: "Prof." },
  ];

  // --- Save Behavior Log ---
  const saveBehavior = (key, value) => {
    const existing = JSON.parse(localStorage.getItem("userBehaviors")) || [];
    existing.push({ timestamp: new Date().toLocaleString(), key, value });
    localStorage.setItem("userBehaviors", JSON.stringify(existing));
  };

  // --- Enlarge Mode ---
  const triggerEnlargeMode = useCallback(() => {
    const container = document.querySelector(".class-card");
    if (!container) return;

    document.body.classList.add("enlarge-mode");
    container.classList.add("enlarged");

    clearTimeout(enlargeTimeoutRef.current);
    enlargeTimeoutRef.current = setTimeout(() => {
      document.body.classList.remove("enlarge-mode");
      container.classList.remove("enlarged");
      if (!clickModeActive && !focusMode) setAction("Normal Layout");
    }, 10000);
  }, [clickModeActive, focusMode]);

  // --- Scroll Detection + Idle Delay ---
  useEffect(() => {
    let lastVelocity = 0;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const currentTime = Date.now();
      const dy = Math.abs(currentY - lastScrollY.current);
      const dt = (currentTime - lastTime.current) / 1000;
      const rawVelocity = dt > 0 ? dy / dt : 0;

      const maxVelocity = 30;
      const smoothingFactor = 0.1;
      const cappedVelocity =
        rawVelocity > maxVelocity
          ? scrollVelocity + (maxVelocity - scrollVelocity) * smoothingFactor
          : rawVelocity;

      setScrollVelocity(cappedVelocity);
      lastScrollY.current = currentY;
      lastTime.current = currentTime;
      lastVelocity = cappedVelocity;

      // Always reset sidebar visibility on scroll
      clearTimeout(idleTimeoutRef.current);
      document.body.classList.remove("sidebar-hidden");

      // --- If user is scrolling slowly (≤30px/s) ---
      if (cappedVelocity <= 30 && cappedVelocity > 0) {
        clearTimeout(window.scrollDelayTimeout);

        // 🕒 2-second delay before enlarging
        window.scrollDelayTimeout = setTimeout(() => {
          setAction("Slow Scroll Detected");
          triggerEnlargeMode();
          saveBehavior("Scroll Velocity (≤30px/s)", cappedVelocity.toFixed(2));

          // 🕒 Then, another 2-second delay before hiding sidebar (idle)
          idleTimeoutRef.current = setTimeout(() => {
            const noMovement = Math.abs(window.scrollY - lastScrollY.current) < 2;
            if (noMovement || lastVelocity <= 30) {
              document.body.classList.add("sidebar-hidden");
              setAction("Sidebar Hidden (Idle after 2s Slow Scroll)");
            }
          }, 2000);
        }, 2000);
      } else {
        setAction("Normal Scrolling");
      }
    };

    lastScrollY.current = window.scrollY;
    lastTime.current = Date.now();

    window.addEventListener("scroll", handleScroll, { passive: true });

    const timeoutRef = idleTimeoutRef.current; // ✅ copy ref to avoid ESLint warning

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(window.scrollDelayTimeout);
      clearTimeout(timeoutRef);
    };
  }, [scrollVelocity, triggerEnlargeMode]);

  // --- Hover Handlers ---
  const handleMouseEnter = (id) => {
    hoverStartTime.current = Date.now();
    const hoverInterval = setInterval(() => {
      const elapsed = ((Date.now() - hoverStartTime.current) / 1000).toFixed(1);
      setHoverDuration(elapsed);
    }, 100);
    window.hoverInterval = hoverInterval;

    setTimeout(() => {
      setFocusMode(true);
      setAction("Focus Mode Triggered");
      setFocusedClassIds((prev) => {
        if (!prev.includes(id)) {
          const updated = [...prev, id];
          saveBehavior("Hover Duration (>3s)", `Focused: ${updated.join(", ")}`);
          return updated;
        }
        return prev;
      });

      clearTimeout(window.focusTimeout);
      window.focusTimeout = setTimeout(() => {
        setFocusMode(false);
        setFocusedClassIds([]);
        if (!clickModeActive) setAction("Normal Layout");
      }, 10000);
    }, 3000);
  };

  const handleMouseLeave = () => {
    clearInterval(window.hoverInterval);
    setHoverDuration(0);
    hoverStartTime.current = null;
  };

  // --- Click Error Mode ---
  const triggerClickErrorMode = useCallback((rate) => {
    const container = document.querySelector(".class-card");
    if (!container) return;

    setClickModeActive(true);
    setAction("Click Error Mode Active");
    saveBehavior("Click Error Rate Trigger (>15%)", `${rate.toFixed(1)}%`);
    container.classList.add("click-error-enlarged");

    clearTimeout(clickModeTimeoutRef.current);
    clickModeTimeoutRef.current = setTimeout(() => {
      setClickModeActive(false);
      container.classList.remove("click-error-enlarged");
      totalClicksRef.current = 0;
      errorClicksRef.current = 0;
      setClickErrorRate(0);
      setAction("Normal Layout");
    }, 10000);
  }, []);

  // --- Click Tracking ---
  useEffect(() => {
    const handleClick = (e) => {
      totalClicksRef.current += 1;
      const insideContainer = !!e.target.closest(".class-card");
      if (!insideContainer) errorClicksRef.current += 1;

      const rawRate =
        (errorClicksRef.current / totalClicksRef.current) * 100;
      const maxRate = 20;
      const smoothingFactor = 0.1;
      const easedRate =
        rawRate > maxRate
          ? clickErrorRate + (maxRate - clickErrorRate) * smoothingFactor
          : rawRate;

      setClickErrorRate(easedRate);
      if (easedRate >= 15 && !clickModeActive) triggerClickErrorMode(easedRate);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [clickErrorRate, clickModeActive, triggerClickErrorMode]);

  // --- Cleanup ---
  useEffect(() => {
    return () => {
      clearTimeout(enlargeTimeoutRef.current);
      clearTimeout(clickModeTimeoutRef.current);
      clearTimeout(idleTimeoutRef.current);
      clearInterval(window.hoverInterval);
      clearTimeout(window.focusTimeout);
    };
  }, []);

  const handleViewClick = (cls) =>
    navigate("/msteams/communities/activity", { state: { cls } });

  // --- UI ---
  return (
    <>
      {clickModeActive && <div className="click-error-overlay" />}

      <div className={`class-grid-container ${focusMode ? "focus-active" : ""}`}>
        {classes.map((cls) => (
          <div
            key={cls.id}
            className={`class-card ${
              focusMode && !focusedClassIds.includes(cls.id) ? "hidden-card" : ""
            }`}
            onMouseEnter={() => handleMouseEnter(cls.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="class-card-header"></div>
            <div className="class-card-body">
              <p className="class-title">
                Title: <span>{cls.title}</span>
              </p>
              <p className="class-teacher">
                Teacher: <span>{cls.teacher}</span>
              </p>
              <button className="class-view" onClick={() => handleViewClick(cls)}>
                view
              </button>
            </div>
          </div>
        ))}

        {focusMode && <div className="focus-popup">👁 Focus Mode Enabled</div>}

        <div className="tracking-panel">
          <p>
            <strong>Scroll Speed:</strong> {scrollVelocity.toFixed(1)} px/s
          </p>
          <p>
            <strong>Hover Duration:</strong>{" "}
            {hoverDuration > 0 ? `${hoverDuration}s` : "0s"}
          </p>
          <p>
            <strong>Click Error Rate:</strong> {clickErrorRate.toFixed(1)}%
          </p>
          <p>
            <strong>Action:</strong> {action}
          </p>
        </div>
      </div>
    </>
  );
}
