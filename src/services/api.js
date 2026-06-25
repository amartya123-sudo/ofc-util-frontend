// import axios from 'axios'

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://192.168.1.12:8000/api'

// /**
//  * Axios client instance for all API requests
//  * Base URL configured from environment or defaults to localhost
//  */
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token')

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }

//     return config
//   },
//   (error) => Promise.reject(error)
// )

// /**
//  * FIRM API - Authentication & Firm Management
//  */
// export const firmAPI = {
//   /**
//    * Login with firm code
//    * @param {string} firmCode - The firm code to authenticate with
//    * @returns {Promise} Response with firm details if successful
//    */
//   login: (firmCode) => {
//     return apiClient.post('/login', {
//       firm_code: firmCode,
//     })
//   },
// }

// /**
//  * SALES API - Sales Records Management
//  */
// export const salesAPI = {
//   /**
//    * Fetch all sales with optional filters
//    * @param {Object} filters - Optional filter parameters
//    * @param {number} filters.firm_id - Filter by firm ID
//    * @param {string} filters.today - Set to 'true' for today's sales only
//    * @param {string} filters.search - Search by item name (A or B)
//    * @returns {Promise} Response containing sales array and summary
//    */
//   fetchAll: (filters = {}) => {
//     return apiClient.get('/sales', { params: filters })
//   },

//   /**
//    * Fetch sales with specific filters
//    * @param {Object} params - Query parameters
//    * @returns {Promise} Response containing filtered sales and summary
//    */
//   fetchByFilters: (params) => {
//     return apiClient.get('/sales', { params })
//   },

//   /**
//    * Fetch today's sales
//    * @param {number} firmId - Optional firm ID to filter by
//    * @returns {Promise} Response containing today's sales
//    */
//   fetchToday: (firmId = null) => {
//     const params = { today: 'true' }
//     if (firmId) params.firm_id = firmId
//     return apiClient.get('/sales', { params })
//   },

//   /**
//    * Search sales by item name
//    * @param {string} itemName - Item name to search (A or B)
//    * @returns {Promise} Response containing matching sales
//    */
//   search: (itemName) => {
//     return apiClient.get('/sales', { params: { search: itemName } })
//   },

//   /**
//    * Add a new sale record
//    * @param {Object} saleData - Sale data object
//    * @param {number} saleData.firm - Firm ID (required)
//    * @param {string} saleData.sale_date - Date in YYYY-MM-DD format (required)
//    * @param {string} saleData.item_name - Item name 'A' or 'B' (required)
//    * @param {number} saleData.qty - Quantity (required)
//    * @param {number} saleData.rate - Rate per unit (required)
//    * @returns {Promise} Response with created sale details
//    */
//   add: (saleData) => {
//     return apiClient.post('/sales', saleData)
//   },
// }

// /**
//  * Error handler utility
//  * Extracts error message from various response formats
//  */
// export const getErrorMessage = (error) => {
//   return (
//     error?.response?.data?.message ||
//     error?.response?.data?.error ||
//     error?.message ||
//     'An unknown error occurred'
//   )
// }

// export default apiClient


import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://192.168.1.12:8000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem('token')

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`
    }

    return config

  },
  (error) => Promise.reject(error)
)

/*
|--------------------------------------------------------------------------
| FIRM API
|--------------------------------------------------------------------------
*/

export const firmAPI = {

  login: (firmCode) => {

    return apiClient.post(
      '/login',
      {
        firm_code: firmCode,
      }
    )

  },

}


/*
|--------------------------------------------------------------------------
| ITEM MASTER API
|--------------------------------------------------------------------------
*/

export const itemAPI = {

  fetchAll: () => {

    return apiClient.get(
      '/items'
    )

  },

}


/*
|--------------------------------------------------------------------------
| SALES API
|--------------------------------------------------------------------------
*/

export const salesAPI = {

  /*
  Fetch all sales
  */
  fetchAll: (filters = {}) => {

    return apiClient.get(
      '/sales',
      {
        params: filters,
      }
    )

  },

  /*
  Today's sales
  */
  fetchToday: (firmId = null) => {
    const params = {
      today: 'true',
    }

    if (firmId) {
      params.firm_id = firmId
    }

    return apiClient.get(
      '/sales',
      {
        params,
      }
    )

  },

  /*
  Search sales
  */
  search: (searchText) => {

    return apiClient.get(
      '/sales',
      {
        params: {
          search: searchText,
        },
      }
    )

  },

  /*
  Create new daily sale
  */
  add: (saleData) => {

    /*
    saleData structure:

    {
      firm: 1,
      sale_date: "2026-06-19",
      items: [
        {
          item: 1,
          qty: 100,
          rate: 90,
          sale_amount: 9000
        },
        {
          item: 2,
          qty: 20,
          rate: 59,
          sale_amount: 1180
        }
      ]
    }
    */

    return apiClient.post(
      '/sales',
      saleData
    )

  },

  /*
  Update sale
  */
  update: (saleId, data) => {

    return apiClient.put(
      `/sales/${saleId}`,
      data
    )

  },

  /*
  Delete sale
  */
  remove: (saleId) => {

    return apiClient.delete(
      `/sales/${saleId}`
    )

  },

}


/*
|--------------------------------------------------------------------------
| Error Handler
|--------------------------------------------------------------------------
*/

export const getErrorMessage = (
  error
) => {

  return (

    error?.response?.data?.message ||

    error?.response?.data?.error ||

    error?.response?.data?.detail ||

    error?.message ||

    'Something went wrong'

  )

}

export default apiClient