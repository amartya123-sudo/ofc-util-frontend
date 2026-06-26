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
        padding: 2,
      }}
    >
      <Container maxWidth="xs">
        <Card
          sx={{
            padding: 4,
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--rule-strong)",
            boxShadow: "0 10px 40px rgba(42, 38, 32, 0.14)",
            backgroundColor: "var(--surface)",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: "8px",
              border: "1px solid var(--rule)",
              borderRadius: "2px",
              pointerEvents: "none",
            },
          }}
        >
          <Box sx={{ textAlign: "center", mb: 3, position: "relative" }}>
            <Typography
              variant="overline"
              sx={{
                color: "var(--ink-muted)",
                letterSpacing: "3px",
                fontWeight: 600,
              }}
            >
              Est. Ledger
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "var(--serif)",
                fontWeight: 700,
                color: "var(--ink)",
                mt: 0.5,
                mb: 1,
              }}
            >
              Sales Register
            </Typography>
            <Box
              sx={{
                width: 56,
                height: "2px",
                backgroundColor: "var(--navy)",
                mx: "auto",
                mb: 1.5,
              }}
            />
            <Typography variant="body2" sx={{ color: "var(--ink-muted)" }}>
              Enter your firm code to open the books
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
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
                  placeholder="Enter Firm Code"
                  variant="outlined"
                  disabled={loading}
                  error={!!errors.firm_code}
                  helperText={errors.firm_code?.message}
                  sx={{ mb: 3 }}
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
                padding: "11px",
                letterSpacing: "0.5px",
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Enter the Register"}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: "center", position: "relative" }}>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
