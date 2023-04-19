"use client";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import messengerIcon from "@/assets/icons/send.svg";
import Image from "next/image";
import { Typography, useTheme } from "@mui/material";
import { MuiIcons, sideBarOption } from "@/config/menu";
import ListItemIcon from "@mui/material/ListItemIcon";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
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
          width: "300px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          borderRight: "1px solid " + theme.color.gray30,
        }}
      >
        <Box
          sx={{
            margin: "1rem",
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
              }}
            ></Image>
          </Link>
        </Box>
        <Box
          sx={{
            marginTop: "1.5rem",
            marginLeft: "1rem",
            ul: {
              display: "flex",
              flexDirection: "column",
              // gap: "1rem",
              li: {
                listStyleType: "none",
                lineHeight: "48px",
              },
            },
          }}
        >
          <Typography
            variant="label"
            color={theme.color.gray50}
            lineHeight="48px"
          >
            Your chats
          </Typography>
          <nav>
            <ul role="list">
              <li>Test</li>
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
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: "fit-content",
                            }}
                          >
                            <DynamicIcon fontSize="small" />
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
                </ul>
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
