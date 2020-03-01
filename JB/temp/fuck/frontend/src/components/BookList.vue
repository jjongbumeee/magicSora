<template>
  <ul class="shadow">
    <div v-for="(bookData) in propsdata" v-bind:key="bookData.bid">
      <img id="bookimg" v-bind:src="bookData.imageBinary">
      <li>
          책 이름: {{ bookData.name }} <br>
          저자: {{ bookData.auth }}<br>
          출판사: {{ bookData.pub }}<br>
          가격: {{ bookData.price | currency }}    
      </li>
    </div>
  </ul>
</template>
<script>
export default {
  props: ['propsdata'],
  filters: {
    // 천 단위 기호 출력 (https://bit.ly/2Pf14QT)
    currency: value => {
      if (!value) return ''
      return value.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,") 
    } 
  },
  methods: {

  }
}
</script>

<style scoped>
  ul{
    display: grid;
    grid-template-columns: 0.4fr 0.5fr;
    /*grid-template-rows: 100px;*/
    padding-left: 0;
    padding : 2%;
    list-style-type: none;
    background: white;
  }
  li {
    font-size: 1.2rem;
    line-height: 70px;
    text-align: left;
    padding-left: 5%;
  }
  #bookimg {
    width: 100%;
    height: 100%;
  }
  @media(max-width: 768px) {
    li {
      font-size: 1rem;      
      line-height: 70px;
    }
    ul {
      grid-template-columns: 0.7fr 1fr;
    }
  }
  @media(max-width: 425px) {
    li {
      font-size: 0.9rem;
      line-height: 40px;
    }
    ul {
      grid-template-columns: 1.3fr 1fr;
      grid-template-rows: 200px;
    }
  }
  @media(max-width: 375px) {
    li {
      padding-left: 7%;
      font-size: 0.6rem;
      line-height: 30px;
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