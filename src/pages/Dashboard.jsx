import { useEffect, useState } from "react";
import { Box, Container, CircularProgress, Typography } from "@mui/material";
import { toast } from "react-toastify";

import Header from "../components/Header/Header";
import SalesFilter from "../components/SalesFilter/SalesFilter";
import SalesTable from "../components/SalesTable/SalesTable";
import AddSaleModal from "../components/AddSaleModal/AddSaleModal";

import { salesAPI } from "../services/api";

const Dashboard = () => {
  const [sales, setSales] = useState([]);

  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [submitLoading, setSubmitLoading] = useState(false);

  const [submitError, setSubmitError] = useState("");

  const [summary, setSummary] = useState({
    total_amount: 0,
    total_qty: 0,
    total_entries: 0,
  });

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      setLoading(true);

      const response = await salesAPI.fetchAll();
      console.log("Response:", response);

      setSales(response.data.sales || []);

      setSummary(
        response.data.summary || {
          total_amount: 0,
          total_qty: 0,
          total_entries: 0,
        },
      );
    } catch (error) {
      console.error(error);

      toast.error("Failed to fetch sales");

      setSales([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSaleClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);

    setSubmitError("");
  };

  const handleAddSaleSubmit = async (saleData) => {
    try {
      setSubmitLoading(true);

      setSubmitError("");

      const response = await salesAPI.add(saleData);

      if (response.data.success) {
        toast.success("Sale added successfully");

        setOpenModal(false);

        fetchSales();
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add sale";

      setSubmitError(message);

      toast.error(message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const filteredSales = sales.filter((sale) =>
    sale.items.some((item) =>
      item.item_name.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "transparent",
      }}
    >
      <Header onAddSaleClick={handleAddSaleClick} />

      <Container
        maxWidth="xl"
        sx={{
          py: 5,
          px: { xs: 2, md: 4 },
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              py: 12,
              gap: 3,
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                border: `4px solid var(--rule)`,
                borderTop: `4px solid var(--navy)`,
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                "@keyframes spin": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" },
                },
              }}
            />
            <Typography
              variant="body1"
              sx={{
                color: "var(--ink-muted)",
                fontFamily: "var(--serif)",
                fontSize: "1.1rem",
              }}
            >
              Loading the ledger...
            </Typography>
          </Box>
        ) : (
          <>
            <Box 
              sx={{ 
                mb: 4,
                animation: "fadeIn 0.5s ease-out",
              }}
            >
              <Typography
                variant="h3"
                sx={{ 
                  fontFamily: "var(--serif)", 
                  color: "var(--ink)",
                  fontSize: { xs: "1.75rem", md: "2.25rem" },
                  mb: 1,
                }}
              >
                Daily Sales Register
              </Typography>
              <Typography
                variant="body1"
                sx={{ 
                  color: "var(--ink-muted)", 
                  mt: 0.5,
                  fontSize: "1rem",
                  maxWidth: 600,
                }}
              >
                A complete account of recorded transactions for your firm
              </Typography>
              <Box
                sx={{
                  height: "3px",
                  background: "linear-gradient(90deg, var(--navy) 0%, transparent 60%)",
                  mt: 2,
                  borderRadius: "2px",
                }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <SalesFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </Box>

            <Box sx={{ animation: "fadeIn 0.6s ease-out" }}>
              <SalesTable sales={filteredSales} />
            </Box>
          </>
        )}
      </Container>

      <AddSaleModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleAddSaleSubmit}
        loading={submitLoading}
        error={submitError}
      />
    </Box>
  );
};

export default Dashboard;
