"use client";

import { Box, Link, ListItemIcon, Typography, useTheme } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { chatHrefConstructor } from "@/lib/utils";

interface FriendsSidebarProps {
  sessionId: string;
  friends: User[];
}
const ChatListSidebarUI = ({ sessionId, friends }: FriendsSidebarProps) => {
  const theme = useTheme();
  const route = useRouter();
  const pathName = usePathname();

  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (pathName?.includes("chat")) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathName.includes(msg.senderId));
      });
    }
  }, [pathName]);

  return (
    <ul role="list">
      {friends?.map((friend, index) => {
        const unseenMessagesCount = unseenMessages.filter((unseenMsg) => {
          return unseenMsg.senderId === friend.id;
        }).length;
        return (
          <li key={friend.id + index}>
            <Link
              href={`/chat/${chatHrefConstructor(sessionId, friend.id)}`}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                textDecoration: "unset",
                color: theme.color.gray50,
                "&:hover": {
                  color: "#606060",
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Typography
                  sx={{
                    lineHeight: "48px",
                  }}
                >
                  {friend.name}
                  {unseenMessagesCount > 0 ? (
                    <Typography>{unseenMessagesCount}</Typography>
                  ) : null}
                </Typography>
              </Box>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default ChatListSidebarUI;
