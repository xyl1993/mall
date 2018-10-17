import api from '../../../utils/api.js';

export const webLoigin = (data) => { return api.get(`admin/user/auth`,data).then(res => res.data); };

