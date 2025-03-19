import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import notificationsData from "./notifications";

function Notification({ id, name, onClear, description }) {
  return (
    <div className="alert alert-light shadow-sm rounded d-flex justify-content-between align-items-center p-3">
      <div d-flex flex-column>
        <strong className="text-primary">{name}</strong>
        <div>{description}</div>
      </div>
      <button className="btn btn-sm" onClick={() => onClear(id)}>
        ✖
      </button>
    </div>
  );
}

function NotificationsWrapper({ notificationCount, children }) {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-light">
      <div className="container p-4 bg-white shadow-lg rounded">
        <h2 className="text-center mb-4">
          Notifications ({notificationCount})
        </h2>
        {children}
      </div>
    </div>
  );
}

function App() {
  const [notifications, setNotifications] = useState(notificationsData);

  const clearNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationsWrapper notificationCount={notifications.length}>
      {notifications.length > 0 ? (
        <>
          {notifications.map(({ id, name, message }) => (
            <Notification
              key={id}
              id={id}
              name={name}
              description={message}
              onClear={clearNotification}
            />
          ))}
          <button
            className="btn btn-warning mt-3"
            onClick={clearAllNotifications}
          >
            Clear All
          </button>
        </>
      ) : (
        <p className="w-100 text-center text-muted">No notifications</p>
      )}
    </NotificationsWrapper>
  );
}

export default App;