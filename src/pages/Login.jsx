import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Container,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { firmAPI } from "../services/api";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firm_code: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");
      const response = await firmAPI.login(data.firm_code);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);

        localStorage.setItem("firm", JSON.stringify(response.data.firm));
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        setError("Wrong Firm Code");
        toast.error("Wrong Firm Code");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at 50% 0%, #f7f1e6 0%, #ece2cf 100%)",
        padding: 3,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(31, 58, 95, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(31, 58, 95, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="xs">
        <Card
          sx={{
            padding: 5,
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--rule-strong)",
            boxShadow: "var(--shadow-elevated)",
            backgroundColor: "var(--surface)",
            position: "relative",
            overflow: "visible",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: "6px",
              border: "1px solid var(--rule)",
              borderRadius: "var(--radius)",
              pointerEvents: "none",
            },
            animation: "fadeIn 0.6s ease-out",
          }}
        >
          {/* Decorative seal */}
          <Box
            sx={{
              position: "absolute",
              top: -24,
              left: "50%",
              transform: "translateX(-50%)",
              width: 64,
              height: 64,
              backgroundColor: "var(--navy)",
              borderRadius: "50%",
              border: "4px solid var(--surface)",
              boxShadow: "var(--shadow-raised)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: "var(--serif)",
                fontWeight: 700,
                color: "#fbf8f1",
                fontSize: "28px",
              }}
            >
              S
            </Typography>
          </Box>

          <Box sx={{ textAlign: "center", mb: 4, mt: 2, position: "relative" }}>
            <Typography
              variant="overline"
              sx={{
                color: "var(--ink-muted)",
                letterSpacing: "3px",
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: "0.75rem",
              }}
            >
              Est. Ledger
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "var(--serif)",
                fontWeight: 700,
                color: "var(--ink)",
                mt: 1,
                mb: 1.5,
                fontSize: { xs: "1.75rem", sm: "2rem" },
              }}
            >
              Sales Register
            </Typography>
            <Box
              sx={{
                width: 64,
                height: "3px",
                backgroundColor: "var(--navy)",
                mx: "auto",
                mb: 2,
                borderRadius: "2px",
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: "var(--ink-muted)",
                lineHeight: 1.6,
                maxWidth: 320,
                mx: "auto",
              }}
            >
              Enter your firm code to access the books
            </Typography>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                borderRadius: "var(--radius)",
                border: "1px solid var(--danger)",
                backgroundColor: "var(--danger-soft)",
                animation: "fadeIn 0.3s ease-out",
              }}
            >
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="firm_code"
              control={control}
              rules={{
                required: "Firm Code is required",
                minLength: {
                  value: 1,
                  message: "Firm Code cannot be empty",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Firm Code"
                  placeholder="Enter your unique firm code"
                  variant="outlined"
                  disabled={loading}
                  error={!!errors.firm_code}
                  helperText={errors.firm_code?.message}
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "var(--radius-lg)",
                      transition: "all var(--transition-fast)",
                      "&:hover": {
                        boxShadow: "var(--shadow)",
                      },
                      "&.Mui-focused": {
                        boxShadow: "var(--shadow-raised)",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "var(--ink-muted)",
                      fontFamily: "var(--serif)",
                    },
                  }}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                fontWeight: 600,
                padding: "14px",
                letterSpacing: "0.8px",
                textTransform: "none",
                fontSize: "1rem",
                backgroundColor: "var(--navy)",
                borderRadius: "var(--radius-lg)",
                boxShadow: loading ? "none" : "var(--shadow-raised)",
                transition: "all var(--transition-fast)",
                "&:hover": {
                  backgroundColor: "var(--navy-dark)",
                  transform: loading ? "none" : "translateY(-2px)",
                  boxShadow: "var(--shadow-elevated)",
                },
                "&:disabled": {
                  opacity: 0.7,
                },
              }}
            >
              {loading ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <CircularProgress size={20} sx={{ color: "#fbf8f1" }} />
                  <span>Accessing...</span>
                </Box>
              ) : (
                "Enter the Register"
              )}
            </Button>
          </form>

          <Box
            sx={{
              mt: 4,
              textAlign: "center",
              position: "relative",
              pt: 3,
              borderTop: "1px solid var(--rule)",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "var(--ink-muted)",
                fontSize: "0.75rem",
                letterSpacing: "0.5px",
              }}
            >
              Secure • Private • Encrypted
            </Typography>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
