import { useNavigate } from 'react-router-dom'
import './AdminLayout.css'

export default function AdminLayout({
  title,
  children,
}) {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('admin_access')
    navigate('/admin/login')
  }

  return (
    <div className="admin-layout">

      <aside className="admin-sidebar">

        <div className="admin-logo">
          Sales Admin
        </div>

        <button
          className="sidebar-btn"
          onClick={() =>
            navigate('/admin/dashboard')
          }
        >
          Dashboard
        </button>

        <button
          className="sidebar-btn logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </aside>

      <main className="admin-content">

        <div className="page-header">
          <h1>{title}</h1>
        </div>

        {children}

      </main>

    </div>
  )
}