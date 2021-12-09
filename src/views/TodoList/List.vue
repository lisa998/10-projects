<template>
  <li @click="finish(t.id)" @contextmenu.prevent="del(t.id)">
    <span :class="{ finished: t.finished }">{{ t.name }}</span>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Task {
  name: string;
  id: number;
  finished: boolean;
}

export default defineComponent({
  name: 'List',
  props: {
    t: {
      type: Object as PropType<Task>,
      required: true,
    },
    del: {
      type: Function as PropType<(id: number) => void>,
      required: true,
    },
    finish: {
      type: Function as PropType<(id: number) => void>,
      required: true,
    },
  },
});
</script>
<style lang="scss" scoped>
.finished {
  color: #b6b6b6;
  text-decoration: line-through;
}

li {
  border-top: 1px solid #e5e5e5;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 1rem 2rem;
  user-select: none;
}
</style>
