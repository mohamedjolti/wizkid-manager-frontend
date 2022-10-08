import Vuex from "vuex"
import Vue from "vue"
import wizkid from "./modules/wizkid"


Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
      wizkid
    }
})