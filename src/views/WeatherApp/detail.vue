<template>
  <div class="info-detail-item">
    <span class="info-detail-item-title">{{ item.title }}</span>
    <span class="info-detail-item-value">{{ weatherInfo[item.title] + item.unit }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Info {
  title: string;
  unit: string;
}
interface WeatherInfo {
  date: string;
  temp: number;
  description: string;
  pressure: number;
  humidity: number;
  wind: number;
}
export default defineComponent({
  name: 'Detail',
  components: {},
  props: {
    item: Object as PropType<Info>,
    weatherInfo: Object as PropType<WeatherInfo>,
  },
});
</script>
<style scoped lang='scss'>
.info-detail-item {
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 3px;
  font-size: 1.05em;
  & span:first-child {
    font-weight: 700;
    text-transform: uppercase;
  }
}
</style>
