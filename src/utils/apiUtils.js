/**
 * API Response utilities for data transformation and normalization
 */

/**
 * Parse sales response and normalize data
 * @param {Object} response - API response object
 * @returns {Object} Normalized sales data with summary
 */
export const parseSalesResponse = (response) => {
  return {
    sales: response.data?.sales || [],
    summary: {
      totalAmount: parseFloat(response.data?.summary?.total_amount || 0),
      totalQty: parseFloat(response.data?.summary?.total_qty || 0),
      totalEntries: response.data?.summary?.total_entries || 0,
    },
  }
}

/**
 * Parse login response and extract firm info
 * @param {Object} response - API response object
 * @returns {Object} Firm data
 */
export const parseFirmResponse = (response) => {
  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Login failed')
  }
  return response.data.firm
}

/**
 * Parse sale record response
 * @param {Object} response - API response object
 * @returns {Object} Sale data
 */
export const parseSaleResponse = (response) => {
  if (!response.data?.success) {
    throw new Error(response.data?.message || 'Failed to add sale')
  }
  return response.data.sale
}

/**
 * Format decimal values with 2 decimal places
 * @param {number} value - Value to format
 * @returns {string} Formatted value
 */
export const formatDecimal = (value) => {
  return parseFloat(value).toFixed(2)
}

/**
 * Format date to YYYY-MM-DD format
 * @param {Date | string} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDateForAPI = (date) => {
  if (typeof date === 'string') {
    return date
  }
  const d = new Date(date)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${month}-${day}`
}

/**
 * Validate sale data before sending to API
 * @param {Object} saleData - Sale data to validate
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
export const validateSaleData = (saleData) => {
  const errors = []

  if (!saleData.firm) {
    errors.push('Firm ID is required')
  }

  if (!saleData.sale_date) {
    errors.push('Sale date is required')
  }

  if (!saleData.item_name) {
    errors.push('Item name is required')
  } else if (!['A', 'B'].includes(saleData.item_name)) {
    errors.push('Item name must be A or B')
  }

  if (!saleData.qty || saleData.qty <= 0) {
    errors.push('Quantity must be greater than 0')
  }

  if (!saleData.rate || saleData.rate <= 0) {
    errors.push('Rate must be greater than 0')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Calculate amount from qty and rate
 * @param {number} qty - Quantity
 * @param {number} rate - Rate
 * @returns {number} Calculated amount
 */
export const calculateAmount = (qty, rate) => {
  return qty * rate
}

/**
 * Get firm info from localStorage
 * @returns {Object | null} Firm data or null
 */
export const getFirmFromStorage = () => {
  try {
    const firm = localStorage.getItem('shop')
    return firm ? JSON.parse(firm) : null
  } catch (error) {
    console.error('Failed to parse firm from storage:', error)
    return null
  }
}

/**
 * Store firm info to localStorage
 * @param {Object} firm - Firm data to store
 */
export const storeFirmInStorage = (firm) => {
  localStorage.setItem('shop', JSON.stringify(firm))
}

/**
 * Remove firm info from localStorage
 */
export const removeFirmFromStorage = () => {
  localStorage.removeItem('shop')
}

/**
 * Check if user is authenticated (firm info exists)
 * @returns {boolean} True if authenticated
 */
export const isAuthenticated = () => {
  return !!getFirmFromStorage()
}

/**
 * Get firm ID from storage
 * @returns {number | null} Firm ID or null
 */
export const getFirmId = () => {
  const firm = getFirmFromStorage()
  return firm?.id || null
}
