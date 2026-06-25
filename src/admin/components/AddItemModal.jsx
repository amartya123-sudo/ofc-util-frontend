import { useState } from "react";
import { adminItemAPI } from "../services/adminApi";

import "./AddItemModal.css";

export default function AddItemModal({ open, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    item_name: "",
    hsn_code: "",
    gst_rate: "",
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

      await adminItemAPI.createItem(formData);

      setFormData({
        item_name: "",
        hsn_code: "",
        gst_rate: "",
      });

      onSuccess?.();
      onClose();
    } catch (error) {
      console.log(error.response?.data);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2>Add Item</h2>

          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="item_name"
            placeholder="Item Name"
            value={formData.item_name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="hsn_code"
            placeholder="HSN Code"
            value={formData.hsn_code}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="gst_rate"
            placeholder="GST Rate (%)"
            value={formData.gst_rate}
            onChange={handleChange}
            required
          />

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn">
              {loading ? "Saving..." : "Save Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
