"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useCallback, useState } from "react";
import logoButton from "@/assets/icons/google.svg";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const loginWithGoogle = useCallback(async () => {
    setLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      toast.error("something");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Box
      sx={{
        width: "300px",
        maxWidth: "100%",
        margin: "auto",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Typography>Logo</Typography>
      <Typography variant="h4" fontWeight={"bold"}>
        Sign in to your account
      </Typography>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={loginWithGoogle}
      >
        <Image src={logoButton} alt={""} />
        <Typography ml={1}>Google</Typography>
      </Button>
    </Box>
  );
};
export default Page;
