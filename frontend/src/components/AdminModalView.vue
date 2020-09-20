<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" v-on:click="$emit('close')">
        <div class="modal-container" v-on:click.stop="">

          <div class="modal-header">
            <slot name="header">
              관리자 로그인
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <p>ID : <input type="text" v-model="id"></p>
              <p>PW : <input type="password" v-model="pw" v-on:keyup.enter="accountCheck"></p>
            </slot>
          </div>
          <button class="modal-default-button" @click="accountCheck">
            OK
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueSimpleAlert from 'vue-simple-alert';
import host from '../assets/iptable.json';
Vue.use(VueSimpleAlert);
export default {
  data: function() {
    return {
      id: '',
      pw: '',
      token: '',
    }
  },
  methods : {
    accountCheck: async function() {
      const vue = this;
      await axios.post(host.host+`/admin/login`, {
        id: this.id,
        password: this.pw
      })
      .then(function(res) {
        vue.token = res.data.token;
        window.localStorage.setItem('token', res.data.token);
        vue.$alert("관리자 로그인되었습니다.");
        vue.$emit('token', {token : res.data.token});
        axios.post(host.host + '/time', {})
        .then(function(res) {
          window.localStorage.setItem('time', res.data.time);
        })
        .catch(function(err) {
          console.log(err);
        })
      })
      .catch(function(err) {
        console.log(err);
        vue.$alert("관리자 계정 정보를 다시 확인해주세요.");
      })
      
      this.$emit('close');
    }
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: center;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 2;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>