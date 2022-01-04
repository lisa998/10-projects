<template>
  <draggable
    :list="list"
    :disabled="disabled"
    item-key="id"
    class="list-group"
    handle=".handle"
    group="notes"
    @start="$emit('start')"
    @end="$emit('end')"
  >
    <template #item="{ element }">
      <div class="list-group-item" :class="{ 'not-draggable': disabled, [element.type]: true }">
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
</template>

<script lang='ts'>
import draggable from 'vuedraggable';
import { defineComponent, PropType } from 'vue';

interface List {
  name: string;
  id: number;
  context: string;
  type: string;
  select: boolean;
}

export default defineComponent({
  name: 'Notes',
  components: {
    draggable,
  },
  props: {
    list: Array as PropType<List[]>,
    disabled: Boolean,
    dragging: Boolean,
  },
});
</script>
<style scoped lang='scss'>
$gray: #424242;
$light-gray: rgb(237 237 237);
$purple: rgb(69 39 160);
$shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.2), 0 10px 14px 1px rgba(0, 0, 0, 0.14),
  0 4px 18px 3px rgba(0, 0, 0, 0.12);

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

@media screen and (max-width: 1100px) {
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
