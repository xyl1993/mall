import api from '../../../utils/api.js';

export const getBrandList = (data) => { return api.get(`brand`,data).then(res => res.data); };

export const addBrand = (data) => { return api.post(`admin/brand`,data).then(res => res.data); };

export const deleteBrand = (data) => { return api.delete(`admin/brand/${data}`).then(res => res.data); };

export const updateBrand = (id,data) => { return api.put(`admin/brand/${id}`,data).then(res => res.data); };


export const getTypeList = (data) => { return api.get(`goods-type`,data).then(res => res.data); };

export const addType = (data) => { return api.post(`admin/goods-type`,data).then(res => res.data); };

export const deleteType = (data) => { return api.delete(`admin/goods-type/${data}`).then(res => res.data); };

export const updateType = (id,data) => { return api.put(`admin/goods-type/${id}`,data).then(res => res.data); };
