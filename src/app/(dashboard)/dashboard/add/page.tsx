"use client";

import Box from "@mui/material/Box";
import AddFriendButton from "@/components/AddFriendButton";

interface PageProps {}

const Page = ({}: PageProps) => {
  return (
    <Box
      sx={{
        padding: "1rem",
      }}
      width="100%"
    >
      <AddFriendButton />
    </Box>
  );
};

export default Page;
