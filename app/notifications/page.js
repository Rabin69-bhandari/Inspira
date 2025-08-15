"use client";

import React, { useEffect, useState } from "react";
import { FiBell, FiClock, FiCheckCircle, FiAlertCircle, FiInfo } from "react-icons/fi";
import Sidebar from "../components/sidebar";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  // Fetch notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notifications");
        if (!res.ok) throw new Error("Failed to fetch notifications");
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const filteredNotifications = notifications.filter(notif => {
    if (filter === "all") return true;
    if (filter === "read") return notif.read;
    if (filter === "unread") return !notif.read;
    return true;
  });

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif._id === id ? { ...notif, read: true } : notif
    ));
  };

  if (loading) return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-center">
        <FiAlertCircle className="text-red-500 mr-3 text-xl" />
        <div>
          <h3 className="font-medium text-red-800">Error loading notifications</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex">

    <Sidebar />
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <FiBell className="text-indigo-600 text-2xl mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        </div>
        
        {/* Filter */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 text-sm rounded-full ${filter === "all" ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-3 py-1 text-sm rounded-full ${filter === "unread" ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`px-3 py-1 text-sm rounded-full ${filter === "read" ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}
          >
            Read
          </button>
        </div>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
          <FiBell className="mx-auto text-gray-400 text-4xl mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            {filter === "all" ? "No notifications yet" : 
             filter === "read" ? "No read notifications" : "No unread notifications"}
          </h3>
          <p className="mt-2 text-gray-600">
            {filter === "all" ? "You'll see notifications here when you receive them" : 
             "Mark notifications as read to see them here"}
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filteredNotifications.map((notif) => (
            <li
              key={notif._id}
              className={`p-4 rounded-xl transition-all duration-200 ${notif.read ? 'bg-white' : 'bg-indigo-50 border-l-4 border-indigo-500'} shadow-sm hover:shadow-md`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <div className={`p-2 rounded-lg mr-3 ${notif.read ? 'bg-gray-100 text-gray-500' : 'bg-indigo-100 text-indigo-500'}`}>
                    {notif.type === 'alert' ? <FiAlertCircle /> : <FiInfo />}
                  </div>
                  <div>
                    <p className={`font-medium ${notif.read ? 'text-gray-600' : 'text-gray-900'}`}>{notif.message}</p>
                    <p className="text-sm text-gray-500 mt-1 flex items-center">
                      <FiClock className="mr-1" />
                      {new Date(notif.createdAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                {!notif.read && (
                  <button 
                    onClick={() => markAsRead(notif._id)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
                  >
                    <FiCheckCircle className="mr-1" /> Mark as read
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default NotificationsPage;