<template>
  <div id="contents">
     <input type="text" placeholder="id" v-model="id">
     <input type="text" placeholder="password" v-model="password">
     <button @click="formSubmit()">submit</button>
  </div>
</template>
<script>

export default {
  data () {
    return {
      id: '',
      password: '',
      output: ''
    }
  },
  methods: {
    formSubmit () {
      this.axios.post('http://localhost:3000/form_receiver', {
        id: this.id,
        password: this.password
      })
        .then((response) => {
          this.output = response.data
          this.id = ''
          this.password = ''
        })
        .catch((error) => {
          this.output = error
        })
    }
  }
}
</script>