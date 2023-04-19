"use-client";

import Box from "@mui/material/Box";
import { Toaster } from "react-hot-toast";

interface ProviderProps {
  children: React.ReactNode;
}
const Provider = ({ children }: ProviderProps) => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Box
        sx={{
          height: "100vh",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Provider;
