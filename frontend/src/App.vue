<template>
  <div>
    <router-link to="/" class="routerLink">
      <span>
        <book-header/>
      </span>
    </router-link>
    <book-search @search="searchDB"/>

    <span id="show-modal" @click="showBookModal = true" style="border : none" class="addBtn">
      책 등록하기
    </span>
    <book-modal v-if="showBookModal" @close="showBookModal = false; refreshItem()" >
      <h3 slot="header">판매하실 책을 등록해주세요</h3>
    </book-modal>

    <span id="show-modal" @click="showReadyModal = true" style="border : none" class="addBtn" v-if="logged">
      판매 승인
    </span>
    <book-accept v-if="showReadyModal" @close="showReadyModal = false; refreshItem()" :propsdata="bookList">
      <h3 slot="header">판매 승인대기 중인 책</h3>
    </book-accept>


    <router-view/>
    <book-list :propsdata="bookList"
    @refresh="refreshItem" :loggedIn="logged" :class="{bookReg : regStatus}"/>
    
    <button id="show-modal" @click="showAdminModal = true" style="border : none" 
    :class="{bookReg : regStatus}">
      <book-footer :propsdata="token" ref="footer"/>
    </button>
    <admin-modal v-if="showAdminModal" @close="showAdminModal = false" @token="getToken">
      <h3 slot="header">Admin Login</h3>
    </admin-modal>
  </div>
</template>

<script>
import BookHeader from './components/BookHeader.vue'
import BookSearch from './components/BookSearch.vue'
import BookList from './components/BookList.vue'
// import BookAddItem from './components/BookAddItem.vue'
import BookFooter from './components/BookFooter.vue'
import AdminModalView from './components/AdminModalView.vue'
import BookModalView from './components/BookModalView.vue'
import BookAcceptModal from './components/BookAcceptModal.vue'
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
    // { //TODO: 최종 확인 후 불필요한 경우 라우터 제거
    //   path: '/addBook',
    //   name: 'AddBookItem',
    //   component: BookAddItem,
    // },
    {
      path: '/',
      name: 'MainComponent'
    }
  ]
});

// router.beforeEach(async function(to, from, next) {
//   if(to.path == "/" && from.path == "/addBook") {
//     vueInstance.addToggle();
//     vueInstance.refreshItem();
//   } 
//   next();
// });

export default {
  components:{
    'book-header': BookHeader,
    'book-search': BookSearch,
    'book-list': BookList,
    'book-footer': BookFooter,
    'admin-modal' : AdminModalView,
    'book-modal' : BookModalView,
    'book-accept' : BookAcceptModal,
  },
  data: function() {
    return {
      regStatus : false,
      logged : false,
      token : '',
      showAdminModal : false,
      showBookModal : false,
      showReadyModal : false,
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
           filename : host,
           issell : false
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
    },
    refreshItem: function() {
      this.axios.get(this.host.host+'/book/booktbl')
      .then((res) => {
        console.log(res);
        this.bookList = res.data//JSON.parse(JSON.stringify(response.data))
        for(var i = 0; i < this.bookList.length; i++) {
          this.bookList[i].filename = this.host.host + '/book/' + this.bookList[i].image;
        }
      })
    },
    getToken : function(payload) {
      this.token = payload.token;
      this.logged = true;
      setTimeout(() => { // 바로 checkAccount 실행 시 에러 발생함, 시간 간격을 둠
        this.$refs.footer.checkAccount();
      }, 100);
    }
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
