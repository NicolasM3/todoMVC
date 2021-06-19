<template>
  <section>
    <header class="header">
      <h1>todos</h1>
      <input v-model="newTodo" class="new-todo" autofocus autocomplete="off" placeholder="What needs to be done?" @keydown.enter="addTodo">
    </header>
    <todo-list :filteredTodos="Object.values(list)" v-if="loaded" :key="change"></todo-list>
  </section>
  <footer class="info">
    <p>Double-click to edit a todo</p>
    <p>Written by <a href="http://evanyou.me">Evan You</a></p>
    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    <p>Edited by  <a href="https://www.linkedin.com/in/nmonicolas/">Nícolas Oliveira</a></p>
  </footer>
</template>

<script>
import List from "./components/todo_list.vue";

export default {
  name: 'App',
  components: {
    "todo-list": List,
  },

  data(){
    return{
      list: [],
      loaded: false,
      change:0,
      newTodo: "",
    }
  },

  created() {
    fetch('https://brightcitiesapp.herokuapp.com/tasks', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        this.list = Object.values(data)
        this.loaded = true;
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    console.log('Component has been created!');
  },

  methods:{
    update_list(){
      fetch('https://brightcitiesapp.herokuapp.com/tasks', {
          method: 'GET',
      })
      .then(response => response.json())
      .then(data => {
          this.list = Object.values(data)
          console.log('Success:', data);
      })
      .catch((error) => {
          console.error('Error:', error);
      });
    },

    addTodo(){
      var inputVal = this.newTodo;
      this.newTodo = ""

      /*
        Atualiza a lista de todos que pode ter sido modificada pelo componente todo-list.
        Se não fizermos isso corre o risco de lista utilizada nessa classe estar desatualizada,
        essa que é passada como parâmetro para o componente, dando um pequeno bug visual 
      */
      this.update_list();   // DESCULPA, gambiarra, não sabia como resolver isso

      const data = {
        "todo_text" : inputVal,
        "completed" : false
      };

      fetch('https://brightcitiesapp.herokuapp.com/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        this.list.push(data);
        this.change += 1;               // Atualiza o valor :key, que quando atualizado recarrega o componente
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }
}
</script>

<style>
  @import 'style/todomvc-common/base.css';
  @import 'style/todomvc-app-css/index.css'
</style>
