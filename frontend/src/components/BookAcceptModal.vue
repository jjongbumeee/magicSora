<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" v-on:click="$emit('close')">
        <div class="modal-container" v-on:click.stop="">

          <div class="modal-header">
            <slot name="header">
              판매 승인대기 중인 책
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
                <div v-for="(bookData) in propsdata" :key="bookData.bid">
                    <div v-if="!bookData.isaccept">
                        <img id="bookimg" :src=bookData.filename>
                        <li>
                            <p>책 이름: {{ bookData.name }} </p>
                            <p>저자: {{ bookData.auth }}</p>
                            <p>출판사: {{ bookData.pub }}</p>
                            <p>가격: {{ bookData.price | currency }}</p>
                        </li>
                        <button @click="acceptBook(bookData.bid)">판매 승인</button>
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
import host from '../assets/iptable.json'
export default {
    props: ['propsdata'],
    data: function() {
        return {
            host : host
        }
    },
    filters: {
        currency: value => {
            if (!value) return ''
            return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,") 
        } 
    },
    methods: {
        acceptBook : function(bid) {
            let vueInstance = this;
            console.log(this.host.host);
            this.axios.post(this.host.host + '/book/Accept', {
                bid : bid
            })
            .then(function(res) {
                vueInstance.$emit('refresh');
            })
            .catch(function(err) {
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