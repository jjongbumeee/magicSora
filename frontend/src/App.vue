<template>
  <div>
    <book-header></book-header>
    <book-search v-on:search="searchDB"></book-search>

    <router-link to="/addBook" class="addBtn" v-bind:class="{NotRegStat: regStatus}">
    <span v-on:click="addToggle">책 등록하기</span>
    </router-link>

    <router-link to="/" class="addBtn" v-bind:class="{bookReg: regStatus}">
    <span v-on:click="addToggle">돌아가기</span>
    </router-link>

    <router-view v-on:bookReg="addItem"></router-view>
    <book-list v-bind:propsdata="bookList"></book-list>
    <book-footer></book-footer>
  </div>
</template>

<script>
import BookHeader from './components/BookHeader.vue'
import BookSearch from './components/BookSearch.vue'
import BookList from './components/BookList.vue'
import BookFooter from './components/BookFooter.vue'
import BookAddItem from './components/BookAddItem.vue'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
import host from './assets/iptable.json'

export const router = new VueRouter({
  routes: [
    {
      path: '/addBook',
      name: 'AddBookItem',
      component: BookAddItem
    },
    {
      path: '/',
      name: 'MainComponent'
    }
  ]
});
export default {
  components:{
    'book-header': BookHeader,
    'book-search': BookSearch,
    'book-list': BookList,
    'book-footer': BookFooter
  },
  data: function() {
    return {
      regStatus : true,
      NotRegStat : false,
      bookList: [
          {
           name : '',
           auth : '',
           pub: '',
           price: 0,
           bid : 1,
           image : '',
           createdAt: '',
           updatedAt: ''
         }
      ],
      host: host
    }
  },
  created() {
    // console.log(this.host.host);
    
      this.axios.get('http://'+this.host.host+'/booktbl')
        .then((response) => {
          this.bookList = response.data//JSON.parse(JSON.stringify(response.data))
          
          
          /*var img, bin =''
          for(var i = 0; i < this.bookList.length; i++) {
            img = this.bookList[i].image.data
            for(var j = 0; j < image.length; j++) { 
              bin = bin + String.fromCharCode(this.bookList[i].image.data[j])
            }
            //bin = atob(bin)
            //console.log(bin)
            var bytes = new Uint8Array(bin)
            var blob = new Blob([bytes], {type:'image/jpg'})
            this.bookList[i].imageBinary = URL.createObjectURL(blob).substr(5)
            URL.revokeObjectURL(blob)
          }*/
        })
    },
  methods: {
    searchDB: function(name) {
      //console.log(name + ' DB 검색');
      // DB 코드 추가
      for(var i = 0; i < this.bookList.length; i++) {
        if(this.bookList[i].name === name) {
          //console.log(name + ' 존재');
        }
      }
    },
    addToggle: function() {
      this.regStatus = !this.regStatus;
      this.NotRegStat = !this.NotRegStat;
      // this.$router.go();
    },
    //addItem: function(bookInfo) {
      //console.log(bookInfo.name + ' ' + bookInfo.auth + ' ' + bookInfo.pub + ' ' + bookInfo.price);
    //},
  },
  router: router,
}
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f6;
}
input {
  border-style: groove;
  widows: 200px;
}
button {
  border-style: groove;
}
.addBtn {
     /* margin-top: 10px; */
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: white;
    border-radius: 5px;
    margin: 15px auto;
    display: block;
    color: #6478fb;
 }
.shadow{
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
.bookReg {
  display: none;
  visibility: hidden;
}
</style>
