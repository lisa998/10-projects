<template>
  <router-view />
  <div class="NavBar" @wheel="(e) => e.stopPropagation()">
    <div class="bg" :class="{ close: !nav }"></div>
    <div class="bg green" :class="{ close: !nav }"></div>
    <div id="nav" :class="{ close: !nav }">
      <router-link to="/" class="link" @click="closeNav">Home</router-link>
      <router-link :to="'/' + r" v-for="r in route" :key="r" class="link" @click="closeNav"
        >{{ ToName(r) }}
      </router-link>
    </div>
  </div>
  <div @click="handleNav" class="icon">
    <i class="fas fa-bars"></i>
    <transition>
      <div class="nav-hint" v-if="hint">
        <i class="far fa-hand-pointer"></i>
        <div class="nav-hint-text">
          <span
            v-for="(letter, i) in hintString"
            :key="i"
            :style="{ animationDelay: `${i * 0.1}s` }"
            >{{ letter }}</span
          >
        </div>
      </div>
    </transition>
  </div>
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
      hint: true,
      hintString: 'Click to Open Navigation',
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
      this.hint = false;
      this.nav = !this.nav;
    },
    closeNav() {
      this.nav = true;
    },
  },
});
</script>>

<style lang="scss" >
@keyframes upAndDown {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
}
* {
  box-sizing: border-box;
}

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
  width: 150px;
  height: 100vh;
  background-color: white;
  transition: 0.3s ease-out;
  transition-delay: 0.6s;
  top: 0;
  overflow-y: scroll;
  z-index: 5;
  &::-webkit-scrollbar {
    display: none;
  }
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
  width: 210px;
  height: 100vh;
  background-color: #2c3e50;
  position: absolute;
  top: 0;
  transition: 0.3s ease-out;
  transition-delay: 0s;
  z-index: 1;
  position: fixed;
  &.close {
    transition-delay: 0.6s;
  }
}
.green {
  background-color: #42b983;
  width: 180px;
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
  top: 0;
  position: fixed;
  cursor: pointer;
  & .nav-hint {
    width: 100px;
    height: 100px;
    box-sizing: content-box;
    border: 100px solid rgba(0, 0, 0, 0.219);
    border-radius: 50%;
    position: absolute;
    top: -105px;
    left: -105px;
    & .fa-hand-pointer {
      color: #000;
      position: relative;
      top: 1.2em;
      left: 0px;
      font-size: 2em;
      animation: upAndDown 0.7s infinite ease-in-out;
    }
    &-text {
      width: 300px;
      position: relative;
      top: 80px;
      left: 30px;
      display: flex;
      & span {
        min-width: 5px;
        animation: upAndDown 3s infinite ease-in-out;
      }
    }
  }
}
.v-leave {
  opacity: 1;
  transform: scale(1);
}
.v-leave-active {
  transition: 0.5s;
}
.v-leave-to {
  opacity: 0;
  transform: scale(0);
}
.fa-bars {
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
}
@media screen and (max-width: 900px) {
  .bg {
    width: 100vw;
  }
  .green {
    width: 90vw;
  }
  #nav {
    width: 80vw;
  }
  .icon {
    font-size: 2rem;
    & .nav-hint {
      font-size: 0.5em;
      &-text {
        width: 120px;
        flex-wrap: wrap;
      }
    }
  }
  .link {
    padding: 15px;
    top: 70px;
    font-size: 30px;
    text-align: center;
  }
}
</style>
