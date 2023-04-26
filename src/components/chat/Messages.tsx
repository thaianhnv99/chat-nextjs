import { pusherClient } from "@/lib/pusher";
import { DateFormat, formatDate, toPusherKey } from "@/lib/utils";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface MessagesProps {
  sessionId: string;
  initialMessage: Message[];
  sessionImg: string;
  chatPartner: User;
  chatId: string;
}

const Messages = ({
  sessionId,
  initialMessage,
  sessionImg,
  chatPartner,
  chatId,
}: MessagesProps) => {
  const [messages, setMessages] = useState(initialMessage);

  const scrollDownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`chat:${chatId}`));

    const messagesHandle = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    pusherClient.bind("incoming_messages", messagesHandle);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`));
      pusherClient.unbind("incoming_messages", messagesHandle);
    };
  }, [chatId]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "0.5rem",
        flexDirection: "column",
        height: "100%",
        padding: "1rem",
      }}
    >
      {messages.map((message, index) => {
        const isCurrentUser = message.senderId === sessionId;
        const hasNextMessageFromSameUser =
          messages[index + 1]?.senderId === messages[index].senderId;

        return (
          <Box
            key={`${message.id}-${message.timestamp}`}
            sx={{
              width: "fit-content",
              display: "flex",
              gap: "0.5rem",
              alignItems: "flex-end",
              ...(isCurrentUser ? { marginLeft: "auto" } : null),
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "flex-end",
                padding: "0.3rem 1rem",
                borderRadius: "10px",
                backgroundColor: isCurrentUser ? "darkseagreen" : "gainsboro",
              }}
              order={2}
            >
              <Typography>{message.text}</Typography>
              <Typography
                variant="caption"
                color={(theme) => theme.color.gray50}
              >
                {formatDate(message.timestamp, DateFormat.HHmm)}
              </Typography>
            </Box>
            <Box
              order={isCurrentUser ? "2" : "1"}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                src={isCurrentUser ? sessionImg : chatPartner.image}
                alt={""}
                width={20}
                height={20}
                style={{
                  borderRadius: "50%",
                  visibility: hasNextMessageFromSameUser ? "hidden" : "visible",
                }}
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Messages;
