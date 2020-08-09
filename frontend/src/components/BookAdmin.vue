<template>
  <div id="contents">
    <button @click="formGiver">show</button>
    <div v-if="comedata"><p>{{ list }}</p></div>
  </div>
</template>

<script>
import host from '../assets/iptable.json'
export default {
  data () {
    return {
      list: [],
      comedata: false,
      host: host
    }
  },
  methods: {
    formGiver () {
      this.axios.get('http://'+this.host.host+'/db/admin')
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