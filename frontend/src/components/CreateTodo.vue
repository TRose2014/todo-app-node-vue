<template>
  <div class="col align-self-center">
    <h3 class="pb-5 text-left underline">Create todos</h3>
    <form class="sign-in" @submit.prevent>
      <div class="form-group todo__row">
        <input
          type="text"
          class="form-control"
          @keypress="typing=true"
          placeholder="What do you want to do?"
          v-model="name"
          @keyup.enter="addTodo($event)"
         />
         <small class="form-text text-muted" v-show="typing">Hit enter to save</small>
      </div>
    </form>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import bus from "../bus";

export default {
  data() {
    return {
      name: "",
      typing: false
    };
  },
  methods: {

    /**
     * @function addTodo
     * @param {object} event
     * @description Executed once an enter key is pressed. Makes a post to the backend with a new todo item
     */

    addTodo(event) {
      if(event) event.preventDefault();
      let todo = {
        name: this.name,
        done: false // false when todo item is added
      };
      console.log('todo', todo);
      this.$http
        .post("/", todo)
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          this.clearTodo();
          this.refreshTodo();
          this.typing = "false";
        })
        .catch(err => {
          console.log(err)
        });
    },

    /**
     * @function clearTodo
     * @description Clears the input box once the todo item is saved
     */

    clearTodo() {
      this.name = "";
    },

    /**
     * @function refreshTodo
     * @description Emits an refreshTodo event. Re-renders the list so the new item is displayed
     */

    refreshTodo() {
      bus.$emit("refreshTodo");
    }
  }
};

</script>

<style lang="scss" scoped>
  .underline {
    text-decoration: underline;
  }
</style>