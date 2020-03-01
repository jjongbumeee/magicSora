<template>
  <div>
    <div class="bookInfo shadow">
      <p>제 목 : <input type="text" v-model="bookItem.name"></p>
      <p>저 자 : <input type="text" v-model="bookItem.auth"></p>
      <p>출판사 : <input type="text" v-model="bookItem.pub"></p>
      <p>금 액 : <input type="text" v-model="bookItem.price"></p>
      <p>사 진 : <input v-on:change='fileSelect()' type="file" ref='refimage' accept="image/*;capture=camera"></p>
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
        price: 0,
        image: '',
        output: '',
      },
    }
    
  },

  methods: {
    fileSelect: function() {
      console.log(this.$refs.refimage.files[0]); 
      this.bookItem.image = window.btoa(this.$refs.refimage.files[0])
      console.log(this.bookItem.image);
      
    },
    bookReg: function() {
      //this.$emit('bookReg', this.bookItem);
      let formData = new FormData()
      formData.append('image', this.bookItem.image)
      formData.append('name', this.bookItem.name)
      formData.append('auth', this.bookItem.auth)
      formData.append('pub', this.bookItem.pub)
      formData.append('price', this.bookItem.price)
      
      let config = {
        header: {
          'Content-Type' : 'image/png'
        }
      }
      this.axios.post('http://localhost:3000/book_receiver', formData, config)
        .then((response) => {
          this.output = response.data
          this.bookItem.name = this.bookItem.auth = this.bookItem.pub = this.bookItem.price = '';
          this.fil = ''
        })
        .catch((error) => {
          this.output = error
        })
        
    },
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