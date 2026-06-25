// import { Grid, Card, CardContent, Typography, Box, Skeleton } from '@mui/material'
// import StorefrontIcon from '@mui/icons-material/Storefront'
// import InventoryIcon from '@mui/icons-material/Inventory'
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'

// const SummaryCards = ({ sales, loading }) => {
//   const totalEntries = sales.length
//   const totalQuantity = sales.reduce((sum, sale) => sum + (parseFloat(sale.qty) || 0), 0)
//   const totalAmount = sales.reduce((sum, sale) => sum + (parseFloat(sale.amount) || 0), 0)

//   const CardItem = ({ title, value, icon: Icon, color }) => (
//     <Grid item xs={12} sm={6} md={4}>
//       <Card
//         sx={{
//           backgroundColor: '#fff',
//           boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//           borderRadius: '8px',
//           transition: 'transform 0.2s',
//           '&:hover': {
//             transform: 'translateY(-4px)',
//             boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//           },
//         }}
//       >
//         <CardContent>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Box
//               sx={{
//                 backgroundColor: color,
//                 padding: '12px',
//                 borderRadius: '8px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//             >
//               <Icon sx={{ color: '#fff', fontSize: 24 }} />
//             </Box>
//             <Box>
//               <Typography variant="caption" sx={{ color: '#666' }}>
//                 {title}
//               </Typography>
//               {loading ? (
//                 <Skeleton width={100} />
//               ) : (
//                 <Typography
//                   variant="h5"
//                   sx={{ fontWeight: 600, color: '#333' }}
//                 >
//                   {value}
//                 </Typography>
//               )}
//             </Box>
//           </Box>
//         </CardContent>
//       </Card>
//     </Grid>
//   )

//   return (
//     <Grid container spacing={2} sx={{ mb: 3 }}>
//       <CardItem
//         title="Total Entries"
//         value={totalEntries}
//         icon={StorefrontIcon}
//         color="#FF6B6B"
//       />
//       <CardItem
//         title="Total Quantity"
//         value={totalQuantity.toFixed(2)}
//         icon={InventoryIcon}
//         color="#4ECDC4"
//       />
//       <CardItem
//         title="Total Sales Amount"
//         value={`₹${totalAmount.toFixed(2)}`}
//         icon={MonetizationOnIcon}
//         color="#45B7D1"
//       />
//     </Grid>
//   )
// }

// export default SummaryCards

import { Grid, Card, CardContent, Typography } from "@mui/material";

const SummaryCards = ({ sales = [] }) => {
  let totalAmount = 0;
  let totalQty = 0;
  let totalEntries = 0;

  sales.forEach((daySale) => {
    totalEntries += 1;

    daySale.items?.forEach((item) => {
      totalQty += Number(item.qty || 0);
      const totalAmount = sales.reduce(
        (sum, sale) =>
          sum + sale.items.reduce((s, item) => s + Number(item.amount), 0),
        0,
      );

      const totalTaxable = sales.reduce(
        (sum, sale) =>
          sum +
          sale.items.reduce((s, item) => s + Number(item.taxable_amount), 0),
        0,
      );

      const totalCGST = sales.reduce(
        (sum, sale) =>
          sum + sale.items.reduce((s, item) => s + Number(item.cgst_amount), 0),
        0,
      );

      const totalSGST = sales.reduce(
        (sum, sale) =>
          sum + sale.items.reduce((s, item) => s + Number(item.sgst_amount), 0),
        0,
      );
    });
  });

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} md={4}>
        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Total Days
            </Typography>
            <Typography variant="h4" fontWeight={700} color="#1976d2">
              {totalEntries}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Total Quantity
            </Typography>
            <Typography variant="h4" fontWeight={700}>
              {totalQty.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">
              Total Amount
            </Typography>
            <Typography variant="h4" fontWeight={700} color="green">
              ₹{totalAmount.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SummaryCards;
