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
            py: 8,
            backgroundColor: "var(--surface)",
            borderRadius: "var(--radius-lg)",
            border: "2px dashed var(--rule-strong)",
            boxShadow: "var(--shadow)",
            transition: "all var(--transition-base)",
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              backgroundColor: "var(--navy-soft)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
              transition: "all var(--transition-base)",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <InboxIcon sx={{ fontSize: 40, color: "var(--navy)" }} />
          </Box>
          <Typography
            variant="h5"
            sx={{ 
              color: "var(--ink-soft)", 
              fontFamily: "var(--serif)",
              fontWeight: 700,
              mb: 1,
            }}
          >
            The register is empty
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: "var(--ink-muted)", 
              mt: 0.5,
              maxWidth: 400,
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            {searchTerm
              ? "No entries match your search. Try adjusting your search terms."
              : 'Click "Add Sale" to record your first transaction'}
          </Typography>
        </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        border: "1px solid var(--rule-strong)",
        boxShadow: "var(--shadow-raised)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        backgroundColor: "var(--surface)",
        transition: "all var(--transition-base)",
      }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "var(--surface-alt)",
              "& th": {
                fontFamily: "var(--serif)",
                fontWeight: 700,
                color: "var(--ink)",
                borderBottom: "2px solid var(--navy)",
                py: 2.5,
                px: 2,
              },
            }}
          >
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
                    backgroundColor: "rgba(31, 58, 95, 0.03)",
                  },
                  "&:hover": { 
                    backgroundColor: "var(--navy-soft)",
                    transform: "scale(1.005)",
                  },
                  transition: "all var(--transition-fast)",
                  "& td": {
                    py: 2,
                    px: 2,
                  },
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
                      borderRight: "2px solid var(--rule)",
                      whiteSpace: "nowrap",
                      backgroundColor: "rgba(31, 58, 95, 0.02)",
                      py: 2,
                      px: 2,
                    }}
                  >
                    {format(new Date(sale.sale_date), "dd/MM/yyyy")}
                  </TableCell>
                )}

                <TableCell sx={{ fontWeight: 500 }}>{item.item_name}</TableCell>

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
                    fontSize: "1.05rem",
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
