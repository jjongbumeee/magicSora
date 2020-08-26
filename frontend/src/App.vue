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

    <router-view></router-view>
    <book-list v-bind:propsdata="bookList"></book-list>
  </div>
</template>

<script>
import BookHeader from './components/BookHeader.vue'
import BookSearch from './components/BookSearch.vue'
import BookList from './components/BookList.vue'
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
    'book-list': BookList
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
           updatedAt: '',
           filename : host
         }
      ],
      host: host,
    }
  },
  created() {
      this.axios.get(this.host.host+'/book/booktbl')
        .then((res) => {
          this.bookList = res.data//JSON.parse(JSON.stringify(response.data))
          for(var i = 0; i < this.bookList.length; i++) {
            this.bookList[i].filename = this.host.host + '/book/' + this.bookList[i].image;
          }
        })
    },
  methods: {
    searchDB: function(name) { // express에서 책 제목을 이용한 Select Query 구현 - 넘어온 객체 파싱해서 보여주기 필요
      this.axios.post(`${this.host.host}/book/bookSearch`,
        {
          query: name
        })
      .then((res) => {
        this.bookList = res.data;

        for(let i = 0; i < res.data.length; i++) {
          // console.log(this.bookList[i]);
          this.bookList[i].filename = this.host.host + '/book/' + this.bookList[i].image;
        }
        this.bookList = res.data; // backend에서 보낸 book

      }).catch(error => {
        console.log('HTTP Request Failed', error);
      })
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
