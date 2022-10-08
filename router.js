import VueRouter from "vue-router";
import Vue from "vue";
import WizkidFullControl from "./src/components/WizkidFullControl";
import WizkidControl from "./src/components/WizkidControl";

import Login from "./src/components/Login";

Vue.use(VueRouter);

const routes=[
    {path:"/wizkid-full-control",component:WizkidFullControl},
    {path:"/login",component:Login},
    {path:"/" ,component : WizkidControl}

]

export default new VueRouter({
    base:"/",
    routes:routes
})