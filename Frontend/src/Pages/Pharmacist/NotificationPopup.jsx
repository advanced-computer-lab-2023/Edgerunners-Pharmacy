import React, { useState, useEffect } from 'react';

const NotificationPopup = ({ notifications }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Display the popup when new notifications are received
    if (notifications.length > 0) {
      setShowPopup(true);

      // Optional: You can set a timer to hide the popup after a certain duration
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 5000); // Hide after 5 seconds (adjust as needed)

      // Cleanup the timer on component unmount or when notifications change
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  return (
    <div className={`notification-popup ${showPopup ? 'visible' : ''}`}>
      <h3>New Notification</h3>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationPopup;