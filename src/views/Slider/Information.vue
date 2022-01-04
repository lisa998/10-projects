<template>
  <div class="slider-info">
    <div class="slider-info-current">
      <transition>
        <h1 v-show="showInfo">{{ info[current].title }}</h1>
      </transition>
      <transition>
        <h2 v-show="showInfo">{{ info[current].subTitle }}</h2>
      </transition>
      <transition>
        <div class="slider-info-line" v-show="showInfo"></div>
      </transition>
      <transition>
        <p v-show="showInfo">{{ info[current].main }}</p>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Information',
  components: {},
  props: {
    current: Number,
    showInfo: Boolean,
  },
  setup() {
    const info = [
      {
        title: 'Bicolor cat',
        subTitle: 'Tuxedo cat',
        main: 'High-grade bicolor results in Van-pattern cats',
      },
      {
        title: 'Ragdoll cat',
        subTitle: 'Puppy cats',
        main: ' docile and placid temperament and affectionate nature',
      },
      {
        title: 'Tabby Cat',
        subTitle: '"M" type mark',
        main: 'Stripes, dots or swirling markings',
      },
    ];

    return { info };
  },
});
</script>
<style scoped lang='scss'>
.slider-info {
  position: absolute;
  font-weight: 700;
  z-index: 5;
  transform: translate3d(-50px, 50%, 36px);
  text-shadow: 0px 3px 0px #b2a98f, 0px 14px 10px rgba(0, 0, 0, 0.15),
    0px 24px 2px rgba(0, 0, 0, 0.1), 0px 34px 30px rgba(0, 0, 0, 0.1);
  transition: 0.6s ease;
  &.hoverLeft {
    transform: translate3d(-50px, 50%, 36px) perspective(50em) rotatey(-20deg);
  }
  &.hoverRight {
    transform: translate3d(-50px, 50%, 36px) perspective(50em) rotatey(20deg);
  }
  &-current {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    h1 {
      font-size: 3rem;
      text-transform: uppercase;
    }
    h2 {
      font-size: 2rem;
      transition-delay: 0.05s;
      text-transform: uppercase;
    }
    div {
      transition-delay: 0.1s;
    }
    p {
      transition-delay: 0.15s;
    }
    & h1,
    h2,
    p {
      margin: 15px 0px;
      white-space: nowrap;
    }
  }

  &-line {
    width: 70px;
    height: 2px;
    background-color: white;
  }
}
.v-enter-active,
.v-leave-active {
  transition: 0.6s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-enter-from {
  transform: translateY(100%);
}
.v-leave-to {
  transform: translateY(-100%);
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
