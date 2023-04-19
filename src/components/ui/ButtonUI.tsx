import React from "react";
import { Box, Button, SxProps, Theme, useTheme } from "@mui/material";
import { ButtonProps } from "@mui/material/Button";
import iconLoading from "src/assets/icons/loading.svg";
import { TypeTypography } from "@/lib/theme";
import Image from "next/image";

interface ButtonUIProps extends Omit<ButtonProps, "color" | "size"> {
  boxShadow?: boolean;
  loading?: boolean;
  size?: "s" | "m" | "l" | "xl";
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | "blue"
    | "violet"
    | "transparent"
    | "white"
    | "gray"
    | "gray2"
    | "gray4"
    | "gray6"
    | "gray7"
    | "gray30"
    | "staking";
  needSign?: boolean;
  isTransaction?: boolean;
}

export const ButtonUI = React.forwardRef(function ButtonUI(
  {
    sx,
    variant = "contained",
    color = "primary",
    size = "m",
    children,
    boxShadow: hasBoxShadow,
    loading = false,
    disabled = false,
    needSign = false,
    isTransaction = false,
    ...props
  }: ButtonUIProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const theme = useTheme<Theme>();

  const funcStyle = ({
    bg,
    bgOutlined,
    color,
    colorOutlined,
    border,
    borderOutlined,
    boxShadow,
    bgHover,
    colorHover,
    borderHover,
  }: {
    bg: string;
    bgOutlined?: string;
    color: string;
    colorOutlined: string;
    border: string;
    borderOutlined: string;
    boxShadow: string;
    bgHover?: string;
    colorHover?: string;
    borderHover?: string;
  }) => {
    boxShadow = hasBoxShadow ? `0px 5px 15px ${boxShadow}66` : "none";

    return {
      // ------ Style 'contained'
      contained: {
        backgroundColor: bg,
        color,
        border: 2,
        borderColor: "transparent",
        boxShadow,
        "&&&:hover": {
          backgroundColor: bgHover ?? theme.color.main44,
          borderColor: colorHover ?? theme.color.main44,
          color: colorHover ?? theme.color.text,
        },
        "&:active": {
          boxShadow: "none",
          borderColor: border,
        },
        // '&:focus': {
        //   boxShadow: (theme: Theme) => theme.color.boxShadow3,
        // },
        "&&&:disabled": loading
          ? {
              color,
            }
          : {
              backgroundColor: theme.color.gray10,
              borderColor: theme.color.gray10,
              color: theme.color.gray100,
              boxShadow: "none",
            },
      },
      // ------ Style 'outlined'
      outlined: {
        backgroundColor: bgOutlined ?? theme.color.bg,
        border: 2,
        borderColor: borderOutlined,
        color: colorOutlined,
        boxShadow,
        "&&&:hover": {
          backgroundColor: bgHover ?? theme.color.main44,
          borderColor: borderHover ?? theme.color.main44,
          color: colorHover ?? theme.color.text,
        },
        "&&&:disabled": loading
          ? {
              backgroundColor: theme.color.gray30,
              borderColor: theme.color.gray30,
            }
          : {
              backgroundColor: theme.color.bg,
              borderColor: theme.color.gray20,
              color: theme.color.gray30,
              boxShadow: "none",
            },
      },
      // ------ Style 'text'
      text: {},
    };
  };

  // Override style
  const style: { [Key in typeof color]: any } = {
    primary: funcStyle({
      bg: theme.color.main,
      color: theme.color.text,
      colorOutlined: theme.color.main,
      border: theme.color.main,
      borderOutlined: theme.color.main,
      boxShadow: theme.color.main,
    }),
    secondary: {},
    blue: {},
    violet: {},
    transparent: funcStyle({
      bg: "transparent",
      bgOutlined: "transparent",
      color: theme.color.gray20,
      colorOutlined: theme.color.gray20,
      border: theme.color.main,
      borderOutlined: "rgba(255, 255, 255, 0.15)",
      boxShadow: theme.color.main,
    }),
    white: funcStyle({
      bg: "#fff",
      bgOutlined: "#fff",
      bgHover: theme.color.gray20,
      borderHover: theme.color.gray20,
      color: theme.color.gray20,
      colorOutlined: theme.color.gray60,
      colorHover: theme.color.gray60,
      border: "unset",
      borderOutlined: theme.color.gray20,
      boxShadow: theme.color.gray30,
    }),
    gray: funcStyle({
      bg: "rgba(255,255,255,0.1)",
      // bgOutlined: 'transparent',
      color: theme.color.gray20,
      colorOutlined: theme.color.gray20,
      border: theme.color.main,
      borderOutlined: "rgba(255, 255, 255, 0.15)",
      boxShadow: theme.color.main,
    }),
    gray30: funcStyle({
      bg: theme.color.gray30,
      // bgOutlined: 'transparent',
      color: theme.color.gray30,
      colorOutlined: theme.color.gray30,
      border: theme.color.gray30,
      colorHover: theme.color.gray31,
      bgHover: theme.color.gray31,
      borderHover: theme.color.gray30,
      borderOutlined: "rgba(255, 255, 255, 0.15)",
      boxShadow: theme.color.main,
    }),
    gray2: {},
    gray4: {},
    gray6: {},
    gray7: {},
    error: {},
    info: {},
    inherit: {},
    success: {},
    warning: {},
    staking: {},
  };

  // Style by size
  const stylesSize: { [Key in typeof size]: SxProps } = {
    s: {
      padding: "3px 10px",
      typography: "label" as TypeTypography,
    },
    m: {
      padding: "8px 16px",
      typography: "label" as TypeTypography,
    },
    l: {
      padding: "10px 22px",
      typography: "body" as TypeTypography,
    },
    xl: { typography: "body" as TypeTypography, padding: "14px 24px" },
  };

  // Style for loading
  const styleLoading: SxProps = loading
    ? {
        opacity: 0.65,
      }
    : {};

  const IconLoading = loading && (
    <Box
      sx={{
        // animation: 'loading 2s infinite linear',
        width: "20px",
        height: "20px",
        mr: "10px",

        "@keyframes loading": {
          from: {
            transform: "rotate(359deg)",
          },
          to: {
            transform: "rotate(0deg)",
          },
        },
      }}
    >
      <Image src={iconLoading} alt="" height={20} width={20} />
    </Box>
  );

  return (
    <Button
      ref={ref}
      sx={{
        // ------ Style common
        textTransform: "none",
        border: "0px solid",
        // borderRadius: "90px",
        fontWeight: "medium",
        // ------ Style by `variant`
        ...style[color][variant],
        // ------ Style by `size`
        ...stylesSize[size],
        // ------ Style by `loading`
        ...styleLoading,
        // ------ Style by `props`
        ...sx,
      }}
      disabled={disabled || loading}
      {...props}
    >
      {IconLoading}
      {children}
    </Button>
  );
});
