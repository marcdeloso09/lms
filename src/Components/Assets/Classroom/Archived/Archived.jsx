import React from 'react'
import './Archived.css'


export default function Tasks() {
  const classes = [
    "Intro to Computing",
    "GE-MDS 1st 2024-2025",
    "CS2(B2)-OOP",
    "Palawan Studies",
    "GE - Ethics",
    "GE - Elect EM",
  ];
  return (
    <div className="archived-classes">
      <h2>Archived Classes</h2>
      <div className="classes">
        {classes.map((cls, index) => (
          <div className="class-box" key={index}>
            <h2>{cls}</h2>
            <button>View</button>
          </div>
        ))}
      </div>
    </div>
    
  )
}
