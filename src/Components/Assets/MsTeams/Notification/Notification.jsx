import React from 'react'
import './Notification.css'
import filter from '../../Sections/filter.png'

export default function Notification() {
  const assignments = [
  { id: 1, title: "Task_01 Assessment", course: "CS101", due: "Oct 23 | 11:59PM", status: "Assigned" },
  { id: 2, title: "Assignment 101", course: "CS202", due: "Oct 2 | 11:59PM", status: "Missing" },
  { id: 3, title: "Performance Task", course: "CS302", due: "Oct 1 | 12:00PM", status: "Done" },
  ];

const getStatusClass = (status) => {
  switch (status) {
    case 'Done':
      return 'status-done';
    case 'Missing':
      return 'status-missing';
    default:
      return 'status-assigned';
  } 
  };
  return (
    <div className="assignments-container">
      <div className="assignments-header">
        <h2>Assignments</h2>
        <img src={filter} alt="Filter" className="filter-icon" />
      </div>

      <div className="assignments-table-header">
        <span>Title</span>
        <span>Due date</span>
        <span>Status</span>
      </div>

      <div className="assignments-list">
        {assignments.map((item) => (
          <div key={item.id} className="assignment-row">
            <div className="assignment-title">
              <p className="main-title">{item.title}</p>
              <p className="sub-title">{item.course}</p>
            </div>
            <div className="assignment-due">{item.due}</div>
            <div className={`assignment-status ${getStatusClass(item.status)}`}>
              {item.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
