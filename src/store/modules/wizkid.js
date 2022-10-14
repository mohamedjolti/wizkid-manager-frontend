import { envirement } from "../../../envirement"
import { FormDataHelper } from "../../helpers/FormDataHelper"

const state = {
    wizkids: [],
}

const getters = {
    getWizkids: function (state) {
        return state.wizkids
    }
}
const mutations = {
    setWizkids: function (state, wizkids) {
        state.wizkids = wizkids
    },
    addWizkid: function (state, newWizkid) {
        return state.wizkids.unshift(newWizkid)
    },
    updateWizkid: function (state, updatedWizkid) {
        state.wizkids.forEach((wizkid, index) => {
            if (wizkid.id == updatedWizkid.id) {
                state.wizkids[index] = updatedWizkid;
            }
        })
    },
    removeWizkid: (state, id) => state.wizkids = state.wizkids.filter(wizkid => wizkid.id != id)
}
const actions = {
    fetchWizkidsForGuest: function ({ commit }) {
        fetch(envirement.apiUrl + "wizkid/list")
            .then(response => response.json())
            .then(data => {
                commit("setWizkids", data);
            })
    },
    fetchWizkidsForUser: function ({ commit }) {
        fetch(envirement.apiUrl + "wizkid/list-full", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            }
        })
            .then(response => response.json())
            .then(data => {
                commit("setWizkids", data);
            })
    },

    addWizkid: function ({ commit }, newWizkid) {
        const formData = FormDataHelper(newWizkid);
        fetch(envirement.apiUrl + "wizkid/create", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                commit("addWizkid", data);
            })
    },
    fire: function (context, wizkidToFire) {
        fetch(envirement.apiUrl + "wizkid/fire/" + wizkidToFire.id, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            }
        })
            .then(response => response.json())
            .then(() => {
                context.dispatch("fetchWizkidsForUser");
            })
    },
    unfire: function (context , wizkidToUnFire) {
        fetch(envirement.apiUrl + "wizkid/unfire/" + wizkidToUnFire.id, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            }
        })
            .then(response => response.json())
            .then(() => {
                context.dispatch("fetchWizkidsForUser");
            })
    },
    editWizkid: function ({ commit }, wizkidToUpdate) {
        const formData = FormDataHelper(wizkidToUpdate);
        formData.set("_method", "PUT")
        fetch(envirement.apiUrl + "wizkid/update/" + wizkidToUpdate.id, {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                commit("updateWizkid", data);
            })
    },
    deleteWizkid: function ({ commit }, wizkidToDelete) {

        fetch(envirement.apiUrl + "wizkid/delete/" + wizkidToDelete.id, {
            method: "delete",
        })
            .then(response => response.json())
            .then(() => {
                commit("removeWizkid", wizkidToDelete.id);
            })
    },
    filterForGuest: function ({ commit },role) {
        fetch(envirement.apiUrl + "wizkid/filter-role-guest/"+role, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            }
        })
            .then(response => response.json())
            .then(data => {
                commit("setWizkids", data);
            })
    },
    filterForUser: function ({ commit },role) {
        fetch(envirement.apiUrl + "wizkid/filter-role-user/"+role, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            }
        })
            .then(response => response.json())
            .then(data => {
                commit("setWizkids", data);
            })
    },

 
}
export default {
    state, getters, actions, mutations
}