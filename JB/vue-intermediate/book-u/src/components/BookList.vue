<template>
  <ul class="shadow">
      <li>
          책 이름: 박현우 망해라<br>
          저자: 정종범<br>
          출판사: 전북대학교 컴퓨터공학부<br>
          가격: 30,000원
          
      </li>
      <i class="fas fa-book shadow bookImgContainer"></i>
  </ul>
</template>

<script>
export default {

}
</script>

<style scoped>
  ul{
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0px;
    text-align: left;
    /* width: ; */
    margin-left: auto;
    margin-right: auto;
    /* align-items: center; */
  }
  li {
    display: flex;
    min-height: 50px;
    height: auto;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
    border-style: none;
    /* text-align: center; */
  }
  .removeBtn {
    margin-left: auto;
    color: #de4343;
  }
  .checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-right: 5px;
  }
  .checkBtnCompleted {
    color: #b3adad;
  }
  .textCompleted {
    text-decoration: line-through;
    color: #b3adad;
  }
  /* ListItem Transition Effect */
    .list-enter-active, .list-leave-active {
    transition: all 1s;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
    }
.bookImgContainer {
  float: right;
  background: linear-gradient(to right, #6478fb, #8763fb);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
</style>