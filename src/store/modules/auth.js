import { envirement } from "../../../envirement"
import router from "../../../router"
import { FormDataHelper } from "../../helpers/FormDataHelper"
const state = {
    token: localStorage.getItem("access_token")
}

const getters = {
    getIsAuth: function (state) {
        return state.token !== null
    },
    getToken: function (state){
        return state.token
    }
}
const mutations = {
    setToken: function (state, token) {
        state.token = token
    },

}
const actions = {
    login: function ({ commit }, data) {
        const formData=FormDataHelper(data)
        fetch(envirement.apiUrl + "login", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.access_token){
                    localStorage.setItem("access_token",data.access_token)
                    commit("setToken", data.access_token);
                    router.push({path:"/wizkid-full-control"})
                }

            })
    },

}
export default {
    state, getters, actions, mutations
}