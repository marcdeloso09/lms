import React, { useState, useRef, useEffect } from 'react'
import './Canvas.css'
import { Link, Outlet } from 'react-router-dom'
import canva from '../Sections/canva.png'
import profile from '../Sections/profile.png';
import dashboard from '../Sections/dashboard.png';
import calendar from '../Sections/calendar.png';
import inbox from '../Sections/inbox.png';
import history from '../Sections/history.png';
import help from '../Sections/help.png';
import teacher from '../Sections/teacher.png'

export const Canvas = () => {
  const [showAccount, setShowAccount] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const panelRef = useRef(null);

    useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setShowAccount(false);
        setShowCourses(false);
        setShowHistory(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div className='canvas-sidebar'>
        <div className="canvas-sidebar-logo">
            <Link to='/lms'>
            <img src={canva} alt="" />
            </Link>
            <h4>Canva</h4>
        </div> 
        <div
          className='sidebar-item'
          onClick={() => setShowAccount(!showAccount)}
          style={{ cursor: 'pointer' }}
        >
          <img src={profile} alt="" />
          <span>Account</span>
        </div>
        <Link to="dashboard" className='sidebar-item'>
          <img src={dashboard} alt="" />
          <span>Dashboard</span>
        </Link>
        <div className='sidebar-item' onClick={() => {
            setShowCourses(!showCourses);
            setShowAccount(false);
          }} style={{ cursor: 'pointer' }}>
          <img src={teacher} alt="" />
          <span>Courses</span>
        </div>
        <Link to="calendar" className='sidebar-item'>
          <img src={calendar} alt="" />
          <span>Calendar</span>
        </Link>
        <Link to="inbox" className='sidebar-item'>
          <img src={inbox} alt="" />
          <span>Inbox</span>
        </Link>
        <div
          className='sidebar-item'
          onClick={() => {
            setShowHistory(!showHistory);
          }}
          style={{ cursor: 'pointer' }}
          >
          <img src={history} alt="" />
          <span>History</span>
        </div>
        <Link to="help" className='sidebar-item'>
          <img src={help} alt="" />
          <span>Help</span>
        </Link>
      </div>
      <div ref={panelRef}>
        <div className={`account-panel ${showAccount ? 'show' : 'hide'}`}>
          <div className="account-header">
            <div className="account-avatar">U</div>
            <div className="account-name">Username</div>
            <button className="logout-btn">Logout</button>
          </div>
          <ul className="account-links">
            <li>Notification</li>
            <li>Profile</li>
            <li>Files</li>
            <li>Settings</li>
            <li>ePortfolios</li>
            <li>QR for Mobile Login</li>
            <li>Global Announcements</li>
          </ul>
          <div className="account-options">
            <label><input type="checkbox" /> Use High Contrast UI</label>
            <label><input type="checkbox" /> Use a Dyslexia Friendly Font</label>
          </div>
        </div>

        <div className={`courses-panel ${showCourses ? 'show' : 'hide'}`}>
          <div className="courses-header">
            <h3>Courses</h3>
            <p className="all-courses">All Courses</p>
          </div>
          <ul className="courses-list">
            <li>
              <div className="course-title">CS 19 - 1st2526 - 4B2</div>
              <div className="course-sub">CS 19 - 1st2526 - 4B2</div>
            </li>
            <li>
              <div className="course-title">CS - 1 Discrete Structure 1</div>
              <div className="course-sub">2SY2324 1_CS3B2</div>
            </li>
            <li>
              <div className="course-title">CS 8/L 2024 B2</div>
              <div className="course-sub">CS 8/L 2024 B2</div>
            </li>
            <li>
              <div className="course-title">1STSEM SY 2021-2022 CS1B1 CC2</div>
              <div className="course-sub">1STSEM SY 2021-2022 CS1B1 CC2</div>
            </li>
            <li>
              <div className="course-title">2SY2324 - THESIS 1_CS3B2</div>
              <div className="course-sub">1STSEM SY 2021-2022 CS1B1 CC2</div>
            </li>
            <li>
              <div className="course-title">Intro to Computing</div>
              <div className="course-sub">CCL, BSCS 1-1</div>
            </li>
          </ul>
        </div>

        <div className={`history-panel ${showHistory ? 'show' : 'hide'}`}>
          <div className="history-header">
            <h3>Recent History</h3>
          </div>
          <ul className="history-list">
            <li>
              <div className="history-title">Course Assignments</div>
              <div className="history-sub">1SY2324 - CS20_CS4B1</div>
              <div className="history-time">Oct 11, 2025 5:44PM</div>
            </li>
            <li>
              <div className="history-title">Course Home</div>
              <div className="history-sub">CS1 - DISCRETE STRUCTURES 1</div>
              <div className="history-time">Oct 11, 2025 4:16PM</div>
            </li>
            <li>
              <div className="history-title">Function Assignment</div>
              <div className="history-sub">CS10/L 25 26 CS3B2</div>
              <div className="history-time">Oct 3, 2025 6:30PM</div>
            </li>
          </ul>
        </div>
      </div>

      <div style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  )
}
