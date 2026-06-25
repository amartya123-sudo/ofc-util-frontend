import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateFirmModal from "../components/CreateFirmModal";
import { adminFirmAPI } from "../services/adminApi";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [firms, setFirms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    firm_name: "",
    gst_number: "",
    address: "",
  });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchFirms();
  }, []);

  const fetchFirms = async () => {
    try {
      const response = await adminFirmAPI.getFirms();
      console.log("Firms API:", response.data);
      setFirms(response.data);
    } catch (error) {
      console.log("Dashboard Error:", error.response?.data);
      console.log("Status:", error.response?.status);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const loadFirms = async () => {
    try {
      const response = await adminFirmAPI.getFirms();

      console.log("FIRMS RESPONSE:", response.data);

      setFirms(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFirm = async (e) => {
    e.preventDefault();

    try {
      setCreating(true);

      await adminFirmAPI.createFirm(formData);

      setOpenModal(false);

      setFormData({
        firm_name: "",
        gst_number: "",
        address: "",
      });

      loadFirms();
    } catch (error) {
      console.error(error);
    } finally {
      setCreating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_access");

    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-left">
          <h1>Firm Management</h1>

          <p>Manage firms and monitor sales</p>
        </div>

        <div className="admin-header-right">
          <button
            className="item-master"
            onClick={() => navigate("/admin/items")}
          >
            Item Master
          </button>
          <button
            className="admin-btn admin-btn-create"
            onClick={() => setOpenModal(true)}
          >
            + Create Firm
          </button>

          <button className="admin-btn admin-btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-box">Loading Firms...</div>
      ) : (
        <div className="admin-firm-list">
          <div className="admin-firm-header">Registered Firms</div>

          {firms.length === 0 ? (
            <div
              style={{
                padding: "30px",
                textAlign: "center",
              }}
            >
              No firms found
            </div>
          ) : (
            firms.map((firm) => (
              <div
                key={firm.id}
                className="admin-firm-item"
                onClick={() => navigate(`/admin/firms/${firm.id}`)}
              >
                <div className="admin-firm-info">
                  <h3>{firm.firm_name}</h3>

                  <div className="admin-firm-code">{firm.firm_code}</div>
                </div>

                <div className="admin-arrow">→</div>
              </div>
            ))
          )}
        </div>
      )}
      <CreateFirmModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={fetchFirms}
      />
    </div>
  );
}
