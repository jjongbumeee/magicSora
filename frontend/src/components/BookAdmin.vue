<template>
  <div id="contents">
    <button @click="formGiver">show</button>
    <div v-if="comedata"><p>{{ list }}</p></div>
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
      this.axios.get('http://localhost:3000/admin')
        .then((response) => {
          this.list = JSON.parse(JSON.stringify(response.data))
        })
      this.comedata = true
    }
  }
}
</script>

<style>

</style>