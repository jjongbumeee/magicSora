<template>

<div class="adminContainer">
    <span v-bind:class="{loggedIn: logged}" class="adminBtn">{{ content }}</span>
</div>

</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import host from './../assets/iptable.json';
export default {
  data: function() {
    return {
      content: "관리자 로그인",
      logged : false
    }
  }, 
  methods : {
    checkAccount : async function() {
      let res = await axios.get(host.host + '/admin/adminCheck', {
        params : {
          token : this.propsdata
        }
      })  
      if(res) {
        this.content = res.data.id + "님 로그인 됨";
        this.logged = true;  
      }
    }
  },
  props: ['propsdata']
}
</script>

<style scoped>
  .adminContainer {
    width: 8.5rem;
    height: 50px;
    line-height: 50px;
    background-color: white;
    border-radius: 5px;
    margin: 0 auto;
  }
  .adminBtn {
    color: #e20303;
    display: block;
  } 
  .loggedIn {
    color: blue;
    display: block;
  }
</style> 