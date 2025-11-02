import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './MsTeams.css';
import chat from '../Sections/chat.png';
import meet from '../Sections/video.png';
import teams from '../Sections/team.png';
import mscalendar from '../Sections/teamscalendar.png';
import notification from '../Sections/notification.png';
import settings from '../Sections/setting.png';
import msteams from '../Sections/msteams.png';

export const MsTeams = () => {
  const location = useLocation();

  const menuItems = [
    { to: "chat", icon: chat, label: "Chat" },
    { to: "meet", icon: meet, label: "Meet" },
    { to: "communities", icon: teams, label: "Teams" },
    { to: "mscalendar", icon: mscalendar, label: "Calendar" },
    { to: "notification", icon: notification, label: "Activity" },
  ];

  return (
    <div className="ms-wrapper">
      <div className="ms-sidebar">
        <div className="ms-sidebar-logo">
          <Link to='/'>
          <img src={msteams} alt="Teams" />
          </Link>
        </div>

        <div className="ms-menu">
          {menuItems.map((item) => (
            <Link
              to={item.to}
              key={item.to}
              className={`ms-menu-item ${location.pathname.includes(item.to) ? 'active' : ''}`}
            >
              <img src={item.icon} alt={item.label} />
            </Link>
          ))}
        </div>

        <div className="ms-sidebar-bottom">
          <Link to="settings-ms" className="ms-menu-item">
            <img src={settings} alt="Settings" />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="ms-content">
        <div className="ms-topbar">
          <input className="ms-searchbar" placeholder="Search" />
          <div className="ms-top-right">
            <img src={notification} alt="Alerts" className="icon-small" />
            <img src={settings} className="icon-small" alt="Settings" />
            <div className="profile-circle"></div>
          </div>
        </div>
        <div className="ms-page">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
