<template>
  <form @submit.prevent="checkAccount">
    <div>
        <p> ID : <input type="text" v-model="id"/> </p>
        <p> PW : <input type="text" v-model="pw"/> </p>
        <button type="submit">로그인</button>
    </div>
  </form>
</template>

<script>
import axios from 'axios';
import host from '../../assets/iptable.json';
export default {
  data: function() {
    return  {
      id : "", 
      pw : ""
    }
  },
  methods : {
    checkAccount : async function() {
      // console.log(this.host);
      await axios.post('http://localhost:3000'+`/admin/login`, {
        id: this.id,
        password: this.pw
      })
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      })
    }
  }
}
</script>

<style>

</style>