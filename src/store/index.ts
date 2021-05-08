import Vue from 'vue'
import Vuex from 'vuex'
import { getIntersection } from '../utils'
import { symbolsToDisplay } from '../constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: {}
  },
  mutations: {
    getdata(state, data) {
      state.data = data
    }
  },
  actions: {
    GET_DATA(state, data) {
      const { tokens = [] } = data
      // const tokensToDisplay = getIntersection(tokens, symbolsToDisplay, 'symbol')
      state.commit('getdata', data)
    }
  }
})
