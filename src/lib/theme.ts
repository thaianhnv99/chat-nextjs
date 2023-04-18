"use client";

import { createTheme } from "@mui/material/styles";
import { ThemeOptions as ThemeOptionsOld } from "@mui/material/styles/createTheme";

// Colors
const themeCustoms = {
  size: {
    menu: "256px",
  },
  color: {
    // Color Brand
    main: `#C2021C`,

    // Color System
    notification: "#0F62FE",
    success: "#198038",
    warning: "#FF832B",
    error: "#DA1E28",
    click: "#8A3FFC",
    gray: "#121619",

    // Define color

    // Main
    main44: "#B30017",

    // notification
    notification10: "#E6F3FF",
    notification20: "#B3D7FF",
    notification30: "#8ABEFF",

    // success
    success10: "#DEFBE6",
    success20: "#A7F0BA",
    success50: "#24A148",

    // warning

    // error
    error10: "#FFF1F0",
    error20: "#FFCCC7",
    error60: "#DA1E28",

    // click

    // gray
    gray10: "#F2F4F8",
    gray20: "#DDE1E6",
    gray30: "#C1C7CD",
    gray31: "#A2A9B0",
    gray50: "#878D96",
    gray60: "#697077",
    gray100: "#121619",

    // ===================== Background =====================
    bg: "#fff",
    bg2: "#191919",

    // ===================== Text =====================
    text: "#fff",

    // ===================== Border =====================

    // ===================== BoxShadow =====================
    boxShadow: "0px 16px 64px -11px rgba(31, 47, 70, 0.15)",
  },
  typography: {
    fontSize: 16,
    fontFamily: `'Roboto', sans-serif`,
    // Weight
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    // Size, lineHeight
    h1: {
      fontSize: 64,
      lineHeight: "72px",
    },
    h2: {
      fontSize: 48,
      lineHeight: "56px",
    },
    h3: {
      fontSize: 40,
      lineHeight: "48px",
    },
    h4: {
      fontSize: 32,
      lineHeight: "40px",
    },
    h5: {
      fontSize: 24,
      lineHeight: "32px",
    },
    h6: {
      fontSize: 20,
      lineHeight: "28px",
    },
    copy: {
      fontSize: 18,
      lineHeight: "26px",
    },
    body: {
      fontSize: 16,
      lineHeight: "24px",
    },
    label: {
      fontSize: 14,
      lineHeight: "22px",
    },
    caption: {
      fontSize: 12,
      lineHeight: "20px",
    },
    small: {
      fontSize: 10,
      lineHeight: "16px",
    },
  },
  // } as TypographyOptions | ((palette: Palette) => TypographyOptions),
};

