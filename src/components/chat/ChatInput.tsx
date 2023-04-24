"use client";

import { TextareaAutosize } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useMemo, useRef, useState } from "react";

interface ChatInputProps {
  chatPartner: User;
}
const ChatInput = ({ chatPartner }: ChatInputProps) => {
  const [chatText, setChatText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const sendMessage = () => {
    console.log("chatText");
  };
  return (
    <Box
      mt="auto"
      sx={{
        width: "100%",
      }}
    >
      <TextareaAutosize
        ref={textareaRef}
        placeholder={`Message ${chatPartner.name}`}
        value={chatText}
        maxRows={5}
        onChange={(e) => setChatText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
        style={{
          backgroundColor: "transparent",
          resize: "none",
          color: "black",
          border: "none",
        }}
      />
      <Box onClick={(e) => textareaRef.current?.focus()}></Box>
    </Box>
  );
};

export default ChatInput;
