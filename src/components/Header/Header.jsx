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
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 16px",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "var(--serif)",
              fontWeight: 700,
              color: "var(--navy)",
              lineHeight: 1.2,
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
              fontSize: "0.68rem",
            }}
          >
            {firm.firm_code
              ? `Firm Code · ${firm.firm_code}`
              : "Daily Sales Ledger"}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {isMobile ? (
            <>
              <IconButton
                onClick={onAddSaleClick}
                sx={{
                  backgroundColor: "var(--navy)",
                  color: "#fbf8f1",
                  borderRadius: "2px",
                  "&:hover": { backgroundColor: "var(--navy-dark)" },
                }}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                onClick={handleLogout}
                sx={{ color: "var(--ink-soft)" }}
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
              >
                Add Sale
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
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
