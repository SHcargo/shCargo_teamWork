"use client";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { useNotification } from "../providers/NotificationProvider";
const NotifContent = () => {
  const { notifications } = useNotification()!;

  return (
    <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
      <DropdownMenuLabel>Notifications</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {notifications.map((notif, index) => (
        <DropdownMenuItem key={index}>
          <div className="flex flex-col">
            <p>{notif.title}</p>

            <span className="text-xs text-muted-foreground">
              {notif.createdAt}
            </span>
          </div>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
};

export default NotifContent;
