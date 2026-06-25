import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'

const Header = ({ onAddSaleClick }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()
  const firm = JSON.parse(localStorage.getItem('firm') || '{}')

  const handleLogout = () => {
    localStorage.removeItem('firm')
    navigate('/login')
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#fff', color: '#333' }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px',
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2' }}>
            {firm.name || 'Sales Reporting System'}
          </Typography>
          <Typography variant="caption" sx={{ color: '#666' }}>
            {firm.firm_code && `Firm Code: ${firm.firm_code}`}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {isMobile ? (
            <>
              <IconButton
                color="primary"
                onClick={onAddSaleClick}
                sx={{ backgroundColor: '#1976d2', color: '#fff' }}
              >
                <AddIcon />
              </IconButton>
              <IconButton color="primary" onClick={handleLogout}>
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
  )
}

export default Header
