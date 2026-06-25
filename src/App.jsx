import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "src/pages/Login";
import Dashboard from "src/pages/Dashboard";
import ProtectedRoute from "src/routes/ProtectedRoute";
import AdminLogin from "src/admin/pages/AdminLogin";
import AdminDashboard from "src/admin/pages/AdminDashboard";
import AdminProtectedRoute from "src/admin/routes/AdminProtectedRoutes";
import EditFirm from "src/admin/pages/EditFirm";
import FirmDetail from "src/admin/pages/FirmDetail";
import ItemMaster from "src/admin/pages/ItemMaster";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route path="/admin/items" element={<ItemMaster />} />
          <Route path="/admin/firms/:id" element={<FirmDetail />} />
          <Route
            path="/admin/firms/:id/edit"
            element={
              <AdminProtectedRoute>
                <EditFirm />
              </AdminProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
