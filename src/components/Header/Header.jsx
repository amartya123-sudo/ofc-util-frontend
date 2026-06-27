import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const Header = ({ onAddSaleClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const firm = JSON.parse(localStorage.getItem("firm") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("firm");
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "var(--surface)",
        color: "var(--ink)",
        borderBottom: "2px solid var(--navy)",
        boxShadow: "var(--shadow-elevated)",
        transition: "all var(--transition-base)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 24px",
          minHeight: "72px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: "42px",
              height: "42px",
              backgroundColor: "var(--navy)",
              borderRadius: "var(--radius)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "var(--shadow)",
            }}
          >
            <Typography
              sx={{
                fontFamily: "var(--serif)",
                fontWeight: 700,
                color: "#fbf8f1",
                fontSize: "20px",
              }}
            >
              S
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "var(--serif)",
                fontWeight: 700,
                color: "var(--navy)",
                lineHeight: 1.2,
                fontSize: "1.35rem",
              }}
            >
              {firm.name || "Sales Register"}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "var(--ink-muted)",
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontSize: "0.65rem",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              {firm.firm_code && (
                <Box
                  sx={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: "var(--navy)",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                />
              )}
              {firm.firm_code
                ? `Firm Code · ${firm.firm_code}`
                : "Daily Sales Ledger"}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          {isMobile ? (
            <>
              <IconButton
                onClick={onAddSaleClick}
                sx={{
                  backgroundColor: "var(--navy)",
                  color: "#fbf8f1",
                  borderRadius: "var(--radius)",
                  "&:hover": { 
                    backgroundColor: "var(--navy-dark)",
                    transform: "translateY(-2px)",
                    boxShadow: "var(--shadow-raised)",
                  },
                  transition: "all var(--transition-fast)",
                }}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                onClick={handleLogout}
                sx={{ 
                  color: "var(--ink-soft)",
                  "&:hover": { 
                    color: "var(--danger)",
                    backgroundColor: "var(--danger-soft)",
                  },
                  transition: "all var(--transition-fast)",
                }}
              >
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={onAddSaleClick}
                sx={{
                  backgroundColor: "var(--navy)",
                  "&:hover": {
                    backgroundColor: "var(--navy-dark)",
                    transform: "translateY(-2px)",
                    boxShadow: "var(--shadow-raised)",
                  },
                  transition: "all var(--transition-fast)",
                  borderRadius: "var(--radius)",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 2,
                }}
              >
                Add Sale
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{
                  color: "var(--ink-soft)",
                  borderColor: "var(--rule-strong)",
                  "&:hover": {
                    color: "var(--danger)",
                    borderColor: "var(--danger)",
                    backgroundColor: "var(--danger-soft)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all var(--transition-fast)",
                  borderRadius: "var(--radius)",
                  textTransform: "none",
                  fontWeight: 600,
                  px: 2,
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
