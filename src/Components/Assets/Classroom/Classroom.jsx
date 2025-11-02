import React, {useState} from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Classroom.css';
import blackboard from '../Sections/blackboard.png';
import user from '../Sections/user.png';
import house from '../Sections/house.png';
import book from '../Sections/book.png';
import settings from '../Sections/technical-support.png';
import document from '../Sections/document.png';
import todo from '../Sections/planning.png'

export const Classroom = ({ classes }) => {

  const [isOpen, setIsOpen] = useState(true);
  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <div style={{ display: 'flex' }}>
      <div className='classroom-sidebar'>
        <div className="classroom-sidebar-logo">
          <Link to='/'>
            <img src={blackboard} alt="" />
          </Link>
          <h4>EaseRoom</h4>
        </div> 
        <Link to="home" className='classroom-sidebar-item'>
          <img src={house} alt="" />
          <span>Home</span>
        </Link>
        <Link to="profile" className='classroom-sidebar-item'>
          <img src={user} alt="" />
          <span>Profile</span>
        </Link>
        <div className="classroom-sidebar-item" onClick={toggleDropdown}>
          <img src={book} alt="" />
          <span>Enrolled</span>
          <span className={`arrow ${isOpen ? "open" : ""}`}>⮟</span>
        </div>
          {isOpen && (
            <div className="class-list">
              {classes.map((cls, index) => (
                <Link
                  to={`/classroom/class/${index}`}
                  className="class-item"
                  key={index}
                >
                  <div className="class-icon">{cls.charAt(0)}</div>
                  <div className="class-info">
                    <div className="class-title">{cls}</div>
                    <div className="class-section">BSCS</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        <Link to="archived" className='classroom-sidebar-item'>
          <img src={document} alt="" />
          <span>Archived Classes</span>
        </Link>
        <Link to="todo" className='classroom-sidebar-item'>
          <img src={todo} alt="" />
          <span>Todo</span>
        </Link>
        <Link to="settings" className='classroom-sidebar-item'>
          <img src={settings} alt="" />
          <span>Settings</span>
        </Link>
      </div>

      <div className="classroom-main">
        <div className="classroom-topbar">
          <div className="classroom-searchbar">
            <input type="text" placeholder="Search classes..." />
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, padding: '20px' }}> 
          <Outlet />
        </div>
      </div>
      
    </div>
  );
};
