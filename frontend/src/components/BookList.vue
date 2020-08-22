<template>
  <ul class="shadow">
    <div v-for="(bookData) in propsdata" v-bind:key="bookData.bid" id="cs">
      <img id="bookimg" :src=bookData.filename>
      <li>
          책 이름: {{ bookData.name }} <br>
          저자: {{ bookData.auth }}<br>
          출판사: {{ bookData.pub }}<br>
          가격: {{ bookData.price | currency }}    
      </li>
      <button v-on:click="bookDelete(bookData.bid)">삭제</button>
    </div>
  </ul>
</template>
<script>
import host from '../assets/iptable.json'

export default {
  props: ['propsdata'],
  filters: {
    // 천 단위 기호 출력 (https://bit.ly/2Pf14QT)
    currency: value => {
      if (!value) return ''
      return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,") 
    } 
  },
  data: function() {
    return {
      host: host
    }
  },
  methods: {
    bookDelete : async function(bid) {
      try{
        const deleteObj = {
          bid : bid,
        }
        await this.axios.post(this.host.host+'/db/bookDelete', deleteObj)
        this.$emit('refresh');
      } catch(err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped>
  ul{
    grid-template-columns: 0.4fr 0.5fr;
    padding-left: 0;
    padding : 2%;
    list-style-type: none;
    background: white;
  }
  #cs {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    /* margin: 15px; */
  }
  li {
    font-size: 1.0em;
    line-height: 32.5px;
    text-align: left;
    padding-left: 5%;
    padding-right: 10%;
  }
  #bookimg {
    width: 10rem;
    height: 15rem;
  }
  @media(max-width: 768px) {
    #cs {
      grid-template-rows: 200px;
    }
    li {
      font-size: 0.9rem;      
      line-height: 50px;
    }
    ul {
      grid-template-columns: 0.7fr 0.7fr;
    }
  }
  @media(max-width: 425px) {
    li {
      font-size: 0.7rem;
      line-height: 32.5px;
    }
    ul {
      grid-template-columns: 1.3fr 1fr;
      grid-template-rows: 200px;
    }
  }
  @media(max-width: 375px) {
    li {
      padding-left: 7%;
      font-size: 0.7rem;
      line-height: 32.5px;
    }
    ul {
      grid-template-columns: 1.3fr 1fr;
      grid-template-rows: 150px;
    }
  }
  .removeBtn {
    margin-left: auto;
    color: #de4343;
  }
  .checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-right: 5px;
  }
  .checkBtnCompleted {
    color: #b3adad;
  }
  .textCompleted {
    text-decoration: line-through;
    color: #b3adad;
  }
  /* ListItem Transition Effect */
    .list-enter-active, .list-leave-active {
    transition: all 1s;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
    }
.bookImgContainer {
  float: right;
  background: linear-gradient(to right, #6478fb, #8763fb);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
</style>