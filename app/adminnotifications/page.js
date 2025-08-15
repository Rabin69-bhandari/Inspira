"use client";

import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/adminsidebar";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch notifications history
  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Send notification
  const handleSendNotification = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (res.ok) {
        setMessage("");
        fetchNotifications();
      }
    } catch (err) {
      console.error("Error sending notification:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete notification
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/notifications/${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchNotifications();
    } catch (err) {
      console.error("Failed to delete notification:", err);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>

        {/* Send Notification */}
        <div className="mb-6">
          <textarea
            className="w-full p-3 border rounded-lg mb-2"
            placeholder="Type your notification..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={handleSendNotification}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Notification"}
          </button>
        </div>

        {/* Notification History */}
        <div>
          <h3 className="text-xl font-semibold mb-2">History</h3>
          {notifications.length === 0 && <p>No notifications yet.</p>}
          <ul className="space-y-2">
            {notifications.map((notif) => (
              <li
                key={notif._id}
                className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
              >
                <span>{notif.message}</span>
                <button
                  onClick={() => handleDelete(notif._id)}
                  className="px-2 py-1 text-sm text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
