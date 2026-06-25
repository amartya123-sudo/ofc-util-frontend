import { TextField, Box, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const SalesFilter = ({ searchTerm, onSearchChange }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        placeholder="Search sales..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#999' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#1976d2',
            },
          },
        }}
      />
    </Box>
  )
}

export default SalesFilter
