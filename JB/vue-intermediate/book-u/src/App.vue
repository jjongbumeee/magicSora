<template>
  <div>
    <book-header></book-header>
    <book-search></book-search>
    <book-list></book-list>
    <book-footer></book-footer>
  </div>
</template>

<script>
import BookHeader from './components/BookHeader.vue'
import BookSearch from './components/BookSearch.vue'
import BookList from './components/BookList.vue'
import BookFooter from './components/BookFooter.vue'

export default {
  components:{
    'book-header': BookHeader,
    'book-search': BookSearch,
    'book-list': BookList,
    'book-footer': BookFooter
  },
  data: function() {
    return {
      bookList: []
    }
  }
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
.shadow{
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>