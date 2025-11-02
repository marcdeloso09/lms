import React, { useState } from "react";
import "./Chat.css";
import useUserBehavior from "../useUserBehavior";

export default function Chat() {
  const {
    scrollVelocity,
    hoverDuration,
    clickErrorRate,
    action,
    handleMouseEnter,
    handleMouseLeave,
    clickModeActive,
    focusMode,
    focusedChatIds,
  } = useUserBehavior("chat-list");

  const chats = [
    {
      id: 1,
      name: "Temporary GC",
      sender: "John",
      lastMessage: "Good morning everyone!",
      avatar: "🟣",
    },
    {
      id: 2,
      name: "Database GC",
      sender: "Marc",
      lastMessage: "Hello guys!",
      avatar: "🟣",
    },
    {
      id: 3,
      name: "Programming Language",
      sender: "Dave",
      lastMessage: "Assignments for the week!",
      avatar: "🟣",
    },
  ];

  const [messages, setMessages] = useState([
    { sender: "John", content: "Good morning everyone!", time: "7:32 AM" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = {
      sender: "You",
      content: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <>
      {clickModeActive && <div className="chat-click-error-overlay" />}

      <div
        className={`chat-container ${
          action === "Slow Scroll Detected" ? "enlarge-mode" : ""
        } ${action === "Click Error Mode Active" ? "click-error-enlarged" : ""}`}
      >

        <div className="chat-sidebar">
          <div className="sidebar-header">
            <h2>Chat</h2>
            <div className="header-icons">
              <button>📝</button>
              <button>📞</button>
            </div>
          </div>

          <div className="chat-list">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`chat-item ${
                  focusMode && !focusedChatIds.includes(chat.id)
                    ? "hidden-chat" 
                    : ""
                }`}
                id={chat.id}
                onMouseEnter={() => handleMouseEnter(chat.id)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="chat-avatar">{chat.avatar}</div>
                <div className="chat-info">
                  <h3>{chat.name}</h3>
                  <p>
                    <strong>{chat.sender}:</strong> {chat.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-title">
              <div className="chat-avatar large">🟣</div>
              <h3>Temporary GC</h3>
            </div>
            <button className="menu-btn">⋮</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className="chat-message">
                <span className="sender">{msg.sender}</span>
                <div className="message-bubble">{msg.content}</div>
                <span className="timestamp">{msg.time}</span>
              </div>
            ))}
          </div>

          <div className="chat-input-area">
            <div className="input-icons">
              <button>📎</button>
              <button>😊</button>
            </div>
            <input
              type="text"
              placeholder="Type a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button className="send-btn" onClick={handleSend}>
              ➤
            </button>
          </div>
        </div>

        {focusMode && <div className="focus-popup">👁 Focus Mode Enabled</div>}

        <div className="tracking-panel">
          <p>Scroll Speed: {Number(scrollVelocity).toFixed(1)} px/s</p>
          <p>Hover Duration: {hoverDuration}s</p>
          <p>Click Error Rate: {clickErrorRate.toFixed(1)}%</p>
          <p>Action: {action}</p>
        </div>
      </div>
    </>
  );
}
