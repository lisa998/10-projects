<template>
  <div class="favo" @mouseover="hover = true" @mouseleave="hover = false">
    <div class="favo-delete" v-show="hover" @click="$emit('deleteFavo', favo.idMeal)">
      <i class="fas fa-times-circle"></i>
    </div>
    <img class="favo-img" :src="favo.strMealThumb" @click="$emit('openRecipe')" />
    <div class="favo-name" @click="$emit('openRecipe')">{{ favo.strMeal }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { Recipe } from './interface';

export default defineComponent({
  name: 'Favo',
  props: {
    favo: Object as PropType<Recipe>,
  },
  setup() {
    const hover = ref(false);
    return { hover };
  },
});
</script>
<style scoped lang='scss'>
.favo {
  width: 110px;
  margin: 10px;
  position: relative;
  flex-shrink: 0;
  &-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 1px;
    background-color: white;
    box-shadow: 0 0 5px 1px rgb(182, 182, 182);
    cursor: pointer;
  }
  &-delete {
    position: absolute;
    top: -2px;
    left: 24px;
    color: #a5551f;
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
    }
  }
  &-name {
    cursor: pointer;
  }
}
@media screen and(max-width:768px) {
  .favo {
    &-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &-delete {
      display: block !important;
    }
  }
}
</style>
