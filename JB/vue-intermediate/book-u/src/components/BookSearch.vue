<template>
  <div class="inputBox shadow">
      <input type="text" v-model="searchItem" v-on:keyup.enter="bookSearch">
      <span class="searchContainer" v-on:click="bookSearch">
          <i class="fas fa-search searchBtn"></i>
      </span>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      searchItem: ""
    }
  },
  methods: {
    bookSearch: function() {
      this.$emit('search', this.searchItem);
      this.searchItem = '';
    }
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
  width: 80%;
  text-align: center;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.searchContainer {
  float: right;
  background: linear-gradient(to right, #6478fb, #8763fb);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.searchBtn {
  color: white;
  vertical-align: middle;
}
.closeModalBtn{
  color: #42b983;
}
</style>