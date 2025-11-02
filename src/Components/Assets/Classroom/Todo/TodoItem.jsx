import React from "react";
import "./Todo.css";

function TodoItem({ title, course, date }) {
  return (
    <div className="todo-item">
      <div className="todo-icon"></div>
      <div className="todo-content">
        <h4>{title}</h4>
        <span className="course">{course}</span>
        <p className="posted">Posted {date}</p>
      </div>
    </div>
  );
}

export default TodoItem;
