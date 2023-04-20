import { Typography } from "@mui/material";
import { useState } from "react";

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[];
}
const FriendRequests = ({ incomingFriendRequests }: FriendRequestsProps) => {
  const [friendRequest, setFriendRequest] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  );
  return (
    <>
      {friendRequest.length === 0 ? (
        <Typography>Nothing to show here</Typography>
      ) : (
        <></>
      )}
    </>
  );
};

export default FriendRequests;
