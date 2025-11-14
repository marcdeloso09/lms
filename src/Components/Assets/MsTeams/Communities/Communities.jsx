import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Communities.css";

export default function Communities({ containerClass = "class-grid-container" }) {
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
  const totalClicksRef = useRef(0);
  const errorClicksRef = useRef(0);

  // --- Class Data ---
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

  // --- ENLARGE MODE (identical to useCanvaBehavior) ---
  const triggerEnlargeMode = useCallback(() => {
    const container = document.querySelector(`.${containerClass}`);
    if (!container) return;

    document.body.classList.add("enlarge-mode");
    container.classList.add("enlarged");

    clearTimeout(enlargeTimeoutRef.current);
    enlargeTimeoutRef.current = setTimeout(() => {
      document.body.classList.remove("enlarge-mode");
      container.classList.remove("enlarged");
      if (!clickModeActive && !focusMode) setAction("Normal Layout");
    }, 10000);
  }, [clickModeActive, focusMode, containerClass]);

   // --- SCROLL DETECTION ---
useEffect(() => {
  const handleScroll = () => {
    const currentY = window.scrollY;
    const currentTime = Date.now();
    const dy = Math.abs(currentY - lastScrollY.current);
    const dt = (currentTime - lastTime.current) / 1000;

    let rawVelocity = dt > 0 ? dy / dt : 0;

    // --- HARD CAP at 100 px/s ---
    rawVelocity = Math.min(rawVelocity, 100);

    // --- SLOWER SMOOTHING ---
    const maxVelocity = 50;
    const smoothingFactor = 0.05; // <--- MUCH smoother & slower updates

    const easedVelocity =
      rawVelocity > maxVelocity
        ? scrollVelocity + (maxVelocity - scrollVelocity) * smoothingFactor
        : scrollVelocity + (rawVelocity - scrollVelocity) * smoothingFactor;

    setScrollVelocity(easedVelocity);

    lastScrollY.current = currentY;
    lastTime.current = currentTime;

    // --- Reset per scroll burst (keeps numbers clean) ---
    clearTimeout(window.scrollResetTimeout);
    window.scrollResetTimeout = setTimeout(() => {
      setScrollVelocity(0);
    }, 2000);

    // --- CANCEL any pending slow-scroll triggers when scrolling fast ---
    if (easedVelocity >= 30) {
      clearTimeout(window.slowScrollTimeout);
      return; // <--- IMPORTANT: do NOT continue slow logic
    }

    // --- SLOW SCROLL DETECTION (<30 px/s) ---
    if (easedVelocity > 0 && easedVelocity < 30) {
      clearTimeout(window.slowScrollTimeout);

      window.slowScrollTimeout = setTimeout(() => {

        // FINAL CHECK after 2s to avoid false triggers
        if (scrollVelocity >= 30) return;

        setAction("Slow Scroll Detected");
        saveBehavior("Scroll Velocity (<30px/s)", `${easedVelocity.toFixed(1)} px/s`);
        triggerEnlargeMode();

      }, 2000);
    }
  };

  lastScrollY.current = window.scrollY;
  lastTime.current = Date.now();

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, [scrollVelocity, triggerEnlargeMode]);

  // --- HOVER HANDLERS ---
  const handleMouseEnter = (id) => {
    hoverStartTime.current = Date.now();

    clearInterval(window.hoverInterval);
    window.hoverInterval = setInterval(() => {
      const elapsed = ((Date.now() - hoverStartTime.current) / 1000).toFixed(1);
      setHoverDuration(elapsed);
    }, 100);

    setTimeout(() => {
      const currentElapsed = ((Date.now() - hoverStartTime.current) / 1000).toFixed(1);
      saveBehavior("Hover Duration (<3s)", `${currentElapsed}s`);
      setFocusMode(true);
      setFocusedClassIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
      setAction("Focus View");

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
    if (!clickModeActive) setAction("Hovering over classes");
  };

  // --- CLICK ERROR MODE ---
  const triggerClickErrorMode = useCallback(
    (rate) => {
      const container = document.querySelector(`.${containerClass}`);
      if (!container) return;

      setClickModeActive(true);
      setAction("Click Error Mode");
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
    },
    [containerClass]
  );

  // --- CLICK TRACKING ---
  useEffect(() => {
    const handleClick = (e) => {
      totalClicksRef.current += 1;
      const insideContainer = !!e.target.closest(`.${containerClass}`);
      if (!insideContainer) errorClicksRef.current += 1;

      const rawRate = (errorClicksRef.current / totalClicksRef.current) * 100;
      const maxRate = 20;
      const smoothingFactor = 0.1;
      const easedRate =
        rawRate > maxRate
          ? clickErrorRate + (maxRate - clickErrorRate) * smoothingFactor
          : rawRate;

      setClickErrorRate(easedRate);
      if (easedRate >= 15 && !clickModeActive)
        triggerClickErrorMode(easedRate);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [clickErrorRate, clickModeActive, triggerClickErrorMode, containerClass]);

  // --- CLEANUP ---
  useEffect(() => {
    const enlargeSnapshot = enlargeTimeoutRef.current;
    const clickSnapshot = clickModeTimeoutRef.current;
    return () => {
      clearTimeout(enlargeSnapshot);
      clearTimeout(clickSnapshot);
      clearInterval(window.hoverInterval);
      clearTimeout(window.focusTimeout);
    };
  }, []);

  // --- NAVIGATION HANDLER ---
  const handleViewClick = (cls) =>
    navigate("/msteams/communities/activity", { state: { cls } });

  // --- UI ---
  return (
    <>
      {clickModeActive && <div className="click-error-overlay" />}

      <div
        className={`${containerClass} ${focusMode ? "focus-active" : ""}`}
      >
        {classes.map((cls) => (
          <div
            key={cls.id}
            className={`class-card ${
              focusMode && !focusedClassIds.includes(cls.id)
                ? "hidden-card"
                : ""
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
              <button
                className="class-view"
                onClick={() => handleViewClick(cls)}
              >
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
