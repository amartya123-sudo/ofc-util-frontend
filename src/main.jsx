import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// "Classic ledger / paper" palette
const ink = "#2a2620";
const inkSoft = "#4d4639";
const inkMuted = "#877c67";
const paper = "#f3ede1";
const surface = "#fbf8f1";
const navy = "#1f3a5f";
const navyDark = "#15293f";
const rule = "#ddd2bd";
const ruleStrong = "#c8baa0";

const serif = "'Libre Baskerville', Georgia, 'Times New Roman', serif";
const sans =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const heading = (fontSize, letterSpacing = "0.2px") => ({
  fontFamily: serif,
  fontWeight: 700,
  color: ink,
  fontSize,
  letterSpacing,
});

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: navy,
      dark: navyDark,
      contrastText: "#fbf8f1",
    },
    secondary: {
      main: "#8a3a30",
    },
    success: { main: "#3c6448" },
    error: { main: "#8a3a30" },
    background: {
      default: paper,
      paper: surface,
    },
    text: {
      primary: ink,
      secondary: inkSoft,
    },
    divider: rule,
  },
  typography: {
    fontFamily: sans,
    h1: heading("2.4rem"),
    h2: heading("1.9rem"),
    h3: heading("1.55rem"),
    h4: heading("1.3rem"),
    h5: heading("1.1rem"),
    h6: heading("1rem"),
    subtitle1: { color: inkSoft },
    subtitle2: { color: inkSoft, fontWeight: 600 },
    body2: { color: inkSoft },
    button: {
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: "0.3px",
    },
    caption: { color: inkMuted },
  },
  shape: {
    borderRadius: 3,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: surface,
          border: `1px solid ${rule}`,
          boxShadow: "none",
        },
        elevation0: { border: "none" },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundColor: surface,
          color: ink,
          borderBottom: `1px solid ${ruleStrong}`,
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 2,
          paddingInline: 18,
        },
        contained: {
          boxShadow: "none",
          "&:hover": { boxShadow: "none", backgroundColor: navyDark },
        },
        outlined: {
          borderColor: ruleStrong,
          color: navy,
          "&:hover": {
            borderColor: navy,
            backgroundColor: "rgba(31, 58, 95, 0.05)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#fffdf8",
          borderRadius: 2,
          "& fieldset": { borderColor: rule },
          "&:hover fieldset": { borderColor: ruleStrong },
          "&.Mui-focused fieldset": { borderColor: navy, borderWidth: 1 },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { color: inkMuted, "&.Mui-focused": { color: navy } },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: rule,
          fontSize: "0.9rem",
        },
        head: {
          fontFamily: serif,
          fontWeight: 700,
          color: ink,
          backgroundColor: "#efe7d7",
          letterSpacing: "0.3px",
          textTransform: "uppercase",
          fontSize: "0.74rem",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border: `1px solid ${ruleStrong}`,
          boxShadow: "0 18px 50px rgba(42, 38, 32, 0.28)",
          backgroundColor: surface,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: serif,
          fontWeight: 700,
          borderBottom: `1px solid ${rule}`,
          paddingBottom: 14,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 2, border: `1px solid ${rule}` },
      },
    },
    MuiCircularProgress: {
      styleOverrides: { root: { color: navy } },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
