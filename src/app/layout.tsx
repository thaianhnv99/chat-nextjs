"use client";

import { theme } from "@/lib/theme";
import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Provider from "@/components/Provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider>{children}</Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
