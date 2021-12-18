<template>
  <body>
    <div class="container">
      <h2>Password Generator</h2>
      <result-container :str="str" @copy="copy"></result-container>
      <div class="settings">
        <div class="setting">
          <label>Password Length</label>
          <input type="number" id="length" min="5" max="20" v-model="length" />
        </div>
        <check-box :settings="settings"></check-box>
      </div>
      <button class="btn btn-large" id="generate" @click="generatePsw">Generate Password</button>
    </div>
    <div v-if="showAlert" class="alert">{{ alert }}</div>
  </body>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CheckBox from './CheckBox.vue';
import ResultContainer from './ResultContainer.vue';

interface Setting {
  label: string;
  method: () => string;
  checked: boolean;
}

export default defineComponent({
  components: { CheckBox, ResultContainer },
  name: 'Home',
  data() {
    return {
      settings: [
        { label: 'uppercase letters', method: this.randomUpperCase, checked: true },
        { label: 'lowercase letters', method: this.randomLowerCase, checked: true },
        { label: 'numbers', method: this.randomNumber, checked: true },
        { label: 'symbols', method: this.randomSymbols, checked: true },
      ] as Setting[],
      length: 5,
      str: '',
      alert: '',
      showAlert: false,
    };
  },
  methods: {
    randomLetter() {
      return Math.ceil(Math.random() * 26);
    },
    randomUpperCase() {
      return String.fromCharCode(this.randomLetter() + 64);
    },
    randomLowerCase() {
      return String.fromCharCode(this.randomLetter() + 96);
    },
    randomNumber() {
      return Math.floor(Math.random() * 10).toString();
    },
    randomSymbols() {
      return String.fromCharCode(Math.ceil(Math.random() * 15) + 32);
    },
    generatePsw() {
      const functions = this.settings.filter((ele) => ele.checked).map((ele) => ele.method);
      this.str = '';
      for (let i = 0; i < this.length; i += 1) {
        this.str += functions[Math.floor(Math.random() * functions.length)]();
      }
    },
    copy() {
      navigator.clipboard
        .writeText(this.str)
        .then(() => {
          this.alert = 'Text copied to clipboard...';
          this.showAlert = true;
        })
        .catch((err) => {
          this.alert = `Something went wrong, err: ${err}`;
          this.showAlert = true;
        });
    },
  },
  watch: {
    showAlert() {
      setTimeout(() => {
        this.showAlert = false;
      }, 2000);
    },
  },
});
</script>
<style scoped lang='scss'>
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

* {
  box-sizing: border-box;
}

body {
  color: #fff;
  font-family: 'Muli', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  padding: 10px;
  margin: 0;
}
h2 {
  margin: 10px 0 20px;
  text-align: center;
}

.container {
  background-color: #2c3e50;
  box-shadow: 0px 2px 10px rgba(255, 255, 255, 0.2);
  padding: 20px;
  width: 350px;
  max-width: 100%;
}

.btn {
  border: none;
  background-color: #42b983;
  color: #fff;
  font-size: 16px;
  padding: 8px 12px;
  cursor: pointer;
  &-large {
    display: block;
    width: 100%;
  }
}

.setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
}
.alert {
  color: #2c3e50;
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #2c3e50;
  padding: 10px;
}
</style>
