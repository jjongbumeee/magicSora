<template>
  <div>
    <div class="bookInfo shadow">
      <p>제 목 : <input type="text" v-model="bookItem.name"></p>
      <p>저 자 : <input type="text" v-model="bookItem.auth"></p>
      <p>출판사 : <input type="text" v-model="bookItem.pub"></p>
      <p>금 액 : <input type="text" v-model="bookItem.price"></p>
      <button v-on:click="bookReg">등록하기</button>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      bookItem: {
        name: '',
        auth: '',
        pub: '',
        price: 0
      }
    }
  },
  methods: {
    bookReg: function() {
      this.$emit('bookReg', this.bookItem);
      this.bookItem.name = this.bookItem.auth = this.bookItem.pub = this.bookItem.price = '';
    }
  }
}
</script>

<style scoped>
 bookInfo{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 300px;
    padding-left: 0;
    padding : 2%;
    list-style-type: none;
    background: white;
    font-size: 1.2rem;
    line-height: 70px;
    text-align: left;
    padding-left: 5%;
  }
</style>