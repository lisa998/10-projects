<template>
  <div class="row">
    <div class="col-6">
      <h2>Notes App {{ draggingInfo }}</h2>
      <draggable
        :list="list"
        :disabled="!enabled"
        item-key="name"
        class="list-group"
        ghost-class="ghost"
        handle=".handle"
        :group="{ name: 'notes' }"
        @start="dragging = true"
        @end="dragging = false"
        :move="log"
      >
        <template #item="{ element }">
          <div class="list-group-item" :class="{ 'not-draggable': !enabled, [element.type]: true }">
            <div class="list-group-item-name">
              <i class="fa fa-align-justify handle"></i>
              <input v-model.lazy="element.name" placeholder="Title ..." />
              <div class="option" @click="element.select = !element.select">
                <i class="fas fa-ellipsis-h"></i>
              </div>
            </div>
            <textarea
              class="list-group-item-context"
              v-model="element.context"
              placeholder="Write something here"
            />
            <select v-model="element.type" size="3" v-if="element.select">
              <option v-for="option in options" :key="option" @click="element.select = false">
                {{ option }}
              </option>
            </select>
          </div>
        </template>
      </draggable>
    </div>
    <div class="delete-area">
      <i class="fas fa-trash"></i>
      <draggable class="delete-area-drop" group="notes" itemKey="name" :move="log">
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

<script>
import draggable from 'vuedraggable';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DndNoteApp',
  order: 0,
  components: {
    draggable,
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
      ],
      dragging: false,
    };
  },
  computed: {
    draggingInfo() {
      return this.dragging ? 'under drag' : '';
    },
  },
  mounted() {
    this.list = JSON.parse(localStorage.getItem('list'));
    this.id = this.list[this.list.length - 1].id;
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
      this.list.push({ name: '', id: (this.id += 1), type: 'normal' });
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

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.not-draggable {
  cursor: no-drop;
}
.list-group {
  display: flex;
  flex-wrap: wrap;
  width: 80vw;
  position: relative;
  margin: auto;
  height: 73vh;
  overflow-y: scroll;
  overflow-x: hidden;
  align-content: flex-start;
  &::-webkit-scrollbar {
    width: 7px;
    background-color: transparent;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(170, 170, 170, 0.7);
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(170, 170, 170, 0.3);
    border-radius: 10px;
  }

  &-item {
    width: 300px;
    height: 300px;
    background-color: $gray;
    color: white;
    margin: 20px;
    border-radius: 5px;
    box-shadow: $shadow;
    padding: 16px;
    text-align: start;
    position: relative;
    &-name {
      padding: 10px 0px 20px;
      display: flex;
      align-items: center;
      position: relative;
      & > input {
        background-color: inherit;
        border: 0;
        margin-left: 10px;
        font-size: 1.2rem;
        font-weight: 700;
        color: inherit;
        &:focus {
          outline: inherit;
        }
      }
      & .option {
        position: absolute;
        right: 0px;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        border: 2px solid;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      & h3 {
        margin: 0 0 0 10px;
      }
    }
    &-context {
      color: hsla(0, 0%, 100%, 0.7);
      background-color: inherit;
      resize: none;
      width: -webkit-fill-available;
      min-height: 209px;
      border: none;
      &:focus {
        outline: inherit;
      }
    }
    &.important {
      background-color: $purple;
    }
    &.completed {
      background-color: $light-gray;
      color: hsla(0, 0%, 0%, 0.8);
    }
    & > select {
      overflow: hidden;
      border: none;
      box-shadow: $shadow;
      font-family: inherit;
      background-color: rgb(0 0 0 /50%);
      color: inherit;
      border-radius: 5px;
      position: absolute;
      right: 10px;
      top: 65px;
      &:focus {
        outline: none;
      }
    }
    & option {
      padding: 10px;
      &:checked {
        background-color: hsla(0, 0%, 100%, 0.8);
      }
    }
  }
}

.completed > .list-group-item-context {
  color: hsla(0, 0%, 0%, 0.7);
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
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
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
  .list-group {
    width: 90vw;
    height: 75vh;
    &-item {
      width: 40vw;
      margin: 10px;
    }
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
  .list-group-item {
    width: 80vw;
  }
}

@media screen and (max-height: 900px) {
  .list-group {
    height: 65vh;
  }
}
@media screen and (max-height: 600px) {
  .list-group {
    height: 50vh;
  }
}
</style>
