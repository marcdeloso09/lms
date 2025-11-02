import { useState, useEffect, useRef, useCallback } from "react";

export default function useUserBehavior(containerClass = "chat-container") {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [hoverDuration, setHoverDuration] = useState(0);
  const [clickErrorRate, setClickErrorRate] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const [clickModeActive, setClickModeActive] = useState(false);
  const [action, setAction] = useState("Normal");
  const [focusedChatIds, setFocusedChatIds] = useState([]); // ✅ Added

  // Refs
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const hoverStart = useRef(null);
  const totalClicksRef = useRef(0);
  const errorClicksRef = useRef(0);
  const hoverTimerRef = useRef(null);
  const focusTimeoutRef = useRef(null);
  const clickErrorTimeoutRef = useRef(null);

  /** 🧠 Save Behavior to LocalStorage */
  const saveBehavior = useCallback((key, value) => {
    const existing = JSON.parse(localStorage.getItem("userBehaviors")) || [];
    existing.push({
      timestamp: new Date().toLocaleString(),
      key,
      value,
    });
    localStorage.setItem("userBehaviors", JSON.stringify(existing));
  }, []);

  /** 🖱️ Click Tracking */
  useEffect(() => {
    const handleClick = (e) => {
      totalClicksRef.current += 1;
      const insideContainer = e.target.closest(`.${containerClass}`);
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

      // Trigger alert behavior if high error rate
      if (easedRate >= 15 && !clickModeActive) {
        setClickModeActive(true);
        setAction("Click Error Mode Active");
        saveBehavior("Click Error Rate Trigger (>15%)", `${easedRate.toFixed(1)}%`);

        const container = document.querySelector(`.${containerClass}`);
        if (container) container.classList.add("click-error-enlarged");

        clearTimeout(clickErrorTimeoutRef.current);
        clickErrorTimeoutRef.current = setTimeout(() => {
          setClickModeActive(false);
          setAction("Normal Layout");
          if (container) container.classList.remove("click-error-enlarged");
          totalClicksRef.current = 0;
          errorClicksRef.current = 0;
          setClickErrorRate(0);
        }, 10000);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [clickErrorRate, clickModeActive, containerClass, saveBehavior]);

  /** 🧭 Scroll Tracking */
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const currentTime = Date.now();
      const dy = Math.abs(currentY - lastScrollY.current);
      const dt = (currentTime - lastTime.current) / 1000;
      const rawVelocity = dt > 0 ? dy / dt : 0;

      const maxVelocity = 30;
      const smoothingFactor = 0.1;
      const smoothedVelocity =
        rawVelocity > maxVelocity
          ? scrollVelocity + (maxVelocity - scrollVelocity) * smoothingFactor
          : rawVelocity;

      setScrollVelocity(smoothedVelocity);
      lastScrollY.current = currentY;
      lastTime.current = currentTime;

      if (smoothedVelocity < 30 && smoothedVelocity > 0) {
        setAction("Slow Scroll Detected");
        saveBehavior("Scroll Velocity (<30px/s)", `${smoothedVelocity.toFixed(1)} px/s`);
      }
    };

    lastScrollY.current = window.scrollY;
    lastTime.current = Date.now();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollVelocity, containerClass, saveBehavior]);

  /** 🧍 Hover Tracking */
  const handleMouseEnter = useCallback((id) => {
    hoverStart.current = Date.now();
    hoverTimerRef.current = setInterval(() => {
      const elapsed = ((Date.now() - hoverStart.current) / 1000).toFixed(1);
      setHoverDuration(elapsed);
    }, 100);

    focusTimeoutRef.current = setTimeout(() => {
      setFocusMode(true);
      setFocusedChatIds((prev) => (prev.includes(id) ? prev : [...prev, id])); // ✅ Added
      setAction("Focus Mode");
      saveBehavior("Hover Duration (<3s)", `${hoverDuration}s`);
    }, 3000);
  }, [hoverDuration, saveBehavior]);

  const handleMouseLeave = useCallback(() => {
    clearInterval(hoverTimerRef.current);
    clearTimeout(focusTimeoutRef.current);
    setHoverDuration(0);
    setFocusMode(false);
    setFocusedChatIds([]); // ✅ Reset on leave
    setAction("Normal");
  }, []);

  /** 🔚 Cleanup */
  useEffect(() => {
    return () => {
      clearInterval(hoverTimerRef.current);
      clearTimeout(focusTimeoutRef.current);
      clearTimeout(clickErrorTimeoutRef.current);
    };
  }, []);

  /** 🎯 Return Tracked Values */
  return {
    scrollVelocity,
    hoverDuration,
    clickErrorRate,
    focusMode,
    clickModeActive,
    action,
    handleMouseEnter,
    handleMouseLeave,
    focusedChatIds, // ✅ Added return
  };
}
