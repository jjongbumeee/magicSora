<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" v-on:click="$emit('close')">
        <div class="modal-container" v-on:click.stop="">

          <div class="modal-header">
            <slot name="header">
              
            </slot>
          </div>
          <form @submit.prevent="sendfile" enctype="multipart/form-data">
            <div class="modal-body">
              <slot name="body">
                <p>제 목 : <input type="text" v-model="bookItem.name"></p>
                <p>저 자 : <input type="text" v-model="bookItem.auth"></p>
                <p>출판사 : <input type="text" v-model="bookItem.pub"></p>
                <p>판매희망가 : <input type="number" v-model="bookItem.price"></p>
                <p>사 진 : <input @change='fileSelect' type="file" name="myfile" ref='refimage' accept="image/*;capture=camera" ></p>
              </slot>
            </div>
            <button class="modal-default-button">
              OK
            </button>
          </form>
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
  props: ['logged'],
  data: function() {
    return {
      bookItem: {
        name: '',
        auth: '',
        pub: '',
        price: 5000,
        image: '',
        output: '',
        file: ''
      },
    }
  },
  methods : {
    fileSelect: function() {
      const file = this.$refs.refimage.files[0]
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        
      if(allowedTypes.includes(file.type)) {
        this.bookItem.file = file;
      }
    },
    sendfile : function() {
      let vm = this;
      const formData = new FormData();
      formData.append('file', this.bookItem.file);
      formData.append('name', this.bookItem.name);
      formData.append('auth', this.bookItem.auth);
      formData.append('pub', this.bookItem.pub);
      formData.append('price', this.bookItem.price);

      axios.post(host.host + '/book/upload', formData)
      .then(function(response) {
        if(vm.logged) {
          axios.post(host.host + '/book/Accept', {
            bid: response.data.bid
          })
          .then(function(res) {
            vm.$emit('close');
          })
          .catch(function(err) {
            console.log(err);
          })
        }
        else {
          alert('관리자의 승인 이후 책이 등록됩니다.');
          vm.$emit('close');
        }
      })
      .catch(function(err) {
        console.log(err);
      }) 
    },
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