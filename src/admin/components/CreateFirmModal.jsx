import { useState } from "react";
import { adminFirmAPI } from "src/admin/services/adminAPI.js";

import "./CreateFirmModal.css";

export default function CreateFirmModal({ open, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firm_name: "",
    gst_number: "",
    address: "",
  });

  if (!open) {
    return null;
  }

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

      await adminFirmAPI.createFirm(formData);

      setFormData({
        firm_name: "",
        gst_number: "",
        address: "",
      });

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2>Create Firm</h2>

          <button className="close-btn" onClick={onClose}>
            x
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firm_name"
            placeholder="Firm Name"
            value={formData.firm_name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="gst_number"
            placeholder="GST Number"
            value={formData.gst_number}
            onChange={handleChange}
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            rows="4"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn">
              {loading ? "Creating..." : "Create Firm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
