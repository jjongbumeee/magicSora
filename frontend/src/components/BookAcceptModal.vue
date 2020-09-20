<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop="">

          <div class="modal-header">
            <slot name="header">
              판매 승인대기 중인 책
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
                <div v-for="bookData in propsdata" :key="bookData.bid">
                    <div v-if="!bookData.isaccept">
                        <img id="bookimg" :src=bookData.filename>
                        <li>
                            <p>책 이름: {{ bookData.name }} </p>
                            <p>저자: {{ bookData.auth }}</p>
                            <p>출판사: {{ bookData.pub }}</p>
                            <p>가격: {{ bookData.price | currency }}</p>
                        </li>
                        <button @click="acceptBook(bookData.bid)">판매 승인</button>
                        <button @click="deleteBook(bookData.bid)">판매 거절</button>
                        <br>
                    </div>
                </div>
            </slot>
          </div>
          <button class="modal-default-button" @click="$emit('close')">
            OK
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import host from '../assets/iptable.json';
import axios from 'axios';
export default {
  props: ['propsdata', 'logged'],
  filters: {
    currency: value => {
      if (!value) return ''
      return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,") 
    } 
  },
  methods: {
    acceptBook : function(bid) {
      if(!this.logged) {
        console.log("Access Denied! You need admin access");
        return;
      }
      let vm = this;
      axios.get(host.host + '/admin/adminCheck', {
        params: {
          token : window.localStorage.getItem('token')
        }
      })
      .then(function(response) {
        axios.post(host.host + '/book/Accept', {
          bid : bid
        })
        .then(function(res) {
          // modal close & reopen
          vm.$emit('close');
          vm.$parent.refreshItem();
          vm.$parent.getReadyModal();
        })
        .catch(function(err) {
          console.log(err);
        })
      })
      .catch(function(err) {
        alert("정상적인 접근 경로가 아닙니다.\n페이지를 새로고침 후 다시 시도 해주세요.");
        console.log(err);
      })
    },
    deleteBook : function(bid) {
      let vm = this;
      if(!this.logged) {
        console.log("Access Denied! You need admin access");
        return;
      }
      axios.get(host.host + '/admin/adminCheck', {
        params: {
          token : window.localStorage.getItem('token')
        }
      })
      .then(function(response) {
        axios.post(host.host + '/book/bookDelete', {
          bid : bid
        })
        .then(function(res) {
          // modal close & reopen
          vm.$emit('close');
          vm.$parent.refreshItem();
          vm.$parent.getReadyModal();
        })
        .catch(function(err) {
          console.log(err);
        })
      })
      .catch(function(err) {
        alert("정상적인 접근 경로가 아닙니다.\n페이지를 새로고침 후 다시 시도 해주세요.");
        console.log(err);
      })
    }
  }
}
</script>

<style>
    #cs {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    /* margin: 15px; */
  }
  #bookimg {
    max-width: 100%;
    width: 10rem;
    height: auto !important;
  }
</style>