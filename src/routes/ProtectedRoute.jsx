import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const firm = localStorage.getItem('firm')

  if (!firm) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
