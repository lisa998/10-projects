<template>
  <div class="setting" v-for="(setting, id) in settings" :key="id">
    <label>Include {{ setting.label }}</label>
    <input type="checkbox" checked v-model="setting.checked" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Setting {
  label: string;
  method: () => string;
  checked: boolean;
}

export default defineComponent({
  name: 'CheckBox',
  props: {
    settings: {
      type: Array as PropType<Setting[]>,
      required: true,
    },
  },
});
</script>
<style scoped lang='scss'>
.setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
}
</style>
