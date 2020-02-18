<template>
  <div>
      <transition-group name="list" tag="ul">
        <li class= "shadow" v-for="(todoItem, index) in propsdata" v-bind:key="todoItem.item">
          <i class="checkBtn fas fa-check" v-on:click="toggleComplete(todoItem, index)" 
          v-bind:class="{checkBtnCompleted: todoItem.completed}"></i>
          <span v-bind:class="{textCompleted: todoItem.completed}"> {{ todoItem.item }} </span>
          <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
            <i class="fas fa-trash"></i>
          </span>
        </li>
      </transition-group>
  </div>
</template>

<script>
export default {
  props: ['propsdata'],
  methods: {
    removeTodo: function(todoItem, index) {
      this.$emit('removeItem', todoItem, index);

    },
    toggleComplete: function(todoItem, index) {
      this.$emit('toggleItem', todoItem, index);
      // var changedItem = todoItem;
      // changedItem.completed = true;
      // localStorage.setItem(todoItem.item, JSON.stringify(changedItem));
      
      //localStorage.removeItem(todoItem.item);
      
    }
  }
}
</script>

<style scoped>
  ul{
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0px;
    text-align: left;
  }
  li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
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
</style>