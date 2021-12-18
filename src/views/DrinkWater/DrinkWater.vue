<template>
  <body>
    <h1>Drink Water</h1>
    <h3>Goal: 2 Liters</h3>
    <div class="cup">
      <div class="remained">
        <div v-show="!(cups === 8)" class="remained">
          <span>{{ (8 - cups) / 4 }}L</span>
          <small>Remained</small>
        </div>
      </div>
      <div class="percentage" :style="{ height: ` ${height}%` }">
        <div v-show="!(cups === 0)">{{ (cups / 8) * 100 }}%</div>
      </div>
    </div>
    <p class="text">Select how many glasses of water that you have drank</p>
    <div class="cups">
      <div
        class="cup cup-small"
        v-for="(c, i) in Array(8)"
        :key="i"
        @click="setCup(i + 1)"
        :class="cups > i ? 'full' : null"
      >
        250 ml
      </div>
    </div>
  </body>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DrinkWater',
  components: {},
  data() {
    return {
      cups: 1,
    };
  },
  computed: {
    height(): number {
      return (this.cups / 8) * 100;
    },
  },
  methods: {
    setCup(cup: number) {
      if (this.cups === cup) {
        this.cups -= 1;
      } else {
        this.cups = cup;
      }
    },
  },
});
</script>
<style scoped lang='scss'>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,600&display=swap');

$border-color: #144fc6;
$fill-color: #6ab3f8;

* {
  box-sizing: border-box;
  user-select: none;
}

body {
  background-color: #3494e4;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin: 0;
}

h1 {
  margin: 10px 0 0;
}

h3 {
  font-weight: 400;
  margin: 10px 0;
}

.cup {
  background-color: #fff;
  border: 4px solid $border-color;
  color: $border-color;
  border-radius: 0 0 40px 40px;
  height: 330px;
  width: 150px;
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &.cup-small {
    height: 95px;
    width: 50px;
    border-radius: 0 0 15px 15px;
    background-color: rgba(255, 255, 255, 0.9);
    cursor: pointer;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 5px;
    transition: 0.3s ease;
    &.full {
      background-color: $fill-color;
      color: #fff;
    }
  }
}

.cups {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 280px;
}

.remained {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;
  transition: 0.3s ease;
  & span {
    font-size: 20px;
    font-weight: bold;
  }
  & small {
    font-size: 12px;
  }
}

.percentage {
  background-color: $fill-color;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 30px;
  height: 0;
  transition: 0.3s ease;
}

.text {
  text-align: center;
  margin: 0 0 5px;
}
</style>
