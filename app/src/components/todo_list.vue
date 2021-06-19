<template>
    <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            <li class="todo" v-for="todo in this.filterdList" :key="todo.id" :class="{completed: todo.completed, editing: todo == editedTodo}">
                <div class="view">
                    <input class="toggle" type="checkbox" @click="complete_todo(todo)" v-model="todo.completed">
                    <label @dblclick="editTodo(todo)">{{todo.todo_text}}</label>
                    <button class="destroy" @click="removeTodo(todo)"></button>
                </div>
                <!-- <input class="edit" type="text" v-model="todo.todo_text" v-todo-focus="todo == editedTodo" @blur="doneEdit(todo)" @keydown.enter="doneEdit(todo)" @keydown.esc="cancelEdit(todo)"> -->
                <input class="edit" type="text" v-model="todo.todo_text" @blur="doneEdit(todo)" @keydown.enter="doneEdit(todo)" @keydown.esc="cancelEdit(todo)">
            </li>
        </ul>
    </section>

    <!-- Filters -->

    <footer class="footer">
        <span class="todo-count" v-show=Object.values(this.filteredTodos).length>
            <strong v-text="remaining"></strong> left
        </span>
        <ul class="filters">
            <li><a href="#/all" @click="filter_list('all')">All</a></li>
            <li><a href="#/active" @click="filter_list('active')">Active</a></li>
            <li><a href="#/completed" @click="filter_list('completed')">Completed</a></li>
        </ul>
        <button class="clear-completed" @click="removeCompleted">
            Clear completed
        </button>
    </footer>
</template>

<script>
export default {
    props: ["filteredTodos"],
    data(){
        return{
            editedTodo: "",
            alltodos: [],
            filterdList: [],
        }
    }, 

    created(){
        this.alltodos = Object.values(this.filteredTodos)
        this.filterdList = this.alltodos
    },

    computed:{
        remaining: function () {
            return this.alltodos.filter(todo => todo.completed == false).length
        },
        allDone: {
            get: function () {
                return this.remaining === 0;
            },
            set: function (value) {
                this.alltodos.forEach(function (todo) {
                    todo.completed = value;
                    const data = {
                        "todo_text" : todo.todo_text,
                        "completed" : todo.completed
                    };

                    fetch('https://brightcitiesapp.herokuapp.com/task/' + todo.id, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Success:', data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                    
                });
            }
        }
    },

    methods:{
        removeTodo(todo)
        {
            var todo_id = todo.id;
            this.alltodos.pop(todo);
            fetch('https://brightcitiesapp.herokuapp.com/task/' + todo_id, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        },

        removeCompleted()
        {
            var completedTodos = this.alltodos.filter(todo => todo.completed == true)

            completedTodos.forEach(item => {
                this.alltodos.pop(item);
                fetch('https://brightcitiesapp.herokuapp.com/task/' + item.id, {
                method: 'DELETE',
                })
                .then(response => response.json())
                .then(data => {
                    this.$forceUpdate();
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            });

        },

        editTodo(todo)
        {
            this.beforeEditCache = todo.title;
            this.editedTodo = todo;
        },

        doneEdit(todo) {
            if (!this.editedTodo) {
                return;
            }
            this.editedTodo = null;
            todo.todo_text = todo.todo_text.trim();

            const data = {
                "todo_text" : todo.todo_text,
                "completed" : todo.completed
            };

            fetch('https://brightcitiesapp.herokuapp.com/task/' + todo.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        },

        cancelEdit(todo) {
            this.editedTodo = null;
            todo.title = this.beforeEditCache;
        },

        complete_todo(todo){
            const data = {
                "todo_text" : todo.todo_text,
                "completed" : !todo.completed
            };

            fetch('https://brightcitiesapp.herokuapp.com/task/' + todo.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        },

        filter_list(type){
            switch(type){
                case "all":
                    this.filterdList = this.alltodos;
                    break;
                case "active":
                    this.filterdList = this.alltodos.filter(todo => todo.completed == false)
                    break;
                case "completed":
                    this.filterdList = this.alltodos.filter(todo => todo.completed == true)
                    break;
            }      
        }
    }
}
</script>

<style>
    @import '../style/todomvc-common/base.css';
    @import '../style/todomvc-app-css/index.css';
</style>