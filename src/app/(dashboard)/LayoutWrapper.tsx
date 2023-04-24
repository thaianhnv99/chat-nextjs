"use client";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import messengerIcon from "@/assets/icons/send.svg";
import Image from "next/image";
import { Typography, useTheme } from "@mui/material";
import { MuiIcons, sideBarOption } from "@/config/menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Session } from "next-auth";
import SignOutButton from "@/components/SignOutButton";
import FriendRequestSidebar from "@/components/FriendRequestSidebarUI";
import ChatListSidebarUI from "@/components/ChatListSideBarUI";

interface LayoutWrapperProps {
  session: Session;
  unseenRequestCount: number;
  friends: User[];
  children: React.ReactNode;
}

const LayoutWrapper = ({
  session,
  unseenRequestCount,
  friends,
  children,
}: LayoutWrapperProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
      }}
    >
      <Box
        sx={{
          minWidth: "400px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          borderRight: "1px solid " + theme.color.gray30,
        }}
      >
        <Box
          sx={{
            marginLeft: "1.5rem",
            marginTop: "1.5rem",
            display: "flex",
            flexShrink: 0,
          }}
        >
          <Link href="/dashboard">
            <Image
              src={messengerIcon}
              alt={""}
              width={30}
              height={30}
              style={{
                transform: "rotate(45deg)",
                backgroundColor: "aquamarine",
              }}
            ></Image>
          </Link>
        </Box>
        <Box
          sx={{
            marginTop: "1.5rem",
            marginLeft: "1.5rem",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            ul: {
              display: "flex",
              flexDirection: "column",
              height: "100%",
              li: {
                listStyleType: "none",
                lineHeight: "48px",
              },
            },
          }}
        >
          {friends.length > 0 && (
            <Typography
              variant="label"
              color={theme.color.gray50}
              lineHeight="48px"
            >
              Your chats
            </Typography>
          )}
          <nav
            style={{
              flex: 1,
            }}
          >
            <ul role="list">
              <li>
                <ChatListSidebarUI
                  sessionId={session.user.id}
                  friends={friends}
                />
              </li>
              <li>
                <Typography
                  variant="label"
                  color={theme.color.gray50}
                  lineHeight="48px"
                >
                  Overview
                </Typography>
                <ul>
                  {sideBarOption.map((item) => {
                    const DynamicIcon = MuiIcons[item.icon];
                    return (
                      <li key={item.id}>
                        <Link
                          href={item.href}
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
                            <DynamicIcon fontSize="medium" />
                          </ListItemIcon>
                          <Typography
                            sx={{
                              lineHeight: "48px",
                            }}
                          >
                            {item.name}
                          </Typography>
                        </Link>
                      </li>
                    );
                  })}
                  <li>
                    <FriendRequestSidebar
                      sessionId={session.user.id}
                      initialUnseenRequestCount={+unseenRequestCount}
                    />
                  </li>
                </ul>
              </li>
              <li
                style={{
                  marginTop: "auto",
                  marginBottom: "1rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <Image
                      width={50}
                      height={50}
                      style={{
                        borderRadius: "50%",
                      }}
                      referrerPolicy="no-referrer"
                      src={session?.user.image || ""}
                      alt={"your image profile"}
                    />
                    <Box
                      sx={{
                        overflow: "auto",
                        "& .MuiTypography-root": {
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        },
                      }}
                    >
                      <Typography fontWeight="bold">
                        {session.user.name}
                      </Typography>
                      <Typography color={theme.color.gray50}>
                        {session.user.email}
                      </Typography>
                    </Box>
                  </Box>
                  <SignOutButton />
                </Box>
              </li>
            </ul>
          </nav>
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export default LayoutWrapper;
