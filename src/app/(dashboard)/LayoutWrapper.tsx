"use client";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import messengerIcon from "@/assets/icons/messenger.svg";
import Image from "next/image";

interface LayoutWrapperProps {
  children: React.ReactNode;
}
const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
      }}
    >
      <Link
        sx={{
          width: "300px",
          height: "100%",
          overflow: "auto",
          borderRight: (theme) => "1px solid " + theme.color.gray30,
        }}
      >
        <Image src={messengerIcon} alt={""} width={20} height={20}></Image>
      </Link>
      {children}
    </Box>
  );
};

export default LayoutWrapper;
