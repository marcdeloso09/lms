import { useState, useEffect, useRef, useCallback } from "react";

export default function useClassesBehavior(containerClass = "chat-container") {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [hoverDuration, setHoverDuration] = useState(0);
  const [action, setAction] = useState("Normal");
  const [focusMode, setFocusMode] = useState(false);
  const [focusedChatIds, setFocusedChatIds] = useState([]);
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

  // --- Save behavior to localStorage ---
  const saveBehavior = useCallback((key, value) => {
    const existing = JSON.parse(localStorage.getItem("userBehaviors")) || [];
    existing.push({ timestamp: new Date().toLocaleString(), key, value });
    localStorage.setItem("userBehaviors", JSON.stringify(existing));
  }, []);

  // --- Enlarge Mode ---
  const triggerEnlargeMode = useCallback(() => {
    const container = document.querySelector(`.${containerClass}`);
    if (!container) return;

    document.body.classList.add("enlarge-mode");
    container.classList.add("enlarged");

    clearTimeout(enlargeTimeoutRef.current);
    enlargeTimeoutRef.current = setTimeout(() => {
      document.body.classList.remove("enlarge-mode");
      container.classList.remove("enlarged");
      if (!clickModeActive && !focusMode) setAction("Normal");
    }, 10000);
  }, [clickModeActive, focusMode, containerClass]);

  // --- Scroll Detection ---
  useEffect(() => {
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

      if (cappedVelocity < 30 && cappedVelocity > 0) {
        clearTimeout(window.scrollDelayTimeout);
        window.scrollDelayTimeout = setTimeout(() => {
          setAction("Slow Scroll Detected");
          saveBehavior("Scroll Velocity (<30px/s)", `${cappedVelocity.toFixed(1)} px/s`);
          triggerEnlargeMode();
        }, 2000);
      }
    };

    lastScrollY.current = window.scrollY;
    lastTime.current = Date.now();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollVelocity, triggerEnlargeMode, saveBehavior]);

  // --- Hover Handlers ---
  const handleMouseEnter = useCallback(
    (id) => {
      hoverStartTime.current = Date.now();
      const hoverInterval = setInterval(() => {
        const elapsed = ((Date.now() - hoverStartTime.current) / 1000).toFixed(1);
        setHoverDuration(elapsed);
      }, 100);
      window.hoverInterval = hoverInterval;

      setTimeout(() => {
        const currentElapsed = ((Date.now() - hoverStartTime.current) / 1000).toFixed(1);
        setFocusMode(true);
        setFocusedChatIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
        saveBehavior("Hover Duration (<3s)", `${currentElapsed}s`);
        setAction("Focus View");

        clearTimeout(window.focusTimeout);
        window.focusTimeout = setTimeout(() => {
          setFocusMode(false);
          setFocusedChatIds([]);
          if (!clickModeActive) setAction("Normal Layout");
        }, 10000);
      }, 3000);
    },
    [clickModeActive, saveBehavior]
  );

  const handleMouseLeave = useCallback(() => {
    clearInterval(window.hoverInterval);
    setHoverDuration(0);
    hoverStartTime.current = null;
    if (!clickModeActive) setAction("Hovering on Stream");
  }, [clickModeActive]);

  // --- Click Error Mode ---
  const triggerClickErrorMode = useCallback(
    (rate) => {
      const container = document.querySelector(`.${containerClass}`);
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
    },
    [containerClass, saveBehavior]
  );

  // --- Click Tracking ---
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

      if (easedRate >= 15 && !clickModeActive) {
        triggerClickErrorMode(easedRate);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [clickErrorRate, clickModeActive, triggerClickErrorMode, containerClass]);

  // --- Return tracked states & handlers ---
  return {
    scrollVelocity,
    hoverDuration,
    clickErrorRate,
    action,
    handleMouseEnter,
    handleMouseLeave,
    clickModeActive,
    focusMode,
    focusedChatIds,
  };
}