// Override style Mui
const themeOptions: ThemeOptionsOld = {
  ...themeCustoms,
  // breakpoints
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1160,
      xl: 1536,
    },
  },
  //
  palette: {
    primary: {
      main: themeCustoms.color.main,
    },
    secondary: {
      main: themeCustoms.color.gray,
      dark: themeCustoms.color.gray
    },
    info: {
      main: themeCustoms.color.notification,
    },
    error: {
      main: themeCustoms.color.error,
    },
    warning: {
      main: themeCustoms.color.warning,
    },
    success: {
      main: themeCustoms.color.success,
    },
  },
  //
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          background: themeCustoms.color.bg,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: themeCustoms.color.notification,
          textDecorationColor: themeCustoms.color.notification,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        // body: {
        //   fontSize: '14px',
        //   lineHeight: LINE_HEIGHT,
        //   padding: 0,
        //   margin: 0,
        //   '& .MuiFormControlLabel-label.MuiTypography-root': {
        //     fontSize: '14px',
        //   },
        // },
        // a: {
        //   color: 'inherit',
        //   textDecoration: 'none',
        // },
        // '*': {
        //   boxSizing: 'border-box',
        // },
      },
    },
    MuiContainer: {
      defaultProps: {
        // fixed: false,
        disableGutters: true,
        maxWidth: "lg",
      },
      styleOverrides: {
        fixed: {
          maxWidth: "auto",
        },
        root: {
          // maxWidth: '1120px!important',
          // maxWidth: '1176px!important',
          // padding: '0 !important',
          // '@media (min-width: 900px)': {
          //   maxWidth: '600px',
          // },
          // '@media (min-width: 1200px)': {
          //   maxWidth: '900px',
          // },
          // '@media (min-width: 1536px)': {
          //   maxWidth: '1200px',
          // },
        },
      },
    },

    MuiButtonBase: {
      styleOverrides: {
        root: {
          // color: '#000!important',
          "&&&:hover": {
            // backgroundColor: 'transparent',
          },

          "&.Mui-disabled": {
            color: "#B1B5C3",
          },
        },
      },
    },

    MuiSkeleton: {
      defaultProps: {
        animation: "wave",
      },

      styleOverrides: {
        wave: {
          "&::after": {
            animation: "animation-wiooy9 1s linear 0s infinite",
          },
        },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: themeCustoms.color.main,
          "&&&:hover": {
            background: "none",
          },
          "&.Mui-checked": {
            color: themeCustoms.color.main,
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E6E8EC",
          },
          "&:hover": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E6E8EC",
            },
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E6E8EC",
            borderWidth: 1,
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        adornedStart: {},
        root: {
          // '&:before': {
          //   border: 'none !important',
          // },
          // '&:after': {
          //   border: 'none !important',
          // },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#fff",
          color: themeCustoms.color.bg2,
          boxShadow: "none",
          borderBottom: "1px solid",
          borderColor: themeCustoms.color.gray20,
          marginTop: "0px",
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        indicator: {
          // backgroundColor: themeColors.color.main,
        },
      },
    },

    MuiTab: {
      // styleOverrides: {
      //   root: {
      //     padding: 27,
      //     textTransform: 'unset',
      //     backgroundColor: '#fff',
      //     '&.Mui-selected': {
      //       color: '#1652f0',
      //     },
      //   },
      // },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          "& .MuiMenuItem-root": {
            // color: themeColors.color.text6,
            padding: "11px 16px",
            fontWeight: 500,
            "&:hover": {
              // backgroundColor: `${themeColors.color.hover} !important`,
            },
            "&.Mui-selected": {
              // backgroundColor: themeColors.color.hover,
            },
          },
        },
        rounded: {
          marginTop: "10px",
          borderRadius: "12px",
          boxShadow: themeCustoms.color.boxShadow,
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    },

    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: "72px !important",

          "@media (min-width: 900px)": {
            minHeight: "70px !important",
          },
        },
      },
    },

    MuiRadio: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          color: themeCustoms.color.main,

          "&+.MuiFormControlLabel-label": {
            fontWeight: 500,
            color: themeCustoms.color.gray100,
          },
          "&.Mui-checked+.MuiFormControlLabel-label": {
            color: themeCustoms.color.main,
          },
        },
      },
    },

    MuiBadge: {
      styleOverrides: {
        dot: {
          minWidth: "16px",
          height: "16px",
          borderRadius: "50%",
        },
      },
    },

    // MuiTypography: {
    //   styleOverrides: {
    //   },
    // },
  },
};

// Update for Typescript
type CustomTheme = {
  [Key in keyof typeof themeCustoms]: typeof themeCustoms[Key];
};
declare module "@mui/material/styles/createTheme" {
  interface Theme extends CustomTheme {}

  interface ThemeOptions extends CustomTheme {}
}

export type TypeTypography = keyof typeof themeCustoms.typography;

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body1: false;
    body2: false;
    button: false;
    overline: false;
    subtitle1: false;
    subtitle2: false;
    //
    copy: true;
    body: true;
    label: true;
    small: true;
  }
}

// Create theme
export const theme = createTheme({ ...themeCustoms, ...themeOptions });
