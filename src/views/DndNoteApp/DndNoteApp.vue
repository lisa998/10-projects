<template>
  <div class="row">
    <div class="col-2">
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

    <div class="col-6">
      <h3>Draggable {{ draggingInfo }}</h3>

      <draggable
        :list="list"
        :disabled="!enabled"
        item-key="name"
        class="list-group"
        ghost-class="ghost"
        :move="checkMove"
        handle=".handle"
        @start="dragging = true"
        @end="dragging = false"
      >
        <template #item="{ element }">
          <div class="list-group-item" :class="{ 'not-draggable': !enabled, [element.type]: true }">
            <div class="list-group-item-name">
              <i class="fa fa-align-justify handle"></i>
              <input v-model.lazy="element.name" placeholder="Title ..." />
              <div class="option"><i class="fas fa-ellipsis-h"></i></div>
            </div>
            <textarea
              class="list-group-item-context"
              v-model="element.context"
              placeholder="Write something here"
            />
            <select v-model="element.type" size="3">
              <option>important</option>
              <option>normal</option>
              <option>completed</option>
            </select>
          </div>
        </template>
      </draggable>
    </div>

    <rawDisplayer class="col-3" :value="list" title="List" />
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { defineComponent } from 'vue';

let id = 1;
export default defineComponent({
  name: 'DndNoteApp',
  order: 0,
  components: {
    draggable,
  },
  data() {
    return {
      enabled: true,
      list: [
        {
          name: 'John',
          id: 0,
          context: '123',
          type: 'normal',
        },
        {
          name: 'Joao',
          id: 1,
          context: '456',
          type: 'important',
        },
        {
          name: 'Jean',
          id: 2,
          context: '789',
          type: 'completed',
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
  methods: {
    add() {
      this.list.push({ name: '', id: (id += 1), type: 'normal' });
    },
    replace() {
      this.list = [{ name: 'Edgard', id: (id += 1) }];
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

.buttons {
  margin-top: 35px;
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
  &-item {
    width: 300px;
    min-height: 300px;
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
</style>
