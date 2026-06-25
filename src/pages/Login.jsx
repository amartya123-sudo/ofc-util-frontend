import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Container,
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { firmAPI } from '../services/api'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firm_code: '',
    },
  })

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      setError('')
      const response = await firmAPI.login(data.firm_code)

      if (response.data.success) {
        localStorage.setItem(
            'token',
            response.data.token
          )

        localStorage.setItem(
          'firm',
          JSON.stringify(response.data.firm)
        )
        toast.success('Login successful!')
        navigate('/dashboard')
      } else {
        setError('Wrong Firm Code')
        toast.error('Wrong Firm Code')
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed. Please try again.'
      setError(errorMsg)
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 2,
      }}
    >
      <Container maxWidth="xs">
        <Card
          sx={{
            padding: 4,
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#333',
                mb: 1,
              }}
            >
              Sales Reporting System
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Enter your firm code to get started
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
                required: 'Firm Code is required',
                minLength: {
                  value: 1,
                  message: 'Firm Code cannot be empty',
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
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: '#667eea',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#667eea',
                      },
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
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontWeight: 600,
                padding: '10px',
              }}
            >
              {loading ? <CircularProgress size={24} /> : 'Enter'}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: '#999' }}>
              Demo Code: SHOP001
            </Typography>
          </Box>
        </Card>
      </Container>
    </Box>
  )
}

export default Login
