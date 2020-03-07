<template>
<div>
<div class="adminContainer">
        <span class="adminBtn">관리자 생성</span>
</div>
    <div id="contents">
    <button @click="bookGiver">show</button>
    <p v-if=bookdata>{{ booklist }}</p>
  </div>
</div>

</template>

<script>
import host from '../assets/iptable.json'
export default {
  data () {
    return {
      list: [],
      booklist: [],
      comedata: false,
      bookdata: false,
      host: host
    }
  },
  methods: {
    bookGiver() {
      this.axios.get('http://'+this.host.host+'/booktbl')
        .then((response) => {
          this.booklist = JSON.parse(JSON.stringify(response.data))
          this.$emit('bookAdded', this.booklist)
        })
        this.bookdata = true
    }
  }
}
</script>

<style scoped>
  .adminContainer {
    width: 8.5rem;
    height: 50px;
    line-height: 50px;
    background-color: white;
    border-radius: 5px;
    margin: 0 auto;
  }
  .adminBtn {
    color: #e20303;
    display: block;
  } 

</style>