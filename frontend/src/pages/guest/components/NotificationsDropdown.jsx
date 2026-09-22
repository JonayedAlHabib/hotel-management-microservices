import { useEffect, useRef, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import notificationApi from "../../../api/notificationClient";

const TYPE_LABELS = {
  BOOKING_CONFIRMED: "Booking confirmed",
  BOOKING_CANCELLED: "Booking cancelled",
  PAYMENT_CONFIRMED: "Payment received",
  CHECKIN_REMINDER: "Check-in reminder",
  CHECKOUT_REMINDER: "Check-out reminder",
  SERVICE_REQUEST_UPDATE: "Service request update",
};

// Polls the unread count every 30s regardless of whether the dropdown is
// open; only fetches the actual list when the guest opens it, so the topbar
// never has to hold the last N notifications in memory just for a badge.
export default function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    async function pollUnread() {
      try {
        const res = await notificationApi.get("/notifications", { params: { page: 1, limit: 1 } });
        setUnreadCount(res.data.data.unreadCount);
      } catch {
        // silent — a failed poll just leaves the last known badge count
      }
    }
    pollUnread();
    const interval = setInterval(pollUnread, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleOpen() {
    const opening = !open;
    setOpen(opening);
    if (opening) {
      setLoading(true);
      try {
        const res = await notificationApi.get("/notifications", { params: { page: 1, limit: 20 } });
        setNotifications(res.data.data.items);
        setUnreadCount(res.data.data.unreadCount);
      } catch {
        // leave the list empty on failure
      } finally {
        setLoading(false);
      }
    }
  }

  async function handleMarkRead(id) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    setUnreadCount((c) => Math.max(0, c - 1));
    try {
      await notificationApi.patch(`/notifications/${id}/read`);
    } catch {
      // best-effort — a failed mark-as-read just gets corrected on next poll/open
    }
  }

  async function handleMarkAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
    try {
      await notificationApi.patch("/notifications/read-all");
    } catch {
      // best-effort, same as handleMarkRead
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={handleOpen} className="relative" aria-label="Notifications">
        <Bell size={18} className="text-forest-900/40" />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 h-4 min-w-[1rem] px-1 rounded-full bg-red-500 text-white text-[10px] leading-4 text-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-forest-900/10 shadow-lg z-50 max-h-96 flex flex-col">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-forest-900/10">
            <p className="text-sm font-medium text-forest-900">Notifications</p>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="flex items-center gap-1 text-xs text-forest-900/60 hover:text-forest-900"
              >
                <CheckCheck size={13} />
                Mark all read
              </button>
            )}
          </div>

          <div className="overflow-y-auto">
            {loading && <p className="px-4 py-6 text-sm text-forest-900/40 text-center">Loading...</p>}
            {!loading && notifications.length === 0 && (
              <p className="px-4 py-6 text-sm text-forest-900/40 text-center">No notifications yet</p>
            )}
            {!loading &&
              notifications.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => !n.read && handleMarkRead(n.id)}
                  className={`w-full text-left px-4 py-3 border-b border-forest-900/5 last:border-0 hover:bg-forest-50 ${
                    n.read ? "" : "bg-sand-gold/5"
                  }`}
                >
                  <p className="text-xs font-medium text-forest-900/50">{TYPE_LABELS[n.type] || n.type}</p>
                  <p className="text-sm text-forest-900 mt-0.5">{n.message}</p>
                  <p className="text-[11px] text-forest-900/40 mt-1">{new Date(n.createdAt).toLocaleString()}</p>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
