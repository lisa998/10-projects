<template>
  <div class="body">
    <div
      v-for="(pic, i) in pics"
      :key="i"
      class="bgImg"
      :style="{ backgroundImage: `url(${pics[(i + 2) % 3]})` }"
      :class="{ left: current === (i + 2) % 3, right: current === i }"
    ></div>

    <div class="bg"></div>
    <div class="container">
      <div
        class="slider"
        v-for="(pic, i) in pics"
        :key="i"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
        :class="{
          hoverLeft,
          hoverRight,
          current: current === (i + 2) % 3,
          prev: current === (i + 1) % 3,
          next: current === i,
        }"
      >
        <img :src="pics[i]" alt="" />
        <div class="slider-bg"></div>
      </div>

      <information
        :showInfo="showInfo"
        :current="currentInfo"
        :class="{
          hoverLeft,
          hoverRight,
        }"
      ></information>
    </div>
    <i class="fas fa-chevron-left" @click="prev" :class="{ btnDisable }"></i>
    <i class="fas fa-chevron-right" @click="next" :class="{ btnDisable }"></i>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line
import { defineComponent, nextTick, ref, watch } from 'vue';
import Information from './Information.vue';

export default defineComponent({
  name: 'Slider',
  components: { Information },
  setup() {
    const hoverLeft = ref(false);
    const hoverRight = ref(false);
    const toPrev = ref(false);
    const toNext = ref(false);
    const pics = [
      'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg',
      'https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-f3860ceb0ef19643c335cb34df3fa1de166e2761-s1100-c50.jpg',
      'https://p3-tt.byteimg.com/origin/pgc-image/fe8c898c5e8f4fd8aa34cc82db14c810.jpg',
    ];
    function handleMouseMove(e: MouseEvent) {
      if (e.offsetX > 150) {
        hoverRight.value = true;
        hoverLeft.value = false;
      } else {
        hoverRight.value = false;
        hoverLeft.value = true;
      }
    }

    const current = ref(0);
    const showInfo = ref(true);
    const btnDisable = ref(false);
    const currentInfo = ref(0);
    function handleMouseLeave() {
      hoverRight.value = false;
      hoverLeft.value = false;
    }

    function next() {
      if (!btnDisable.value) {
        btnDisable.value = true;
        showInfo.value = false;
        nextTick();
        current.value = (current.value + 1) % pics.length;
        setTimeout(() => {
          showInfo.value = true;
          btnDisable.value = false;
        }, 950);
      }
    }
    function prev() {
      if (!btnDisable.value) {
        btnDisable.value = true;
        showInfo.value = false;
        nextTick();
        // eslint-disable-next-line no-unused-expressions
        current.value === 0
          ? (current.value = current.value + pics.length - 1)
          : (current.value -= 1);
        setTimeout(() => {
          showInfo.value = true;
          btnDisable.value = false;
        }, 950);
      }
    }
    watch(
      () => current.value,
      () => {
        setTimeout(() => {
          currentInfo.value = current.value;
        }, 950);
        // eslint-disable-next-line comma-dangle
      }
    );
    return {
      handleMouseMove,
      hoverLeft,
      hoverRight,
      handleMouseLeave,
      pics,
      next,
      prev,
      current,
      showInfo,
      toPrev,
      toNext,
      btnDisable,
      currentInfo,
    };
  },
});
</script>
<style scoped lang='scss'>
@mixin bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
* {
  user-select: none;
}
.body {
  color: white;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}
.fas {
  z-index: 2;
  font-size: 2em;
  cursor: pointer;
  position: relative;
  &.btnDisable {
    opacity: 0.5;
  }
}
.fa-chevron-left {
  right: 500px;
}
.fa-chevron-right {
  left: 500px;
}
.container {
  display: flex;
  z-index: 2;
  position: relative;
  align-items: center;
  justify-content: center;
}
.slider {
  width: 300px;
  height: 500px;
  position: absolute;
  transition: 0.8s ease;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &.prev {
    transform: translateX(-300px) perspective(50em) rotatey(30deg) scale(0.9, 0.85);
    z-index: 1;
  }
  &.next {
    transform: translateX(300px) perspective(50em) rotatey(-30deg) scale(0.9, 0.85);
    z-index: 2;
  }
  &.current {
    z-index: 3;
    transition: 0.6s ease;
    &.hoverLeft {
      transform: perspective(50em) rotatey(-20deg);
    }
    &.hoverRight {
      transform: perspective(50em) rotatey(20deg);
    }
    & .slider-bg {
      background-color: rgba($color: #000000, $alpha: 0.1);
    }
  }
  &-bg {
    background-color: rgba($color: #000000, $alpha: 0.4);
    z-index: 1;
    @include bg;
  }
}
.bg {
  @include bg;
  background-color: rgba($color: #000000, $alpha: 0.4);
}
.bgImg {
  @include bg;
  background-position: center;
  background-size: cover;
  z-index: 1;
  transition: 0.5s ease;
  opacity: 1;
  filter: blur(8px);
  &.left,
  &.right {
    z-index: 0;
    opacity: 0.5;
  }
  &.left {
    transform: translateX(-200px);
  }
  &.right {
    transform: translateX(200px);
  }
}
</style>
