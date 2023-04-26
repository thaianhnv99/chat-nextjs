"use client";

import { Box, Link, ListItemIcon, Typography, useTheme } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface FriendRequestSidebarProps {
  sessionId: string;
  initialUnseenRequestCount: number;
}
const FriendRequestSidebar = ({
  sessionId,
  initialUnseenRequestCount,
}: FriendRequestSidebarProps) => {
  const [unseenRequestCount, setUnseenRequestCount] = useState<number>(
    initialUnseenRequestCount
  );
  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    setUnseenRequestCount(initialUnseenRequestCount);
  }, [initialUnseenRequestCount]);

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`)
    );

    const friendRequestHandle = () => {
      setUnseenRequestCount((prev) => prev + 1);
      router.refresh();
    };

    pusherClient.bind("friend_requests", friendRequestHandle);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`)
      );
      pusherClient.unbind("friend_requests", friendRequestHandle);
    };
  }, [router, sessionId]);
  return (
    <Link
      href={"/dashboard/requests"}
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
      <ListItemIcon
        sx={{
          minWidth: "fit-content",
        }}
      >
        <PermIdentityIcon fontSize="medium" />
      </ListItemIcon>
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
          Friend request
        </Typography>
        <Typography
          variant="caption"
          sx={{
            width: "20px",
            textAlign: "center",
            position: "absolute",
            top: "5px",
            right: "-12px",
            backgroundColor: "aquamarine",
            borderRadius: "50%",
          }}
        >
          {unseenRequestCount ? unseenRequestCount : null}
        </Typography>
      </Box>
    </Link>
  );
};

export default FriendRequestSidebar;
