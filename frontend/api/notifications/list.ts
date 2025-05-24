import { getNotifications } from "../../lib/notifications";

export default function handler(req, res) {
  const notifications = getNotifications();
  res.status(200).json(notifications);
}
