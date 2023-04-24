"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useTheme } from "@mui/material";
import { Session } from "next-auth";
import Messages from "./Messages";
import ChatInput from "./ChatInput";

interface ChatBoxProps {
  session: Session;
  chatPartner: User;
  messages: Message[];
}
const ChatBox = ({ session, chatPartner, messages }: ChatBoxProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "0.5rem",
          paddingLeft: "1rem",
          borderBottom: "1px solid #C1C7CD",
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
            src={chatPartner.image || ""}
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
            <Typography fontWeight="bold">{chatPartner.name}</Typography>
            <Typography color={theme.color.gray50}>
              {chatPartner.email}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Messages sessionId={session.user.id} initialMessage={messages} />
      <ChatInput chatPartner={chatPartner} />
    </Box>
  );
};

export default ChatBox;
