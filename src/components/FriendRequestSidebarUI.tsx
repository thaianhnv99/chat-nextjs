"use client";

import { Box, Link, ListItemIcon, Typography, useTheme } from "@mui/material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

interface FriendRequestSidebarProps {
  sessionId: string;
  initialUnseenRequestCount: number;
}
const FriendRequestSidebar = ({
  sessionId,
  initialUnseenRequestCount,
}: FriendRequestSidebarProps) => {
  const theme = useTheme();
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
          {initialUnseenRequestCount ? initialUnseenRequestCount : null}
        </Typography>
      </Box>
    </Link>
  );
};

export default FriendRequestSidebar;
