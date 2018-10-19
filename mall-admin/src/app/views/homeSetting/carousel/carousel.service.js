import api from '../../../utils/api.js';

export const getCarouselList = () => { return api.get(`carousel`).then(res => res.data); };

export const addCarousel = (data) => { return api.post(`admin/carousel`,data).then(res => res.data); };

export const editCarousel = (id,data) => { return api.put(`admin/carousel/${id}`,data).then(res => res.data); };

export const deleteCarousel = (data) => { return api.delete(`admin/carousel/${data}`).then(res => res.data); };