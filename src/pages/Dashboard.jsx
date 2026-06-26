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
          py: 4,
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 8,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h4"
                sx={{ fontFamily: "var(--serif)", color: "var(--ink)" }}
              >
                Daily Sales Register
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "var(--ink-muted)", mt: 0.5 }}
              >
                A complete account of recorded transactions
              </Typography>
              <Box
                sx={{
                  height: "2px",
                  background:
                    "linear-gradient(90deg, var(--navy), transparent)",
                  mt: 1.5,
                }}
              />
            </Box>

            <SalesFilter
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />

            <SalesTable sales={filteredSales} />
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
