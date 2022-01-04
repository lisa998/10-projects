<template>
  <div class="info-daily-item" :class="{ select }">
    <img :src="day.icon" alt="" />
    <div class="info-daily-item-week">{{ day.week.slice(0, 3) }}</div>
    <div class="info-daily-item-temp">{{ day.deg }}°C</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Day {
  icon: string;
  week: string;
  deg: number;
}

export default defineComponent({
  name: 'Daily',
  components: {},
  props: {
    day: Object as PropType<Day>,
    select: Boolean,
  },
});
</script>
<style scoped lang='scss'>
@mixin hover {
  background-image: linear-gradient(180deg, #72edf2 0%, #f7f7f7 100%);
  color: #222831;
}

.info-daily-item {
  border-radius: 10px;
  position: relative;
  padding: 10px;
  transition: transform 0.2s ease-in-out;
  &:hover {
    @include hover;
    transform: scale(1.05);
  }
  & img {
    width: 60px;
    height: 60px;
  }
  & img + div {
    margin-top: -5px;
    margin-bottom: 5px;
  }
  &.select {
    @include hover;
  }
  &-temp {
    font-weight: 700;
  }
  &-week {
    text-transform: uppercase;
  }
}
</style>
