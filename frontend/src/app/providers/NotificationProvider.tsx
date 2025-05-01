"use client";

import axios from "axios";
import { useState, useEffect, createContext, useContext } from "react";
import { useUser } from "./UserProvider";
import { useCallback } from "react";

type NotificationType = {
  title: string;
  read: boolean;
  _id: string;
  createdAt: string;
};

type NotificationContextType = {
  notifications: NotificationType[];
  getNotification: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userId } = useUser();
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const getNotification = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/notification/${userId}`
      );
      setNotifications(response.data.data);
    } catch (error) {
      console.log("Error in NotificationProvider:", error);
    }
  }, [userId]);

  useEffect(() => {
    if (typeof window !== "undefined" && userId) {
      getNotification();
    }
  }, [getNotification, userId]);

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

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    console.warn("NotificationContext not available");
  }
  return context;
};
