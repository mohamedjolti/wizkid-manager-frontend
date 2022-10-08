<template>
  <div>
    <div v-for="wizkid in getWizkids" v-bind:key="wizkid.id">
         {{wizkid.name}}
      </div>  </div>
</template>

<script>
import {mapGetters,mapActions} from "vuex"

export default {
      computed :{
      ...mapGetters(["getWizkids"])
    },
    mounted(){
      this.fetchWizkidsForGuest();
    },
    data(){
        return {

        }
    },
    methods:{
        ...mapActions(["fetchWizkidsForGuest"])
    }
}
</script>

<style>

</style>