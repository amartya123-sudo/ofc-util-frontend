import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminFirmAPI } from "src/admin/services/adminApi";
import * as XLSX from "xlsx";
import "./FirmDetail.css";

export default function FirmDetail() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [itemFilter, setItemFilter] = useState("All");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const [selectedMonth, setSelectedMonth] = useState("All");

  const [selectedYear, setSelectedYear] = useState("All");

  const [selectedQuarter, setSelectedQuarter] = useState("All");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = [
    ...new Set(
      (data?.sales || []).map((sale) => new Date(sale.sale_date).getFullYear()),
    ),
  ].sort((a, b) => b - a);

  useEffect(() => {
    loadFirm();
  }, []);

  const getFinancialQuarter = (dateString) => {
    const month = new Date(dateString).getMonth() + 1;

    if (month >= 4 && month <= 6) {
      return "Q1";
    }

    if (month >= 7 && month <= 9) {
      return "Q2";
    }

    if (month >= 10 && month <= 12) {
      return "Q3";
    }

    return "Q4";
  };

  const exportToExcel = () => {
    const exportData = filteredSales.map((sale) => ({
      Date: sale.sale_date,
      Item: sale.item_name,
      Qty: sale.qty,
      Rate: sale.rate,
      Amount: sale.amount,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales");

    const firmName = data.firm.firm_name.replace(/\s+/g, "_");

    const year = selectedYear === "All" ? "AllYears" : selectedYear;

    const month = selectedMonth === "All" ? "AllMonths" : months[selectedMonth];

    const quarter = selectedQuarter === "All" ? "" : `_${selectedQuarter}`;

    XLSX.writeFile(workbook, `${firmName}_${month}_${year}${quarter}.xlsx`, {
      compression: true,
    });
  };

  const downloadGSTReport = async () => {
    try {
      const response = await adminFirmAPI.getGSTReport(
        id,
        selectedMonth,
        selectedYear,
      );
      console.log(response);
      const blob = new Blob([JSON.stringify(response.data, null, 2)], {
        type: "application/json",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `GST_${selectedMonth}_${selectedYear}.json`;

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (error) {
      console.error(error);
    }
  };

  const loadFirm = async () => {
    try {
      const response = await adminFirmAPI.getFirm(id);

      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="page-loader">Loading...</div>;
  }

  if (!data) {
    return (
      <div className="firm-page">
        <div className="page-loader">Failed to load firm details</div>
      </div>
    );
  }

  const totalQty = data.sales.reduce((sum, sale) => sum + Number(sale.qty), 0);

  const itemOptions = [...new Set(data.sales.map((sale) => sale.item_name))];

  const filteredSales = data.sales.filter((sale) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      search === "" ||
      sale.items?.some((itemRow) =>
        itemRow.item?.item_name?.toLowerCase().includes(searchText),
      );

    const saleDate = new Date(sale.sale_date);

    const saleMonth = saleDate.getMonth();

    const saleYear = saleDate.getFullYear();

    const saleQuarter = getFinancialQuarter(sale.sale_date);

    const matchesMonth =
      selectedMonth === "All" || saleMonth === Number(selectedMonth);

    const matchesYear =
      selectedYear === "All" || saleYear === Number(selectedYear);

    const matchesQuarter =
      selectedQuarter === "All" || saleQuarter === selectedQuarter;

    return matchesSearch && matchesMonth && matchesYear && matchesQuarter;
  });

  const groupedSales = Object.entries(
    filteredSales.reduce((acc, sale) => {
      if (!acc[sale.sale_date]) {
        acc[sale.sale_date] = [];
      }

      acc[sale.sale_date].push(sale);

      return acc;
    }, {}),
  );

  return (
    <div className="firm-page">
      <div className="top-navbar">
        <div>
          <h1>{data.firm.firm_name}</h1>

          <p>Firm Sales Dashboard</p>
        </div>

        <div className="nav-actions">
          <button
            className="nav-btn dashboard-btn"
            onClick={() => navigate("/admin/dashboard")}
          >
            Dashboard
          </button>

          <button
            className="nav-btn logout-btn"
            onClick={() => {
              localStorage.removeItem("admin_access");

              navigate("/admin/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="firm-detail">
        <div className="firm-info-card">
          <h2>{data.firm.firm_name}</h2>

          <p>
            <strong>Firm Code:</strong> {data.firm.firm_code}
          </p>

          <p>
            <strong>GST Number:</strong> {data.firm.gst_number || "N/A"}
          </p>

          <p>
            <strong>Address:</strong> {data.firm.address || "N/A"}
          </p>
        </div>

        <div className="filter-bar">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            placeholder="From Date"
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            placeholder="To Date"
          />

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="All">All Months</option>

            {months.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="All">All Years</option>

            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            value={selectedQuarter}
            onChange={(e) => setSelectedQuarter(e.target.value)}
          >
            <option value="All">All Quarters</option>

            <option value="Q1">Q1 (Apr-Jun)</option>

            <option value="Q2">Q2 (Jul-Sep)</option>

            <option value="Q3">Q3 (Oct-Dec)</option>

            <option value="Q4">Q4 (Jan-Mar)</option>
          </select>
          <select
            value={itemFilter}
            onChange={(e) => setItemFilter(e.target.value)}
          >
            <option value="All">All Items</option>

            <option value="A">Item A</option>

            <option value="B">Item B</option>
          </select>
          <button
            className="clear-btn"
            onClick={() => {
              setSearch("");
              setItemFilter("All");
              setSelectedMonth("All");
              setSelectedYear("All");
              setSelectedQuarter("All");
            }}
          >
            Clear Filters
          </button>
        </div>
        <div className="export-section">
          <button className="export-btn" onClick={downloadGSTReport}>
            Export JSON
          </button>

          <button className="export-btn" onClick={exportToExcel}>
            Export Excel
          </button>
        </div>

        <div className="table-container">
          <table className="sales-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Item</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Taxable Amount</th>
                <th>CGST</th>
                <th>SGST</th>
                <th>Total Amount</th>
              </tr>
            </thead>

            <tbody>
              {filteredSales.length > 0 ? (
                filteredSales.map((sale) =>
                  sale.items.map((row, index) => (
                    <tr key={row.id}>
                      {index === 0 && (
                        <td rowSpan={sale.items.length}>{sale.sale_date}</td>
                      )}

                      <td>{row.item_name}</td>

                      <td>{row.qty}</td>

                      <td>₹{row.rate}</td>

                      <td>₹{Number(row.taxable_amount).toFixed(2)}</td>

                      <td>₹{Number(row.cgst_amount).toFixed(2)}</td>

                      <td>₹{Number(row.sgst_amount).toFixed(2)}</td>

                      <td>₹{Number(row.amount).toFixed(2)}</td>
                    </tr>
                  )),
                )
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    style={{
                      textAlign: "center",
                      padding: "30px",
                      color: "#666",
                      fontSize: "16px",
                    }}
                  >
                    No sales data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
