import { api } from '../api/client.js';

export const listingsApi = {
  list: (params = {}) => api.get('/listings', { params }).then((r) => r.data),
  getOne: (id) => api.get(`/listings/${id}`).then((r) => r.data),
  create: (payload) => api.post('/listings', payload).then((r) => r.data),
  update: (id, payload) => api.patch(`/listings/${id}`, payload).then((r) => r.data),
  remove: (id) => api.delete(`/listings/${id}`).then((r) => r.data),
  uploadPhoto: (id, file) => {
    const fd = new FormData();
    fd.append('photo', file);
    return api
      .post(`/listings/${id}/photos`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then((r) => r.data);
  },
  deletePhoto: (id, url) =>
    api.delete(`/listings/${id}/photos`, { data: { url } }).then((r) => r.data),
};
