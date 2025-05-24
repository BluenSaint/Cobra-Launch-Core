interface Notification {
  id: number;
  userId: string;
  message: string;
  type: string;
  read: boolean;
  timestamp: string;
}

const notifications: Notification[] = [];

export function sendNotification(userId: string, message: string, type: string): void {
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

export function getNotifications(): Notification[] {
  return notifications;
}

export function markAllAsRead(): void {
  notifications.forEach((notification) => (notification.read = true));
}
