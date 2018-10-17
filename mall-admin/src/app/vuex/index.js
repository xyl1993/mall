//vuex全局配置
import Vue from 'vue'
import Vuex from 'vuex'
import baseStore from './modules/base'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

console.log(process.env.NODE_ENV);

export default new Vuex.Store({
  modules: {
    baseStore
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})