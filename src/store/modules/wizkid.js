import { envirement } from "../../../envirement"
import { FormDataHelper } from "../../helpers/FormDataHelper"

const state = {
    wizkids: []
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
    addWizkid:  function(state,newWizkid){
        state.wizkids = [newWizkid,...state.wizkids]
    },
    updateWizkid:  function(state,updatedWizkid){
        state.wizkids.forEach(wizkid => {
             if(wizkid.id ==  updatedWizkid.id){
                wizkid=updatedWizkid;
             }
        })
    }
}
const actions = {
    fetchWizkidsForGuest: function ({ commit }) {
        fetch(envirement.apiUrl + "wizkid/list")
            .then(response => response.json())
            .then(data => {
                commit("setWizkids", data);
            })
    },
    addWizkid: function (newWizkid,{ commit }) {
        const formData=FormDataHelper(newWizkid);
        fetch(envirement.apiUrl + "wizkid/create",{
            method:"POST",
            body:formData
        })
            .then(response => response.json())
            .then(data => {
                commit("setWizkids", data);
            })
    },
    editWizkid: function (wizkidToUpdate,{ commit }) {
        const formData=FormDataHelper(wizkidToUpdate);
        fetch(envirement.apiUrl + "wizkid/update/"+wizkidToUpdate.id,{
            method:"POST",
            body:{
                ...formData,
                _method:"PUT"// by passed Put request problems
            }
        })
            .then(response => response.json())
            .then(data => {
                commit("updateWizkid", data);
            })
    },
}
export default {
    state, getters, actions, mutations
}