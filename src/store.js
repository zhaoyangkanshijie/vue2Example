import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileURL: 'http://localhost:12039',
    apiURL: 'http://localhost:7675',
    url: '',
    courseItem: null
  },
  getters: {

  },
  mutations: {
    setFromURL (state, url) {
      state.url = url;
    },
    setCourseItem (state, arr) {
      state.courseItem = arr;
    }
  },
  actions: {

  }
})
