<template>
<form @submit.prevent="sendfile" enctype="multipart/form-data">
  <div>
    <div class="bookInfo shadow">
      <p>제 목 : <input type="text" v-model="bookItem.name"></p>
      <p>저 자 : <input type="text" v-model="bookItem.auth"></p>
      <p>출판사 : <input type="text" v-model="bookItem.pub"></p>
      <p>금 액 : <input type="text" v-model="bookItem.price"></p>
      <p>사 진 : <input @change='fileSelect' type="file" name="myfile" ref='refimage' accept="image/*;capture=camera" ></p>
      <button type="submit">등록하기</button>
    </div>
  </div>
</form>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import host from '../assets/iptable.json'
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
        file: ''
      },
      host: host
    }
    
  },

  methods: {
    fileSelect: function() {
      const file = this.$refs.refimage.files[0]
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      
      if(allowedTypes.includes(file.type)) {
        this.bookItem.file = file;
      }
    },
    async sendfile() {
      const formData = new FormData();
      formData.append('file', this.bookItem.file);
      formData.append('name', this.bookItem.name);
      formData.append('auth', this.bookItem.auth);
      formData.append('pub', this.bookItem.pub);
      formData.append('price', this.bookItem.price);
      try {
        await axios.post(this.host.host+'/book/upload', formData );
        console.log(this.host.host);
        this.bookItem.file = ""
      } catch(err) {
        console.log(err);
      }
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
