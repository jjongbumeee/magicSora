<template>
  <form @submit.prevent="checkAccount">
    <div>
        <p> ID : <input type="text" v-model="id"/> </p>
        <p> PW : <input type="text" v-model="pw"/> </p>
        <button type="submit">로그인</button>
        <router-link to="/adminAccess">
          <p>
            <input type="button" value="관리자 로그인">
          </p>
        </router-link>
        <p><router-view></router-view></p>
    </div>
  </form>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import host from '../../assets/iptable.json';
import VueRouter from 'vue-router';
import AdminAccess from './adminAccess.vue';
Vue.use(VueRouter);
var vue;

export const router = new VueRouter({
   routes: [
    {
      path: '/',
      name: 'Main'
    },
    {
      path: '/adminAccess',
      component: AdminAccess,
      name: 'adminPage',
      // meta: {authRequired : true},
    }
  ],
});

router.beforeEach(async function(to, from, next) {
  console.log(vue);
  if(to.path == "/adminAccess") {
    console.log("adminPage access");
    await axios.get(host.host + '/admin/adminCheck', {
      params: {
        token: vue.token
      }
    })
    .then(res=> {
      console.log(res);
      next();
    })
    .catch(err => {
      console.log(err);
    })
  }
})
export default {
  // components : {
  //   'admin-access': AdminAccess,
  // },
  data: function() {
    return  {
      id : "", 
      pw : "",
      token : ""
    }
  },
  methods : {
    checkAccount : async function() {
      const vueInstance = this;
      vue = vueInstance;
      await axios.post(host.host+`/admin/login`, {
        id: this.id,
        password: this.pw
      })
      .then(function(res) {
        vueInstance.token = res.data.token;
      })
      .catch(function(err) {
        console.log(err);
      })
    },
  },
  router: router,
}
</script>

<style>

</style>