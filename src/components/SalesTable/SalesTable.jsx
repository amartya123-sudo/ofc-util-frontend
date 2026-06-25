import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import { format } from "date-fns";

const SalesTable = ({ sales, loading, searchTerm }) => {
  const filteredSales = sales.filter((sale) => {
    const searchLower = (searchTerm || "").toLowerCase();

    if (!searchLower) return true;

    const dateMatch = String(sale.sale_date || "")
      .toLowerCase()
      .includes(searchLower);

    const itemMatch = sale.items?.some((item) =>
      String(item.item?.item_name || "")
        .toLowerCase()
        .includes(searchLower),
    );

    return dateMatch || itemMatch;
  });

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (filteredSales.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <InboxIcon sx={{ fontSize: 48, color: "#ccc", mb: 2 }} />
        <Typography variant="h6" sx={{ color: "#666" }}>
          {searchTerm ? "No sales records found" : "No sales records found"}
        </Typography>
        <Typography variant="body2" sx={{ color: "#999", mt: 1 }}>
          {searchTerm
            ? "Try adjusting your search filters"
            : 'Click "+ Add Sale" to get started'}
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        overflow: "auto",
      }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Item Name</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              Qty
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              Rate
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              Taxable Amount
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              CGST
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              SGST
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>
              Total Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSales.map((sale) =>
            (sale.items || []).map((item, index) => (
              <TableRow key={item.id}>
                {index === 0 && (
                  <TableCell
                    rowSpan={sale.items.length}
                    sx={{
                      verticalAlign: "top",
                      fontWeight: 600,
                    }}
                  >
                    {format(new Date(sale.sale_date), "dd/MM/yyyy")}
                  </TableCell>
                )}

                <TableCell>{item.item_name}</TableCell>

                <TableCell align="right">
                  {Number(item.qty).toFixed(2)}
                </TableCell>

                <TableCell align="right">
                  ₹{Number(item.rate).toFixed(2)}
                </TableCell>

                <TableCell align="right">
                  ₹{Number(item.taxable_amount).toFixed(2)}
                </TableCell>

                <TableCell align="right">
                  ₹{Number(item.cgst_amount).toFixed(2)}
                </TableCell>

                <TableCell align="right">
                  ₹{Number(item.sgst_amount).toFixed(2)}
                </TableCell>

                <TableCell
                  align="right"
                  sx={{
                    color: "#1976d2",
                    fontWeight: 700,
                  }}
                >
                  ₹{Number(item.amount).toFixed(2)}
                </TableCell>
              </TableRow>
            )),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SalesTable;
