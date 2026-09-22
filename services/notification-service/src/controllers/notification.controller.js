import { ApiResponse } from "../utils/apiResponse.js";
import { listNotifications, markAsRead, markAllAsRead } from "../services/notification.service.js";

async function listNotificationsHandler(req, res) {
  const result = await listNotifications(req.user.id, req.query);
  res.json(new ApiResponse(200, result, "Fetched notifications"));
}

async function markAsReadHandler(req, res) {
  const notification = await markAsRead(req.params.id, req.user.id);
  res.json(new ApiResponse(200, { notification }, "Notification marked as read"));
}

async function markAllAsReadHandler(req, res) {
  await markAllAsRead(req.user.id);
  res.json(new ApiResponse(200, null, "All notifications marked as read"));
}

export { listNotificationsHandler, markAsReadHandler, markAllAsReadHandler };
