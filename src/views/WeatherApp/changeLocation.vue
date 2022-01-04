<template>
  <div class="info-location">
    <input
      class="info-location-input"
      list="city-option"
      :value="search"
      @input="$emit('update:search', $event.target.value)"
      @keypress.enter="$emit('searchLocation')"
    />
    <datalist id="city-option" size="1">
      <option value="Paris"></option>
      <option value="Tokyo"></option>
      <option value="Taipei"></option>
      <option value="Santiago"></option>
      <option value="Rome"></option>
    </datalist>

    <div
      class="info-location-btn"
      @mouseover="hoverBtn = true"
      @mouseleave="hoverBtn = false"
      @click="input = !input"
      :class="{ inputOpen: input }"
    >
      <i class="fas fa-map-marker-alt"></i>
      <span :style="hoverBtn ? hoverStyle : null" :class="{ inputOpen: spanShow }"
        >Change location</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { watch, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ChangeLocation',
  components: {},
  props: {
    search: String,
  },
  setup() {
    const hoverBtn = ref(false);
    const hoverStyle = {
      transform: 'scale(1, 0.95)',
      display: 'inline-block',
      transformOrigin: 'bottom',
    };
    const input = ref(false);
    const spanShow = ref(false);
    watch(input, () => {
      if (!input.value) {
        setTimeout(() => {
          spanShow.value = false;
        }, 150);
      } else {
        spanShow.value = true;
      }
    });
    return {
      hoverBtn, hoverStyle, input, spanShow,
    };
  },
});
</script>
<style scoped lang='scss'>
$gradient: linear-gradient(135deg, #72edf2 10%, #5151e5 100%);
@mixin box {
  border-radius: 30px;
  padding: 10px;
  width: 290px;
  font-size: 16px;
}

.info-location {
  font-weight: 700;
  position: relative;
  width: 290px;

  &-btn {
    position: relative;
    z-index: 5;
    @include box;
    background-image: $gradient;
    transition: 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
      transform: scale(0.95);
    }
    & span {
      margin-left: 10px;
      transition-delay: 0.1s;
      &.inputOpen {
        display: none !important;
      }
    }
    &.inputOpen {
      width: 40px;
      transform: scale(0.8);
      left: 7px;
    }
  }

  &-input {
    @include box;
    position: absolute;
    top: 0;
    left: 0;
    border: 0;
    text-align: center;
    transform: scale(0.95);
    &:focus {
      outline: none;
    }
  }
}
</style>
