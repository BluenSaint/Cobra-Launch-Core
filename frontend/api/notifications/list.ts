import type { NextApiRequest, NextApiResponse } from 'next';
import { getNotifications } from "../../lib/notifications";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const notifications = getNotifications();
  res.status(200).json(notifications);
}
