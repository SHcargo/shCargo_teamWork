"use client";

import axios from "axios";
import { useState, useEffect, createContext, useContext } from "react";
import { useUser } from "./UserProvider";

// Create context
const NotificationContext = createContext(null);

// Provider component
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const userId = useUser();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNotification = async () => {
    try {
      const response = await axios.get(`/notification/${userId}`);
      setNotifications(response);
    } catch (error) {
      console.log("error in notification provider:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      getNotification();
    }
  }, []);

  console.log(notifications);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        getNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    console.warn("NotificationContext not available");
  }
  return context;
};
