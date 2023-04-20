"use client";

import Button from "@mui/material/Button";
import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";
import { MuiIcons } from "@/config/menu";
import { toast } from "react-hot-toast";
import ListItemIcon from "@mui/material/ListItemIcon";

interface SignOutButtonProps {}
const SignOutButton = () => {
  const [isSignOut, setIsSignOut] = useState<boolean>(false);
  const DynamicIcon = MuiIcons["ExitToApp"];

  const handleSignOut = useCallback(async () => {
    // action
    setIsSignOut(true);
    try {
      await signOut();
    } catch (error) {
      toast.error("There was a problem signing out");
    } finally {
      setIsSignOut(false);
    }
  }, []);

  return (
    <Button onClick={handleSignOut}>
      <ListItemIcon
        sx={{
          minWidth: "fit-content",
        }}
      >
        <DynamicIcon />
      </ListItemIcon>
    </Button>
  );
};

export default SignOutButton;
