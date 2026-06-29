import axios from 'axios'

// const API_BASE_URL = import.meta.env.BACKEND_URL || 'https://ofc-util-backend-production.up.railway.app/api'
const API_BASE_URL = import.meta.env.BACKEND_URL || 'http://192.168.1.12:8000/api'

const adminApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

adminApi.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem(
        'admin_access'
      )

    console.log(
      'TOKEN:',
      token
    )

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`
    }

    console.log(
      'FINAL HEADERS:',
      config.headers
    )

    return config
  }
)

export const adminAuthAPI = {
  login: (username, password) =>
    adminApi.post('/admin/login/', {
      username,
      password,
    }),
}

export const adminFirmAPI = {
  getFirms: () =>
    adminApi.get('/admin/firms/'),

  getFirm: (id) =>
    adminApi.get(`/admin/firms/${id}/`),

  getGSTReport: (firmId, month, year) =>
    adminApi.get(
      `/admin/firms/${firmId}/gst-report/?month=${month}&year=${year}`
    ),

  createFirm: (data) =>
    adminApi.post('/admin/firms/', data),

  updateFirm(id, data) {
    return adminApi.put(`/admin/firms/${id}/`, data);
  },

  deleteFirm(id) {
    return adminApi.delete(`/admin/firms/${id}/`);
  },
}

export const adminSaleAPI = {

  getEditRequests() {
    return adminApi.get("/admin/edit-requests/");
  },

  approveEdit(id) {
    return adminApi.post(`/admin/edit-requests/${id}/approve/`);
  },

  rejectEdit(id) {
    return adminApi.post(`/admin/edit-requests/${id}/reject/`);
  },

};

export const adminItemAPI = {

  getItems: () =>
    adminApi.get('/admin/items/'),

  createItem: (data) =>
    adminApi.post(
      '/admin/items/',
      data
    ),

}

export default adminApi