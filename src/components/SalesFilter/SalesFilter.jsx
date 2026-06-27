import { TextField, Box, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SalesFilter = ({ searchTerm, onSearchChange }) => {
  return (
    <Box 
      sx={{ 
        mb: 3,
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <TextField
        fullWidth
        placeholder="Search the register by item or date…"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        variant="outlined"
        size="medium"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "var(--ink-muted)" }} />
            </InputAdornment>
          ),
          sx: {
            borderRadius: "var(--radius-lg)",
            transition: "all var(--transition-fast)",
          }
        }}
        sx={{
          maxWidth: 480,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "var(--surface)",
            "&:hover": {
              backgroundColor: "var(--paper)",
            },
            "&.Mui-focused": {
              boxShadow: "var(--shadow-raised)",
            },
          },
        }}
      />
      <Box
        sx={{
          px: 2,
          py: 1,
          backgroundColor: "var(--navy-soft)",
          borderRadius: "var(--radius)",
          border: "1px solid var(--rule)",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            backgroundColor: "var(--success)",
            borderRadius: "50%",
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color: "var(--ink-soft)",
            fontFamily: "var(--serif)",
            fontWeight: 600,
          }}
        >
          Live Search
        </Typography>
      </Box>
    </Box>
  );
};

export default SalesFilter;
