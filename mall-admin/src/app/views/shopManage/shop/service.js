import api from '../../../utils/api.js';

export const getProductList = (data) => { return api.get(`product`,data).then(res => res.data); };

export const addProduct = (data) => { return api.post(`admin/product`,data).then(res => res.data); };

export const deleteProduct = (data) => { return api.delete(`admin/product/${data}`).then(res => res.data); };

export const getProductDetail = (data) => { return api.get(`product/${data}`).then(res => res.data); };

export const editProductDetail = (id,data) => { return api.put(`admin/product/${id}`,data).then(res => res.data); };

export const updateRecommend = (id,data) => { return api.put(`admin/product/${id}/updateRecommend`,data).then(res => res.data); };

export const deleteSpecifications = (id) => { return api.delete(`admin/specifications/${id}`).then(res => res.data); };

