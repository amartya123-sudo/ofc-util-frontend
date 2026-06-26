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
          backgroundColor: "var(--surface)",
          borderRadius: "var(--radius)",
          border: "1px solid var(--rule)",
          boxShadow: "var(--shadow)",
        }}
      >
        <InboxIcon sx={{ fontSize: 48, color: "var(--rule-strong)", mb: 2 }} />
        <Typography
          variant="h6"
          sx={{ color: "var(--ink-soft)", fontFamily: "var(--serif)" }}
        >
          The register is empty
        </Typography>
        <Typography variant="body2" sx={{ color: "var(--ink-muted)", mt: 1 }}>
          {searchTerm
            ? "No entries match your search"
            : 'Use "Add Sale" to record the first entry'}
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        border: "1px solid var(--rule-strong)",
        boxShadow: "var(--shadow)",
        borderRadius: "var(--radius)",
        overflow: "auto",
      }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Item Name</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">Rate</TableCell>
            <TableCell align="right">Taxable Amount</TableCell>
            <TableCell align="right">CGST</TableCell>
            <TableCell align="right">SGST</TableCell>
            <TableCell align="right">Total Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSales.map((sale) =>
            (sale.items || []).map((item, index) => (
              <TableRow
                key={item.id}
                sx={{
                  "&:nth-of-type(even)": {
                    backgroundColor: "rgba(31, 58, 95, 0.025)",
                  },
                  "&:hover": { backgroundColor: "rgba(31, 58, 95, 0.06)" },
                }}
              >
                {index === 0 && (
                  <TableCell
                    rowSpan={sale.items.length}
                    sx={{
                      verticalAlign: "top",
                      fontWeight: 700,
                      fontFamily: "var(--serif)",
                      color: "var(--navy)",
                      borderRight: "1px solid var(--rule)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {format(new Date(sale.sale_date), "dd/MM/yyyy")}
                  </TableCell>
                )}

                <TableCell>{item.item_name}</TableCell>

                <TableCell align="right" className="num">
                  {Number(item.qty).toFixed(2)}
                </TableCell>

                <TableCell align="right" className="num">
                  ₹{Number(item.rate).toFixed(2)}
                </TableCell>

                <TableCell align="right" className="num">
                  ₹{Number(item.taxable_amount).toFixed(2)}
                </TableCell>

                <TableCell align="right" className="num">
                  ₹{Number(item.cgst_amount).toFixed(2)}
                </TableCell>

                <TableCell align="right" className="num">
                  ₹{Number(item.sgst_amount).toFixed(2)}
                </TableCell>

                <TableCell
                  align="right"
                  className="num"
                  sx={{
                    color: "var(--navy)",
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
