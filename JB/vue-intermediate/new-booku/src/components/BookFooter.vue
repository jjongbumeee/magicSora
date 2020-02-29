<template>
<div>
<div class="adminContainer">
      <router-link to='/login'>
        <span class="adminBtn">관리자 생성</span>
      </router-link>
  
  <div id="contents">
    <button @click="formGiver">show</button>
    <div v-if="comedata"><p>{{ list }}</p></div>
  </div>
</div>
    
  </div>

</template>

<script>
export default {
  data () {
    return {
      list: [],
      comedata: false
    }
  },
  methods: {
    formGiver () {
      this.axios.get('http://localhost:3000/admintbl')
        .then((response) => {
          this.list = JSON.parse(JSON.stringify(response.data))
        })
      this.comedata = true
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