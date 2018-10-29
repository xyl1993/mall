import api from '../../utils/api.js';

export const getProgramUserList = (data) => { return api.get(`admin/user/program`,data).then(res => res.data); };


export const pdateProgramUserAdmin = (data) => { return api.put(`admin/user/program/${data}/is_admin`).then(res => res.data); };
