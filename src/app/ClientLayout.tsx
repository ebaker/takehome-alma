"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1d1d1d",
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          display: "none",
        },
      },
    },
    MuiFormGroup: {
      styleOverrides: {
        root: {
          flexDirection: "column",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#bcbcbc",
        },
      },
    },
  },
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
