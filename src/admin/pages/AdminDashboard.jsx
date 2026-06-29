import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateFirmModal from "../components/CreateFirmModal";
import { adminFirmAPI, adminSaleAPI } from "../services/adminApi";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [firms, setFirms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editRequests, setEditRequests] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFirm, setSelectedFirm] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    loadFirms();
    loadEditRequests();
  }, []);

  const loadFirms = async () => {
    try {
      const response = await adminFirmAPI.getFirms();
      setFirms(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadEditRequests = async () => {
    try {
      const res = await adminSaleAPI.getEditRequests();
      console.log(res.data);
      setEditRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = () => {
    setSelectedFirm(null);
    setIsEdit(false);
    setOpenModal(true);
  };

  const approveRequest = async (id) => {
    try {
      await adminSaleAPI.approveEdit(id);
      loadEditRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const rejectRequest = async (id) => {
    try {
      await adminSaleAPI.rejectEdit(id);
      loadEditRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (firm, e) => {
    e.stopPropagation();

    setSelectedFirm(firm);
    setIsEdit(true);
    setOpenModal(true);
  };

  const handleDelete = async (firm, e) => {
    e.stopPropagation();

    const confirmed = window.confirm(`Delete "${firm.firm_name}"?`);

    if (!confirmed) return;

    try {
      await adminFirmAPI.deleteFirm(firm.id);
      loadFirms();
    } catch (error) {
      console.error(error);
      alert("Unable to delete firm.");
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    setSelectedFirm(null);
    setIsEdit(false);
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

          <button className="admin-btn admin-btn-create" onClick={handleCreate}>
            + Create Firm
          </button>

          <button className="admin-btn admin-btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="request-card">
        <h2>Pending Edit Requests</h2>

        {editRequests.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          editRequests.map((request) => (
            <div key={request.id} className="request-row">
              <div>
                <strong>{request.firm_name}</strong>

                <div>{request.sale_date}</div>
              </div>

              <div>
                <button onClick={() => approveRequest(request.id)}>
                  Approve
                </button>

                <button onClick={() => rejectRequest(request.id)}>
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {loading ? (
        <div className="loading-box">Loading Firms...</div>
      ) : (
        <div className="admin-firm-list">
          <div className="admin-firm-header">Registered Firms</div>

          {firms.length === 0 ? (
            <div
              style={{
                padding: 30,
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

                  <small>{firm.gst_number}</small>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <button
                    className="admin-btn"
                    onClick={(e) => handleEdit(firm, e)}
                  >
                    Edit
                  </button>

                  <button
                    className="admin-btn admin-btn-logout"
                    onClick={(e) => handleDelete(firm, e)}
                  >
                    Delete
                  </button>

                  <span className="admin-arrow">→</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <CreateFirmModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedFirm(null);
        }}
        onSuccess={loadFirms}
        editData={selectedFirm}
        isEdit={isEdit}
      />
    </div>
  );
}
