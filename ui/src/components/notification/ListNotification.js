import React from 'react';

const Listnotification = ({ notifications }) => {

  const notificationsList = notifications.length ? (
    notifications.map((notification, idx) => {
      return (
        <li className="collection-item" key={idx}>
          <div>
            {notification.todo}
          </div>
          <i>{notification.notification_time}</i>
        </li>
      )
    })
  ) : (
      <p className="center">You have not got any notifications.</p>
    )
  return (
    <ul className="collection">
      {notificationsList}
    </ul>
  );
}

export default Listnotification;