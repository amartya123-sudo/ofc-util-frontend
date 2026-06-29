import axios from 'axios'

const API_BASE_URL = import.meta.env.BACKEND_URL || 'https://ofc-util-backend-production.up.railway.app/api'

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
      '/sales/',
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
      '/sales/',
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
      '/sales/',
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
      '/sales/',
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

  requestEdit(saleId) {
    return apiClient.post(`/sales/${saleId}/request-edit/`);
  },

  update(saleId, saleData) {
    return apiClient.put(`/sales/${saleId}/`, saleData);
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