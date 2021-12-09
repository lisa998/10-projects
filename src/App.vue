<template>
  <div @click="handleNav" class="icon"><i class="fas fa-bars"></i></div>
  <div class="bg" :class="{ close: nav }"></div>
  <div class="bg green" :class="{ close: nav }"></div>
  <div id="nav" :class="{ close: nav }">
    <router-link to="/" class="link">Home</router-link>
    <router-link :to="'/' + r" v-for="r in route" :key="r" class="link"
      >{{ ToName(r) }}
    </router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { routePath } from './router/index';

export default defineComponent({
  name: 'Link',
  data() {
    return {
      route: routePath,
      nav: false,
    };
  },
  methods: {
    ToName(path: string) {
      return path
        .split('-')
        .map((ele) => ele.slice(0, 1).toUpperCase() + ele.slice(1))
        .reduce((newName, ele) => `${newName} ${ele}`);
    },
    handleNav() {
      console.log(this.nav);
      this.nav = !this.nav;
    },
  },
});
</script>>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 20px;
  position: fixed;
  text-align: left;
  width: 100px;
  height: 100vh;
  background-color: white;
  transition: 0.3s ease-out;
  transition-delay: 0.6s;
  &.close {
    transition-delay: 0s;
  }
  a {
    font-weight: bold;
    color: #2c3e50;
    display: block;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.bg {
  width: 200px;
  height: 100vh;
  background-color: #2c3e50;
  position: absolute;
  top: 0;
  transition: 0.3s ease-out;
  transition-delay: 0s;
  &.close {
    transition-delay: 0.6s;
  }
}
.green {
  background-color: #42b983;
  width: 170px;
  transition: 0.3s ease-out;
  transition-delay: 0.3s;
  &.close {
    transition-delay: 0.3s;
  }
}

.link {
  padding: 10px;
  user-select: none;
  position: relative;
  top: 50px;
  &:hover {
    transform: scale(1.05);
  }
}
.close {
  transform: translateX(-200%);
}
.icon {
  background-color: transparent;
  position: absolute;
  z-index: 10;
  font-size: 22px;
  padding: 20px;
}
.fa-bars {
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
}
</style>
