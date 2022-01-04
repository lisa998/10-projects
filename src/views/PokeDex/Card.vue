<template>
  <div class="card" :style="{ backgroundColor: color }">
    <div class="card-img" :style="{ backgroundImage: `url(${pokemon.img})` }" />
    <div class="card-id">#{{ pokemon.id.toString().padStart(3, '0') }}</div>
    <h2 style="margin: 5px">{{ pokemon.name }}</h2>
    <p style="margin: 5px">Type:{{ pokemon.type }}</p>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Pokemon {
  id: number;
  name: string;
  type: string;
}

export default defineComponent({
  name: 'Card',
  components: {},
  props: {
    pokemon: Object as PropType<Pokemon>,
    color: String,
  },
});
</script>
<style scoped lang='scss'>
.body {
  position: relative;
  display: flex;
  flex-direction: colume;
  width: 100%;
  font-family: 'Lato', sans-serif;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #d4d3dd, #efefbb);
  min-height: 80vh;
}
.card {
  width: 160px;
  height: 270px;
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.6);
    background-size: cover;
  }
  &-id {
    padding: 5px 10px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.1);
    margin-top: 10px;
  }
}
</style>
