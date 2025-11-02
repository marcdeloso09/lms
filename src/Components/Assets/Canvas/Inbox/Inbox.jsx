import React from 'react';
import './Inbox.css';
import { Search, Edit, Reply, ReplyAll, Archive, Trash2, MoreHorizontal } from 'lucide-react';
import messages from '../../Sections/people.png';

export default function Inbox() {
  return (
    <div className="inbox-container">
      <div className="inbox-toolbar">
        <select className="inbox-select">
          <option>All Courses</option>
        </select>

        <select className="inbox-select">
          <option>Inbox</option>
        </select>

        <div className="inbox-search">
          <Search size={16} />
          <input type="text" placeholder="Search..." />
        </div>

        <div className="inbox-actions">
          <button><Edit size={16} /></button>
          <button><Reply size={16} /></button>
          <button><ReplyAll size={16} /></button>
          <button><Archive size={16} /></button>
          <button><Trash2 size={16} /></button>
          <button><MoreHorizontal size={16} /></button>
        </div>
      </div>

      <div className="inbox-body">
        <img src={messages} alt=''/>
        <p>No Conversations to Show</p>
      </div>
    </div>
  )
}
