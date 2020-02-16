<template>
  <div>
      <ul>
        <li class= "shadow" v-for="(todoItem, index) in todoItems" v-bind:key="todoItem.item">
          <i class="checkBtn fas fa-check" v-on:click="toggleComplete(todoItem, index)" 
          v-bind:class="{checkBtnCompleted: todoItem.completed}"></i>
          <span v-bind:class="{textCompleted: todoItem.completed}"> {{ todoItem.item }} </span>
          <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
            <i class="fas fa-trash"></i>
          </span>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      todoItems: []
    }
  },
  created: function() {
    if(localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i ++) {
        if(localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          // this.todoItems.push(localStorage.key(i));
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
        // console.log(localStorage.key(i));
      }
    }
  },
  methods: {
    removeTodo: function(todoItem, index) {
      localStorage.removeItem(todoItem.item);
      //console.log(todoItem + ", "+index);
      this.todoItems.splice(index, 1);
    },
    toggleComplete: function(todoItem, index) {
      // var changedItem = todoItem;
      // changedItem.completed = true;
      // localStorage.setItem(todoItem.item, JSON.stringify(changedItem));
      todoItem.completed = !todoItem.completed;
      //localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
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
</style>