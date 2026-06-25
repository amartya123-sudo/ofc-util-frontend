import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminItemAPI } from "../services/adminApi";
import AddItemModal from "../components/AddItemModal";
import "./ItemMaster.css";

export default function ItemMaster() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await adminItemAPI.getItems();

      setItems(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleCreateItem = async (formData) => {
    try {
      const response = await adminItemAPI.createItem(formData);

      console.log(response.data);

      setOpenModal(false);

      loadItems();
    } catch (error) {
      console.log(error.response?.data);
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_access");

    navigate("/admin/login");
  };

  const filteredItems = items.filter((item) =>
    item.item_name.toLowerCase().includes(search.toLowerCase()),
  );

  const gstRates = [...new Set(items.map((item) => item.gst_rate))];

  return (
    <div className="item-page">
      <div className="top-navbar">
        <div>
          <h1>Item Master</h1>

          <p>Manage Items, HSN Codes and GST Rates</p>
        </div>

        <div className="nav-actions">
          <button
            className="dashboard-btn"
            onClick={() => navigate("/admin/dashboard")}
          >
            Dashboard
          </button>

          <button className="add-btn" onClick={() => setOpenModal(true)}>
            + Add Item
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-card">
        {loading ? (
          <div className="empty-box">Loading...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Item Name</th>

                <th>HSN Code</th>

                <th>GST Rate</th>
              </tr>
            </thead>

            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.item_name}</td>

                    <td>{item.hsn_code}</td>

                    <td>
                      <span className="gst-badge">{item.gst_rate} %</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="empty-box">
                    No Items Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      <AddItemModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleCreateItem}
      />
    </div>
  );
}
