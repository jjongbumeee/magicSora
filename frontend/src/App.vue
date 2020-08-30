<template>
  <div>
    <router-link to="/" class="routerLink">
      <span v-on:click="addToggle">
        <book-header/>
      </span>
    </router-link>
    <book-search v-on:search="searchDB"/>

    <router-link to="/addBook"
    v-bind:class="{bookReg : regStatus}"
    class="routerLink"> 
      <span v-on:click="addToggle" class="addBtn">
        책 등록하기
      </span>
    </router-link>

    <router-view/>
    <book-list v-bind:propsdata="bookList" 
    v-on:refresh="refreshItem"
    v-bind:class="{bookReg : regStatus}"/>
    
    <button id="show-modal" @click="showModal = true" style="border : none" 
    v-bind:class="{bookReg : regStatus}">
      <book-footer/>
    </button>
    <modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">Admin Login</h3>
    </modal>
  </div>
</template>

<script>
import BookHeader from './components/BookHeader.vue'
import BookSearch from './components/BookSearch.vue'
import BookList from './components/BookList.vue'
import BookAddItem from './components/BookAddItem.vue'
import BookFooter from './components/BookFooter.vue'
import ModalView from './components/ModalView.vue'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
import host from './assets/iptable.json'
var vueInstance;
export const router = new VueRouter({
  routes: [
    {
      path: '/addBook',
      name: 'AddBookItem',
      component: BookAddItem,
      // redirect: to => {
      //   const {hash,
      //   if()
      // }
    },
    {
      path: '/',
      name: 'MainComponent'
    }
  ]
});

router.beforeEach(async function(to, from, next) {
  if(to.path == "/" && from.path == "/addBook") {
    vueInstance.addToggle();
    vueInstance.refreshItem();
  } 
  next();
});

export default {
  components:{
    'book-header': BookHeader,
    'book-search': BookSearch,
    'book-list': BookList,
    'book-footer': BookFooter,
    'modal' : ModalView,
  },
  data: function() {
    return {
      regStatus : false,
      token : '',
      showModal : false,
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
    
    this.bookList = [];
    this.refreshItem();
    vueInstance = this;
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
      // this.NotRegStat = !this.NotRegStat;
      // this.$router.go();
    },
    refreshItem: function() {
      this.axios.get(this.host.host+'/book/booktbl')
      .then((res) => {
        this.bookList = res.data//JSON.parse(JSON.stringify(response.data))
        for(var i = 0; i < this.bookList.length; i++) {
          this.bookList[i].filename = this.host.host + '/book/' + this.bookList[i].image;
        }
      })
    },
    checkAccount : async function() {
      const vueInstance = this;
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
body {
  text-align: center;
  background-color: #f6f6f6;
}
input {
  border-style: groove;
  widows: 200px;
}
.routerLink {
  text-decoration: none;
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
.bookAdd {
  display: flex;
  justify-content: center;
  padding : 2%;
  margin : 2%;
  list-style-type: none;
  background: white;
  font-size: 1.2rem;
  line-height: 40px;
  /* text-align: center; */
  /* align-content: center; */
  padding-left: 5%;
}
</style>
