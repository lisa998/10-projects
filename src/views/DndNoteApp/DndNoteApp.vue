<template>
  <div class="row">
    <div class="col-6">
      <h2>Notes App {{ draggingInfo }}</h2>
      <notes
        :list="list"
        :disabled="!enabled"
        :dragging="dragging"
        @start="dragging = true"
        @end="dragging = false"
      ></notes>
    </div>
    <div class="delete-area">
      <i class="fas fa-trash"></i>
      <draggable class="delete-area-drop" group="notes" itemKey="name">
        <template #item> </template>
      </draggable>
    </div>

    <div class="form-group">
      <div class="btn-group-vertical buttons" role="group" aria-label="Basic example">
        <button class="btn btn-secondary" @click="add">Add</button>
        <button class="btn btn-secondary" @click="replace">Replace</button>
      </div>
      <div class="form-check">
        <input id="disabled" type="checkbox" v-model="enabled" class="form-check-input" />
        <label class="form-check-label" for="disabled">DnD enabled</label>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import draggable from 'vuedraggable';
import { defineComponent } from 'vue';
import Notes from './Notes.vue';

interface List {
  name: string;
  id: number;
  context: string;
  type: string;
  select: boolean;
}
export default defineComponent({
  name: 'DndNoteApp',
  components: {
    draggable,
    Notes,
  },
  data() {
    return {
      id: 2,
      enabled: true,
      options: ['important', 'normal', 'completed'],
      list: [
        {
          name: 'John',
          id: 0,
          context: '123',
          type: 'normal',
          select: false,
        },
        {
          name: 'Joao',
          id: 1,
          context: '456',
          type: 'important',
          select: false,
        },
        {
          name: 'Jean',
          id: 2,
          context: '789',
          type: 'completed',
          select: false,
        },
      ] as List[],
      dragging: false,
    };
  },
  computed: {
    draggingInfo(): string {
      return this.dragging ? 'under drag' : '';
    },
  },
  mounted() {
    const data = localStorage.getItem('list');
    if (data) {
      this.list = JSON.parse(data);
      this.id = this.list[this.list.length - 1].id;
    }
  },
  watch: {
    list: {
      handler: function a(val) {
        localStorage.setItem('list', JSON.stringify(val));
      },
      deep: true,
    },
  },
  methods: {
    add() {
      this.list.push({
        name: '',
        context: '',
        id: (this.id += 1),
        type: 'normal',
        select: false,
      });
    },
    replace() {
      this.list = [
        {
          name: 'John',
          id: 0,
          context: '123',
          type: 'normal',
          select: false,
        },
        {
          name: 'Joao',
          id: 1,
          context: '456',
          type: 'important',
          select: false,
        },
        {
          name: 'Jean',
          id: 2,
          context: '789',
          type: 'completed',
          select: false,
        },
      ];
    },
  },
});
</script>
<style scoped lang='scss'>
$gray: #424242;
$light-gray: rgb(237 237 237);
$purple: rgb(69 39 160);
$shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.2), 0 10px 14px 1px rgba(0, 0, 0, 0.14),
  0 4px 18px 3px rgba(0, 0, 0, 0.12);

* {
  box-sizing: border-box;
}

.row {
  position: relative;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}
.form-group {
  position: absolute;
  bottom: 20px;
  right: 10vw;
}
.btn {
  color: white;
  background-color: $gray;
  padding: 10px 16px;
  margin: 10px;
  opacity: 0.7;
  &:hover {
    opacity: 1;
    transform: scale(1.02);
  }
}
.delete-area {
  position: absolute;
  bottom: 30px;
  right: 0;
  left: 0;
  margin: auto;
  &-drop {
    border: 2px dashed $gray;
    width: 40vw;
    height: 10vh;
    right: 0;
    left: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.fa-trash {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  margin: auto;
}
.form-check-input {
  display: none;
  &:checked + .form-check-label {
    background-color: $gray;
    color: white;
  }
}
.form-check-label {
  user-select: none;
  padding: 10px 16px;
  border: 2px outset;
  border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
  color: $gray;
  opacity: 0.7;
  margin: 10px;
  display: block;
}
h2 {
  color: $gray;
}
@media screen and (max-width: 1100px) {
  .delete-area {
    left: 10vw;
    right: auto;
  }
}
@media screen and (max-width: 800px) {
  .delete-area {
    left: 15vw;
    right: auto;
    &-drop {
      width: 15vw;
    }
  }
}
</style>
