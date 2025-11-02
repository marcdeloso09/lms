import React, { useState } from "react";
import TodoItem from "./TodoItem";
import "./Todo.css";

    const demoData = {
        noDueDate: [
            { title: "Github Url of your Portfolio Repository", course: "IS - 1ST SEM 2024", date: "Thursday, Jan 16" },
            { title: "Quiz: Command line Interface", course: "CS E1L - CS ELECTIVE 1", date: "Monday, Feb 3" },
            { title: "PSUSphere Part 2", course: "IS - 1ST SEM 2024", date: "Tuesday, Apr 8" },
        ],
        nextWeek: [
            { title: "Project Draft", course: "CS102", date: "Monday, Oct 27" },
            { title: "Weekly Reflection", course: "IS303", date: "Wednesday, Oct 29" },
        ],
        later: [
            { title: "Final Research Paper", course: "CS502", date: "Nov 15" },
        ],
        };
export default function Todo() {
  const [expanded, setExpanded] = useState({
    noDueDate: true,
    thisWeek: false,
    nextWeek: true,
    later: false,
  });

  const toggleExpand = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="todo-container">
      <select className="filter-dropdown">
        <option>All Classes</option>
      </select>

      {Object.entries(demoData).map(([sectionKey, items]) => (
        <div key={sectionKey}>
          <div className="section-header" onClick={() => toggleExpand(sectionKey)}>
            <span className="section-title">
              {sectionKey === "noDueDate" ? "No due date" : sectionKey === "nextWeek" ? "Next Week" : "Later"}
            </span>
            <span className="section-count">{items.length}</span>
            <span className="arrow">{expanded[sectionKey] ? "▲" : "▼"}</span>
          </div>
          {expanded[sectionKey] && (
            <div className="todo-list">
              {items.map((item, index) => (
                <TodoItem key={index} {...item} />
              ))}
            </div>
          )}
          <hr />
        </div>
      ))}

      <div className="see-all">See all</div>
    </div>
  );
}
