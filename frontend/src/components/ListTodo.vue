<template>
  <div v-bind:show="todos.length>0" class="col align-self-center">
    <div class="form-row align-items-center" v-for="todo in todos" v-bind:key="todo.id">
      <div class="col-auto my-1">
        <div class="input-group mb-3 todo__row">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <input
                type="checkbox"
                v-model="todo.done"
                :checked="todo.done"
                :value="todo.done"
                v-on:change="updateTodo(todo)"
                title="Mark as done?"
              />
            </span>
          </div>
          <input
            type="text"
            class="form-control"
            :class="todo.done ? 'todo__done' : ''"
            v-model="todo.name"
            @keypress="todo.editing=true"
            @keyup.enter="updateTodo(todo)"
          />
          <div class="input-group-append">
            <div class="input-group-text">
              <span 
                class="input-group-addon addon-left"
                title="Delete todo?"
                v-on:click="deleteTodo(todo._id)"
              >
              X
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="alert alert-primary todo__row"
      v-show="todos.length==0 && doneLoading"
      >Hardest worker in the room. No more todos now you can rest. ;)
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import bus from '../bus';

export default {
  data() {
    return {
      todos: [],
      doneLoading: false
    };
  },
  created: function() {
    this.fetchTodo();
    this.listenToEvents();
  },
  watch: {
    $route: function() {
      this.doneLoading = false;
      this.fetchData().then(function() {
        this.doneLoading = true;
      });
    }
  },
  methods: {

    /**
     * @function fetchTodo
     * @description makes a get request to the backend to retrieve all the todo items
     */

    fetchTodo() {
      this.$http.get("/").then(response => {
        this.todos = response.data;
      });
    },

    /**
     * @function updateTodo
     * @param {todo} object
     * @description makes a put request to the backend to update specificied todo item
     */


    updateTodo(todo) {
      const id = todo._id;
      this.$http
        .put(`/${id}`, todo)
          .then(response => {
            console.log('response', response);
          })
          .catch(err => {
            console.log(err)
          });
    },

    /**
     * @function deleteTodo
     * @param {id} string
     * @description makes a delete request to the backend to delete specificied todo item
     */

    deleteTodo(id) {
      // eslint-disable-next-line no-unused-vars
      this.$http.delete(`/${id}`).then(response => {
        this.fetchTodo();
      });
    },

    /**
     * @function listenToEvents
     * @description listens to the refreshTodo event being fired from CreateTodo.vue. Once fired, a new get request is called to will render the update list.
     */
    

    listenToEvents() {
      // eslint-disable-next-line no-unused-vars
      bus.$on("refreshTodo", $event => {
        this.fetchTodo();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.todo__done {
  text-decoration: line-through !important;
}

.no_border_left_right {
  border-left: 0px;
  border-right: 0px;
}

.flat_form {
  border-radius: 0px;
}

.mrb-10 {
  margin-bottom: 10px;
}

.addon-left {
  background-color: none !important;
  border-left: 0px !important;
  cursor: pointer !important;
}

.addon-right {
  background-color: none !important;
  border-right: 0px !important;
}
</style>
