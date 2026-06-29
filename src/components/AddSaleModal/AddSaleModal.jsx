import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";

import { adminItemAPI } from "../../admin/services/adminApi";

import "./AddSaleModal.css";

export default function AddSaleModal({
  open,
  onClose,
  onSubmit,
  loading,
  error,
  editSale = null,
}) {
  const [items, setItems] = useState([]);

  const isEdit = editSale !== null;

  const [rows, setRows] = useState([
    {
      item: "",
      qty: "",
      rate: "",
    },
  ]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sale_date: format(new Date(), "yyyy-MM-dd"),
    },
  });

  useEffect(() => {
    if (!open) return;

    loadItems();

    if (editSale) {
      reset({
        sale_date: editSale.sale_date,
      });

      setRows(
        editSale.items.map((item) => ({
          item: item.item,
          qty: item.qty,
          rate: item.rate,
        })),
      );
    } else {
      reset({
        sale_date: format(new Date(), "yyyy-MM-dd"),
      });

      setRows([
        {
          item: "",
          qty: "",
          rate: "",
        },
      ]);
    }
  }, [open, editSale]);

  const loadItems = async () => {
    try {
      const response = await adminItemAPI.getItems();
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        item: "",
        qty: "",
        rate: "",
      },
    ]);
  };

  const removeRow = (index) => {
    if (rows.length === 1) return;

    const updatedRows = [...rows];
    updatedRows.splice(index, 1);

    setRows(updatedRows);
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    setRows(updatedRows);
  };

  const handleFormSubmit = (data) => {
    onSubmit({
      sale_date: data.sale_date,
      items: rows.map((row) => ({
        item: Number(row.item),
        qty: Number(row.qty),
        rate: Number(row.rate),
        amount: Number(row.qty) * Number(row.rate),
      })),
    });

    reset();

    setRows([
      {
        item: "",
        qty: "",
        rate: "",
      },
    ]);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>{isEdit ? "Edit Sale" : "Add Daily Sale"}</DialogTitle>

      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Controller
          name="sale_date"
          control={control}
          rules={{
            required: "Date is required",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="date"
              label="Sale Date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{ mb: 3, mt: 1 }}
              error={!!errors.sale_date}
              helperText={errors.sale_date?.message}
            />
          )}
        />

        <Box className="sale-table">
          {rows.map((row, index) => (
            <Box className="sale-row" key={index}>
              <TextField
                select
                label="Item"
                value={row.item}
                sx={{ minWidth: 220 }}
                onChange={(e) => handleRowChange(index, "item", e.target.value)}
              >
                {items.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.item_name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Qty"
                type="number"
                value={row.qty}
                onChange={(e) => handleRowChange(index, "qty", e.target.value)}
              />

              <TextField
                label="Rate"
                type="number"
                value={row.rate}
                onChange={(e) => handleRowChange(index, "rate", e.target.value)}
              />

              <TextField
                label="Amount"
                value={
                  row.qty && row.rate
                    ? (Number(row.qty) * Number(row.rate)).toFixed(2)
                    : ""
                }
                InputProps={{
                  readOnly: true,
                }}
              />

              <IconButton color="error" onClick={() => removeRow(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          <Button
            startIcon={<AddIcon />}
            variant="outlined"
            className="add-item-btn"
            onClick={addRow}
            sx={{ mt: 2 }}
          >
            Add Item
          </Button>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          variant="contained"
          disabled={loading}
          onClick={handleSubmit(handleFormSubmit)}
        >
          {loading ? (
            <CircularProgress size={20} />
          ) : isEdit ? (
            "Update Sale"
          ) : (
            "Save Sale"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
