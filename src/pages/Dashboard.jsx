import { useEffect, useState } from "react";
import { Box, Container, CircularProgress, Typography, Grid, Paper } from "@mui/material";
import { toast } from "react-toastify";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

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

  const [editSale, setEditSale] = useState(null);

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
    setEditSale(null);
    setOpenModal(true);
  };

  const handleEditSale = (sale) => {
    setEditSale(sale);
    setOpenModal(true);
  };

  const handleRequestEdit = async (saleId) => {
    try {
      await salesAPI.requestEdit(saleId);

      toast.success("Edit request sent");

      fetchSales();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to request edit");
    }
  };
  const handleCloseModal = () => {
    setOpenModal(false);

    setSubmitError("");
  };

  const handleSaleSubmit = async (data) => {
    try {
      setSubmitLoading(true);

      if (editSale) {
        await salesAPI.update(editSale.id, data);

        toast.success("Sale updated");
      } else {
        await salesAPI.add(data);

        toast.success("Sale added");
      }

      fetchSales();

      setOpenModal(false);

      setEditSale(null);
    } catch (error) {
      toast.error(error.response?.data?.message);
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
                  background:
                    "linear-gradient(90deg, var(--navy) 0%, transparent 60%)",
                  mt: 2,
                  borderRadius: "2px",
                }}
              />
            </Box>

            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={4}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--rule-strong)",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow)",
                    transition: "all var(--transition-fast)",
                    "&:hover": {
                      boxShadow: "var(--shadow-raised)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "var(--radius)",
                      backgroundColor: "var(--navy-soft)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <ReceiptLongIcon
                      sx={{
                        fontSize: 28,
                        color: "var(--navy)",
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "var(--ink-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.8px",
                        fontWeight: 600,
                        fontSize: "0.7rem",
                      }}
                    >
                      Total Entries
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: "var(--num)",
                        color: "var(--navy)",
                        fontSize: "1.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {summary.total_entries}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--rule-strong)",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow)",
                    transition: "all var(--transition-fast)",
                    "&:hover": {
                      boxShadow: "var(--shadow-raised)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "var(--radius)",
                      backgroundColor: "var(--success-soft)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <InventoryIcon
                      sx={{
                        fontSize: 28,
                        color: "var(--success)",
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "var(--ink-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.8px",
                        fontWeight: 600,
                        fontSize: "0.7rem",
                      }}
                    >
                      Total Quantity
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: "var(--num)",
                        color: "var(--success)",
                        fontSize: "1.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {Number(summary.total_qty).toFixed(2)}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--rule-strong)",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow)",
                    transition: "all var(--transition-fast)",
                    "&:hover": {
                      boxShadow: "var(--shadow-raised)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "var(--radius)",
                      backgroundColor: "var(--warning-soft)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <TrendingUpIcon
                      sx={{
                        fontSize: 28,
                        color: "var(--warning)",
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "var(--ink-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.8px",
                        fontWeight: 600,
                        fontSize: "0.7rem",
                      }}
                    >
                      Total Amount
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: "var(--num)",
                        color: "var(--warning)",
                        fontSize: "1.75rem",
                        fontWeight: 700,
                      }}
                    >
                      ₹{Number(summary.total_amount).toFixed(2)}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            <Box sx={{ mb: 3 }}>
              <SalesFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </Box>

            <Box sx={{ animation: "fadeIn 0.6s ease-out" }}>
              <SalesTable
                sales={filteredSales}
                loading={loading}
                searchTerm={searchTerm}
                onEdit={handleEditSale}
                onRequestEdit={handleRequestEdit}
              />
            </Box>
          </>
        )}
      </Container>

      <AddSaleModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleSaleSubmit}
        loading={submitLoading}
        error={submitError}
        editSale={editSale}
      />
    </Box>
  );
};

export default Dashboard;
