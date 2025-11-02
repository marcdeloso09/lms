import React, {useState} from 'react'
import './MsCalendar.css'

export default function MsCalendar() {
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

  const events = [
    { date: 23, title: "Task_01 Perf", color: "#7289da" },
  ];

  const getEventForDay = (day) => events.find((e) => e.date === day);

  return (
    <div className="calendar-wrapper">
      <div className="ms-calendar-header">
        <h1>Calendar</h1>
      </div>

      <div className="calendar-body">
        <div className="calendar-toolbar">
          <button onClick={prevMonth}>‹</button>
          <h2>
            {monthNames[currentMonth].toUpperCase()} {currentYear}
          </h2>
          <button onClick={nextMonth}>›</button>
        </div>

        <div className="calendar-grid">
          {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map(
            (day) => (
              <div key={day} className="day-header">{day}</div>
            )
          )}

          {daysArray.map((day, i) => {
            const event = getEventForDay(day);
            return (
              <div key={i} className="day-cell">
                {day && (
                  <>
                    <span className="date-number">{day}</span>
                    {event && (
                      <div
                        className="event-box"
                        style={{ backgroundColor: event.color }}
                      >
                        {event.title}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
