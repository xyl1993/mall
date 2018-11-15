// 应用初始状态
//基础状态
const state = {
  collapsed: false,
}
// 定义所需的 mutations
const mutations = {
  changeCollapsed(state) {
    state.collapsed = !state.collapsed;
  },
}

export default {
  state,
  mutations
}