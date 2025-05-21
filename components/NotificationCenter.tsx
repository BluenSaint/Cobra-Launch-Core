import { useState } from "react";
import { getNotifications, markAllAsRead } from "../lib/notifications";

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState(getNotifications());

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    setNotifications(getNotifications());
  };

  return (
    <div className="notification-center">
      <span className="bell-icon">🔔</span> {/* Add badge for unread count */}
      <div className="dropdown">
        {notifications.map((notification, index) => (
          <div key={index} className="notification">
            <p>{notification.message}</p>
            <span>{notification.timestamp}</span>
          </div>
        ))}
        <button onClick={handleMarkAllAsRead}>Mark All as Read</button>
      </div>
    </div>
  );
}
