# Sales Reporting System

A modern, responsive ReactJS web application for managing shop sales records. Built with React 18, Material UI, React Router, and Axios.

## Features

✅ **User Authentication** - Firm code login with validation
✅ **Responsive Design** - Mobile-first, works on all devices
✅ **Sales Management** - Add and view sales records
✅ **Search & Filter** - Real-time search across all fields
✅ **Dashboard Analytics** - Summary cards for key metrics
✅ **Form Validation** - Client-side validation for all inputs
✅ **Toast Notifications** - User-friendly feedback messages
✅ **Loading States** - Smooth loading indicators
✅ **Error Handling** - Comprehensive error management

## Tech Stack

- **Frontend Framework**: React 18.3.1
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **UI Library**: Material UI v5
- **Form Management**: React Hook Form
- **Notifications**: React Toastify
- **Build Tool**: Vite
- **Date Handling**: date-fns

## Project Structure

```
src/
├── components/
│   ├── Header/
│   │   └── Header.jsx          # App header with shop info & logout
│   ├── SummaryCards/
│   │   └── SummaryCards.jsx    # Statistics cards (entries, qty, amount)
│   ├── SalesFilter/
│   │   └── SalesFilter.jsx     # Search input component
│   ├── SalesTable/
│   │   └── SalesTable.jsx      # Sales records table
│   └── AddSaleModal/
│       └── AddSaleModal.jsx    # Modal form for adding sales
├── pages/
│   ├── Login.jsx               # Login page with firm code
│   └── Dashboard.jsx           # Main dashboard page
├── services/
│   └── api.js                  # API service layer (Axios)
├── routes/
│   └── ProtectedRoute.jsx      # Protected route wrapper
├── styles/
│   └── index.css               # Global styles
├── App.jsx                     # Main app with routing
└── main.jsx                    # Entry point with theme setup
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd sales-reporting-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your API base URL (default: `http://localhost:3001/api`)

### Running the Application

**Development mode:**
```bash
npm run dev
```

The application will open automatically at `http://localhost:5173`

**Production build:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

## API Integration

The application expects the following API endpoints:

### 1. Login
- **Endpoint**: `POST /api/shop/login`
- **Request**:
  ```json
  {
    "firm_code": "SHOP001"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "shop": {
      "id": 1,
      "name": "ABC Store",
      "firm_code": "SHOP001"
    }
  }
  ```

### 2. Fetch Sales
- **Endpoint**: `GET /api/sales`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "date": "2026-06-07",
      "item_name": "A",
      "qty": 10,
      "rate": 50,
      "amount": 500
    }
  ]
  ```

### 3. Add Sale
- **Endpoint**: `POST /api/sales`
- **Request**:
  ```json
  {
    "date": "2026-06-07",
    "item_name": "A",
    "qty": 10,
    "rate": 50,
    "amount": 500
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Sale Added"
  }
  ```

## Usage

### Login
1. Open the application
2. Enter a firm code (e.g., "SHOP001")
3. Click "Enter" to log in

### View Dashboard
- Dashboard displays all sales records
- Summary cards show total entries, quantity, and sales amount
- Search box filters records in real-time

### Add a Sale
1. Click the "+ Add Sale" button in the header
2. Fill in the form:
   - **Date**: Select date (defaults to today)
   - **Item Name**: Choose from dropdown (A or B)
   - **Qty**: Enter quantity (positive number)
   - **Rate**: Enter rate per unit
   - **Amount**: Auto-calculated (Qty × Rate)
3. Click "Submit" to save
4. Sale appears in the table immediately

### Search Sales
- Use the search box above the table
- Search works on: date, item name, qty, rate, amount
- Results update instantly as you type

### Logout
- Click "Logout" button in the top-right corner
- Redirects to login page

## Responsive Design

The application is fully responsive:

- **Mobile** (< 600px): Single column, responsive table with horizontal scroll, mobile-friendly modals
- **Tablet** (600px - 960px): Adaptive card layout, two-column grid
- **Desktop** (> 960px): Professional dashboard layout with fixed header, comfortable spacing

## Features in Detail

### Authentication & Storage
- Firm code validation on login
- Shop information stored in localStorage
- Protected routes prevent unauthorized access
- Auto-logout redirects to login page when accessing without authentication

### Form Validation
- Real-time validation with React Hook Form
- Required field validation
- Number validation (positive values only)
- Custom error messages

### Auto-Calculation
- Amount field auto-calculates as Qty × Rate
- Updates instantly when either field changes

### Search & Filter
- Case-insensitive search
- Searches across all columns
- Empty state display when no results found

### Loading States
- Spinner shown during API calls
- Buttons disabled during submission
- Smooth transitions

### Error Handling
- API error messages displayed
- Toast notifications for user feedback
- Graceful fallbacks for failed requests

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lazy loading of components
- Optimized re-renders with React hooks
- Efficient list rendering
- Responsive images and icons

## Development Notes

### Adding New Features
1. Create component in appropriate folder
2. Import and use in pages
3. Add API calls to `src/services/api.js`
4. Update routes if needed

### Styling
- Uses Material UI theme system
- Custom styles with `sx` prop
- Mobile-first responsive design

### State Management
- React Hooks for local state
- localStorage for authentication
- Context could be added for global state

## License

MIT

## Support

For issues or questions, please check the application logs in the browser console.

## Future Enhancements

- [ ] Export sales data to CSV/Excel
- [ ] Print functionality for sales reports
- [ ] Edit/delete existing sales records
- [ ] Multi-user support
- [ ] Advanced analytics and charts
- [ ] Date range filtering
- [ ] Batch sales entry
- [ ] Offline support with sync
- [ ] Dark mode
- [ ] Internationalization (i18n)
