import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Classrooms from './Components/Templates/Classrooms';
import { Classroom } from './Components/Assets/Classroom/Classroom';
import Home from './Components/Assets/Classroom/Home/Home';
import Profile from './Components/Assets/Classroom/Profile/Profile';
import Enrolled from './Components/Assets/Classroom/Enrolled/Enrolled';
import Courses from './Components/Assets/Classroom/Courses/Courses';
import Classes from './Components/Assets/Classroom/Classes/Classes'
import Grades from './Components/Assets/Classroom/Grades/Grade';
import Archived from './Components/Assets/Classroom/Archived/Archived';
import Settings from './Components/Assets/Classroom/Settings/Settings';
import { Canvas } from './Components/Assets/Canvas/Canvas';
import Account from './Components/Assets/Canvas/Account/Account';
import Dashboard from './Components/Assets/Canvas/Dashboard/Dashboard';
import Calendar from './Components/Assets/Canvas/Calendar/Calendar';
import Inbox from './Components/Assets/Canvas/Inbox/Inbox';
import History from './Components/Assets/Canvas/History/History';
import Help from './Components/Assets/Canvas/Help/Help';
import Modules from './Components/Assets/Canvas/Modules/Modules';
import { MsTeams } from './Components/Assets/MsTeams/MsTeams';
import Activity from './Components/Assets/MsTeams/Activity/Activity';
import Meet from './Components/Assets/MsTeams/Meet/Meet';
import Communities from './Components/Assets/MsTeams/Communities/Communities';
import Chat from './Components/Assets/MsTeams/Chat/Chat';
import MsCalendar from './Components/Assets/MsTeams/MsCalendar/MsCalendar';
import Notification from './Components/Assets/MsTeams/Notification/Notification'
import Todo from './Components/Assets/Classroom/Todo/Todo'
import MsProfile from './Components/Assets/MsTeams/Profile/MsProfile';

function App() {
  const classes = [
  "IAS - CSB3 2ND SEMESTER 2025",
  "THESIS | 2025",
  "PROGRAMMING LANGUAGE",
  "Math Elective",
  "Web Development",
  "Data Structures",
  ];
  return (
      <Routes>
        <Route path="/lms" element={<Classrooms />} />
        <Route path="/classroom" element={<Classroom classes={classes} />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="enrolled" element={<Enrolled />} />
          <Route path="courses" element={<Courses />} />
          <Route path="class/:id" element={<Classes />} />
          <Route path="grades" element={<Grades />} />
          <Route path="archived" element={<Archived />} />
          <Route path="todo" element={<Todo />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/canvas" element={<Canvas />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="account" element={<Account />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="modules" element={<Modules />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="history" element={<History />} />
          <Route path="help" element={<Help />} />
        </Route>
        <Route path="/msteams" element={<MsTeams />}>
          <Route index element={<Navigate to="communities" replace />} />
          <Route path="/msteams/communities/activity" element={<Activity />} />
          <Route path="chat" element={<Chat />} />
          <Route path="mscalendar" element={<MsCalendar />}/>
          <Route path="communities" element={<Communities />} />
          <Route path="meet" element={<Meet />} />
          <Route path="notification" element={<Notification />} />
          <Route path="settings-ms" element={<MsProfile />} />
        </Route>
      </Routes>
  );
}

export default App;
