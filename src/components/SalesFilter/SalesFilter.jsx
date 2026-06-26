import { TextField, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SalesFilter = ({ searchTerm, onSearchChange }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        placeholder="Search the register by item or date…"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "var(--ink-muted)" }} />
            </InputAdornment>
          ),
        }}
        sx={{
          maxWidth: 420,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "var(--surface)",
          },
        }}
      />
    </Box>
  );
};

export default SalesFilter;
