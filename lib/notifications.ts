const notifications = [];

export function sendNotification(userId, message, type) {
  const timestamp = new Date().toISOString();
  notifications.push({
    id: notifications.length + 1,
    userId,
    message,
    type,
    read: false,
    timestamp,
  });
}

export function getNotifications() {
  return notifications;
}

export function markAllAsRead() {
  notifications.forEach((notification) => (notification.read = true));
}
