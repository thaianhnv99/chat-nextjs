import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";

interface MessagesProps {
  sessionId: string;
  initialMessage: Message[];
}

const Messages = ({ sessionId, initialMessage }: MessagesProps) => {
  const [messages, setMessages] = useState(initialMessage);

  const scrollDownRef = useRef<HTMLDivElement | null>(null);

  return (
    <Box>
      {messages.map((message, index) => {
        const isCurrentUser = message.senderId === sessionId;

        const hasNextMessageFromSameUser =
          messages[index - 1]?.senderId === messages[index].senderId;

        return (
          <Box key={`${message.id}-${message.timestamp}`}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>{message.text}</Typography>
              <Typography>{message.timestamp}</Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Messages;
