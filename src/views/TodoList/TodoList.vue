<template>
  <body>
    <h1>todos</h1>
    <div id="form">
      <input v-model="task" @keypress.enter="submit" placeholder="Enter your todo" />
      <ul class="todos">
        <list @del="del" @finish="finish" v-for="(t, id) in tasklist" :t="t" :key="id"></list>
      </ul>
    </div>

    <small
      >Left click to toggle completed. <br />
      Right click to delete todo</small
    >
  </body>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import List from './List.vue';

interface Task {
  name: string;
  id: number;
  finished: boolean;
}

export default defineComponent({
  components: { List },
  name: 'TodoList',
  data() {
    return {
      task: '',
      tasklist: [] as Task[],
      id: 0,
    };
  },
  methods: {
    submit() {
      if (this.task) {
        this.tasklist.push({ name: this.task, id: this.id, finished: false });
        this.id += 1;
        this.task = '';
      }
    },
    del(id: number) {
      this.tasklist = this.tasklist.filter((t) => t.id !== id);
    },
    finish(id: number) {
      this.tasklist = this.tasklist.map((t) => {
        if (t.id === id) {
          return { ...t, finished: !t.finished };
        }
        return t;
      });
    },
  },
  mounted() {
    this.tasklist = JSON.parse(localStorage.getItem('task') || '[]');
    if (this.tasklist[0]) {
      this.id = this.tasklist[this.tasklist.length - 1].id + 1;
    }
  },
  watch: {
    tasklist: {
      handler: function a(val) {
        localStorage.setItem('task', JSON.stringify(val));
      },
      deep: true,
    },
  },
});
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

body {
  background-color: #f5f5f5;
  color: #444;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}

h1 {
  color: #42b983;
  font-size: 10rem;
  text-align: center;
  opacity: 0.4;
}

#form {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  width: 400px;
}

input {
  border: none;
  color: #444;
  font-size: 2rem;
  padding: 1rem 2rem;
  display: block;
  width: 100%;
  &::placeholder {
    color: #d5d5d5;
  }
  &:focus {
    outline-color: #42b983;
  }
}

.todos {
  background-color: #fff;
  padding: 0;
  margin: 0;
  list-style-type: none;
  text-align: left;
}
small {
  color: #b5b5b5;
  margin-top: 3rem;
  text-align: center;
}
@media screen and (max-width: 900px) {
  h1 {
    font-size: 5rem;
  }
  #form {
    max-width: 95%;
  }
  input {
    font-size: 1.5rem;
  }
}
</style>
