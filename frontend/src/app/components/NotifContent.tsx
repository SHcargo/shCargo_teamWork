"use client";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { useNotification } from "../providers/NotificationProvider";
import { formatTime } from "@/utils/formatedTime";
const NotifContent = () => {
  const { notifications } = useNotification()!;
  console.log(notifications);

  return (
    <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
      <DropdownMenuLabel>Notifications</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {[...notifications].reverse().map((notif, index) => (
        <DropdownMenuItem key={index}>
          <div className="flex flex-col cursor-pointer">
            <p>{notif.title}</p>
            <span className="text-xs text-muted-foreground">
              {formatTime(notif.createdAt)}
            </span>
          </div>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
};

export default NotifContent;
