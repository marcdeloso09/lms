import React, { useState } from "react";
import "./Calendar.css";

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else setCurrentMonth(currentMonth + 1);
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else setCurrentMonth(currentMonth - 1);
  };

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();

  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);

  const daysArray = [];
  for (let i = 0; i < firstDayIndex; i++) daysArray.push(null);
  for (let d = 1; d <= daysInMonth; d++) daysArray.push(d);

  return (
    <div className="calendar-container">

      <div className="calendar-header">
        <button onClick={prevMonth} className="nav-btn">‹</button>
        <h2>{monthNames[currentMonth]} {currentYear}</h2>
        <button onClick={nextMonth} className="nav-btn">›</button>
      </div>

      <div className="calendar-content">

        <div className="calendar-main">
          <div className="calendar-days-header">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="calendar-grid">
            {daysArray.map((day, i) => (
              <div key={i} className={`calendar-day ${day ? "" : "empty"}`}>
                {day && <span>{day}</span>}
              </div>
            ))}
          </div>
        </div>
        
        <div className="calendar-sidebar">
          <div className="mini-calendar">
            <div className="mini-calendar-header">October</div>
            <div className="mini-calendar-grid">
              {[...Array(31)].map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          </div>

          <div className="calendar-legend">
            <h4>CALENDAR</h4>
            <ul>
              <li><span className="dot blue"></span> CS199 – 1st 2528 - 4B2</li>
              <li><span className="dot pink"></span> 2SY2324_LCS9B2</li>
              <li><span className="dot green"></span> CS 8L 2024 B2</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
