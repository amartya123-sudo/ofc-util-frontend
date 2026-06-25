import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "src/admin/components/AdminLayout";
import { adminFirmAPI } from "src/admin/services/adminApi";

import "./EditFirm.css";

export default function EditFirm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firm_name: "",
    gst_number: "",
    address: "",
    firm_code: "",
  });

  useEffect(() => {
    loadFirm();
  }, []);

  const loadFirm = async () => {
    const response = await adminFirmAPI.getFirm(id);

    setFormData(response.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await adminFirmAPI.updateFirm(id, {
        firm_name: formData.firm_name,
        gst_number: formData.gst_number,
        address: formData.address,
      });

      navigate(`/admin/firms/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Edit Firm">
      <div className="admin-card">
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Firm Name</label>

            <input
              type="text"
              name="firm_name"
              value={formData.firm_name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>GST Number</label>

            <input
              type="text"
              name="gst_number"
              value={formData.gst_number}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Address</label>

            <textarea
              rows="4"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Firm Code</label>

            <input value={formData.firm_code} disabled />
          </div>

          <button className="primary-btn" type="submit">
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
