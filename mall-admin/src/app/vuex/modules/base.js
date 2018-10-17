// 应用初始状态
//基础状态
const state = {
  collapsed: false,
  userInfo: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
}
// 定义所需的 mutations
const mutations = {
  changeCollapsed(state) {
    state.collapsed = !state.collapsed;
  },
  setUserInfo(state, data) {
    Object.assign(state.userInfo, data);
  }
}

export default {
  state,
  mutations
}