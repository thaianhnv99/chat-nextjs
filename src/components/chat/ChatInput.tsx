"use client";

import Box from "@mui/material/Box";
import TextareaAutosize from '@mui/base/TextareaAutosize';

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
        height: "300px",
      }}
    >
      <Box
        sx={{
          height: "150px",
          margin: "1rem",
          padding: "0.5rem",
          borderRadius: "5px",
          position: "relative",
          outline: "1px solid #e1e1e1",
          border: "1px solid transparent",
          ":focus-within": {
            border: "1px solid #939393",
          },
        }}
      >
        <TextareaAutosize
          ref={textareaRef}
          placeholder={`Message ${chatPartner.name}`}
          value={chatText}
          minRows={3}
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
            outline: "unset",
            width: "100%",
            height: "48px",
          }}
        />
        <Box
          sx={{
            width: '100%',
            height: "100%",
            position: "absolute",
            left: 0,
            top: 0,
          }}
          onClick={(e) => textareaRef.current?.focus()}
        ></Box>
      </Box>
    </Box>
  );
};

export default ChatInput;
