<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <!-- v-on:하위 컴포넌트에서 발생시킨 이벤트 이름 = "상위 컴포넌트에서 실행할 메서드 명" -->
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
    <!-- v-bind:하위 컴포넌트의 프롭스 데이터 이름 = "상위 컴포넌트에서 전달할 데이터" -->
    <TodoList 
    v-bind:propsdata = "todoItems"
    v-on:removeItem="removeOneItem"
    v-on:toggleItem="toggleOneItem"></TodoList>
    <TodoFooter v-on:removeAll="removeItems"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'


export default {
  data: function() {
    return {
      todoItems: []
    }
  },
  methods: {
    addOneItem: function(todoItem) {
      var obj = {
          completed: false,
          item: todoItem
        };
        localStorage.setItem(todoItem, JSON.stringify(obj));
        this.todoItems.push(obj);
    },
    removeOneItem: function(todoItem, index) {
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
    },
    toggleOneItem: function(todoItem, index) {
      // todoItem.completed = !todoItem.completed;
      this.todoItems[index].completed = !this.todoItems[index].completed;
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    removeItems: function() {
      localStorage.clear();
      this.todoItems = [];
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
  components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter,
  }
}
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f6;

}
input {
  border-style: groove;
  widows: 200px;
}
button {
  border-style: groove;
}
.shadow{
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}

</style>