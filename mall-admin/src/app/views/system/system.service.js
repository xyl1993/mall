import api from '../../utils/api.js';

//退出登录
export const logOut = () => { return api.post(`system/user/logOut`).then(res => res.data); };

export const updatePassword = (data) => { return api.put(`system/user/password`, data).then(res => res.data); }
