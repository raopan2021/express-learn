import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: false,
    asideWidth: "200px",
    iconDirection: "el-icon-s-fold",
    userInfo: {
      account: "",
      name: "",
      token: "",
    },
    headerTitle: ""
  },
  getters: {
    userInfo: state => state.userInfo,
    headerTitle: state => state.headerTitle
  },
  mutations: {
    collapseMenu (state) {
      state.isCollapse = !state.isCollapse;
      if (state.isCollapse) {
        state.asideWidth = "64px";
        state.iconDirection = "el-icon-s-unfold";
      } else {
        state.asideWidth = "200px";
        state.iconDirection = "el-icon-s-fold";
      }
    },
    setUser (state,payload) {
      state.userInfo = payload;
    },
    clearUser (state) {
      state.userInfo = {
        no: "",
        name: "",
        token: "",
      };
    },
    setHeaderTitle (state,payload) {
      state.headerTitle = payload;
    },
  },
  actions: {},
  modules: {},
});
