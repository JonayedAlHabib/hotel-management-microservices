import { prisma } from "../db/prisma.js";
import { ApiError } from "../utils/apiError.js";
import { sendNotificationEmail } from "../utils/mailer.js";

// One entry per routing key events.consumer.js is bound to. Each maps the
// event payload to { userId, type, title, message, relatedEntityId, email }.
// Wiring CHECKIN_REMINDER/etc. later is just another entry here, once those
// events actually exist.
const EVENT_HANDLERS = {
  "booking.confirmed": (event) => ({
    userId: event.userId,
    type: "BOOKING_CONFIRMED",
    title: "Booking confirmed",
    message: `Your booking ${event.reference || event.reservationId} is confirmed.`,
    relatedEntityId: event.reservationId,
    email: event.guestEmail,
  }),
  "booking.cancelled": (event) => ({
    userId: event.userId,
    type: "BOOKING_CANCELLED",
    title: "Booking cancelled",
    message: `Your booking ${event.reference || event.reservationId} has been cancelled.`,
    relatedEntityId: event.reservationId,
    email: event.guestEmail,
  }),
  "payment.succeeded": (event) => ({
    userId: event.guestId,
    type: "PAYMENT_CONFIRMED",
    title: "Payment received",
    message: `We've received your payment for reservation ${event.reservationId}.`,
    relatedEntityId: event.reservationId,
    email: event.guestEmail,
  }),
};

// Skipped, not an error, when the event carries no userId — a walk-in/phone
// guest (no auth-service account) has nowhere to receive an in-app
// notification, same reasoning the other services use for their own
// nullable guestId fields.
async function createNotificationFromEvent(routingKey, event) {
  const build = EVENT_HANDLERS[routingKey];
  if (!build) return;

  const { userId, type, title, message, relatedEntityId, email } = build(event);
  if (!userId) return;

  const notification = await prisma.notification.create({
    data: { userId, type, title, message, relatedEntityId },
  });

  // In-app row already committed above — an email failure here never undoes it.
  await sendNotificationEmail(email, { title, message });

  return notification;
}

// UC-G19 — paginated, newest first, strictly scoped to the caller's own userId.
async function listNotifications(userId, { page = 1, limit = 20 } = {}) {
  const take = Math.min(Number(limit) || 20, 100);
  const skip = (Math.max(Number(page) || 1, 1) - 1) * take;

  const [items, total, unreadCount] = await Promise.all([
    prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, skip, take }),
    prisma.notification.count({ where: { userId } }),
    prisma.notification.count({ where: { userId, read: false } }),
  ]);

  return { items, total, unreadCount, page: Number(page) || 1, limit: take };
}

// Same non-owner-gets-404 rule the other services use for guest-data isolation.
async function markAsRead(id, userId) {
  const notification = await prisma.notification.findUnique({ where: { id } });
  if (!notification || notification.userId !== userId) {
    throw new ApiError(404, "Notification not found");
  }
  return prisma.notification.update({ where: { id }, data: { read: true } });
}

async function markAllAsRead(userId) {
  await prisma.notification.updateMany({ where: { userId, read: false }, data: { read: true } });
}

export { createNotificationFromEvent, listNotifications, markAsRead, markAllAsRead };
