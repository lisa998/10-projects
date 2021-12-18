<template>
  <div class="result-container">
    <span id="result">{{ str }}</span>
    <button class="btn" id="clipboard" @click="copy">
      <i class="far fa-clipboard"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ResultContainer',
  props: {
    str: String,
  },
  methods: {
    copy() {
      this.$emit('copy');
    },
  },
});
</script>
<style scoped lang='scss'>
.result-container {
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  font-size: 18px;
  letter-spacing: 1px;
  padding: 12px 10px;
  height: 50px;
  width: 100%;
  & .btn {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
  & #result {
    word-wrap: break-word;
    max-width: calc(100% - 40px);
    overflow-y: scroll;
    height: 100%;
  }
  & #result::-webkit-scrollbar {
    width: 1rem;
  }
}
.btn {
  border: none;
  background-color: #42b983;
  color: #fff;
  font-size: 16px;
  padding: 8px 12px;
  cursor: pointer;
}
</style>
