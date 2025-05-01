"use client";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useUser } from "../providers/UserProvider";
import { useState, useEffect } from "react";
import { formatTime } from "@/utils/formatedTime";
const NotifContent = () => {
  const { phoneNumber, name } = useUser();
  const [loginTime, setLoginTime] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLoginTime = localStorage.getItem("loginTime");
      setLoginTime(storedLoginTime);
    }
  }, []);

  const notifications = phoneNumber
    ? [
        {
          text: `Та амжилттай нэвтэрлээ , ${name}`,
          time: formatTime(loginTime),
        },
        {
          text: `Та амжилттай бүртгүүллээ, ${name}`,
          time: formatTime(loginTime),
        },
      ]
    : [{ text: "Та нэвтэрнэ үү", time: "" }];

  return (
    <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
      <DropdownMenuLabel>Notifications</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {notifications.map((notif, index) => (
        <DropdownMenuItem key={index}>
          <div className="flex flex-col">
            <p>{notif.text}</p>
            {notif.time && (
              <span className="text-xs text-muted-foreground">
                {notif.time}
              </span>
            )}
          </div>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
};

export default NotifContent;
