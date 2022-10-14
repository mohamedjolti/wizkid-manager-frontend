import Vuex from "vuex"
import Vue from "vue"
import wizkid from "./modules/wizkid"
import auth from "./modules/auth"


Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
      wizkid,
      auth
        }
})