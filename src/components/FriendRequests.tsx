"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import axios from "axios";
import { useRouter } from "next/navigation";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[];
  sessionId: string;
}
const FriendRequests = ({
  incomingFriendRequests,
  sessionId,
}: FriendRequestsProps) => {
  const [friendRequest, setFriendRequest] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  );
  const route = useRouter();

  useEffect(() => {
    const friendRequestHandle = ({
      senderId,
      senderEmail,
    }: IncomingFriendRequest) => {
      setFriendRequest((prev) => [...prev, { senderId, senderEmail }]);
    };

    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`)
    );

    pusherClient.bind("friend_requests", friendRequestHandle);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`)
      );
      pusherClient.unbind("friend_requests", friendRequestHandle);
    };
  }, [sessionId]);

  const acceptFriend = async (senderId: string) => {
    await axios.post("/api/friends/accept", { id: senderId });
    setFriendRequest((prev) => prev.filter((i) => i.senderId !== senderId));
    route.refresh();
  };

  const denyFriend = async (senderId: string) => {
    await axios.post("/api/friends/deny", { id: senderId });
    setFriendRequest((prev) => prev.filter((i) => i.senderId !== senderId));
    route.refresh();
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "1rem",
      }}
    >
      <Typography variant="h3" fontWeight="bold" mt={1}>
        Add a friend
      </Typography>
      <Box mt={1}>
        {friendRequest.length === 0 ? (
          <Typography color={(theme) => theme.color.gray50}>
            Nothing to show here...
          </Typography>
        ) : (
          friendRequest.map((item) => {
            return (
              <Box
                key={item.senderId}
                sx={{
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <Typography>{item.senderEmail}</Typography>
                <CheckCircleRoundedIcon
                  color="success"
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => acceptFriend(item.senderId)}
                />
                <CancelRoundedIcon
                  color="error"
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => denyFriend(item.senderId)}
                />
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default FriendRequests;
