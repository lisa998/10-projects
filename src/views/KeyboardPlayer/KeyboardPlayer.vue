<template>
  <body>
    <h1>Keyboard Player</h1>
    <div class="content" v-if="!finish">
      <div style="display: flex" class="content-sentence">
        <span
          class="content-words"
          v-for="(word, wordIndex) in content.Content.split(' ')"
          :key="wordIndex"
          style="display: flex"
        >
          <div
            class="content-letter"
            v-for="(letter, letterIndex) in word.split('')"
            :key="letterIndex"
            :style="{
              color:
                wordIndex === currentWordIndex && nextLetterIndex === letterIndex ? 'coral' : null,
            }"
          >
            {{ letter }}
          </div>
          <div style="width: 10px">{{ ' ' }}</div>
        </span>
      </div>
      <div class="content-sentenceInfo">
        <div class="content-author" v-show="content.Author !== 'unknown'">{{ content.Author }}</div>
        <div class="content-source" v-show="content.Source !== 'unknown'">
          《{{ content.Source }}》
        </div>
      </div>
    </div>
    <div class="content end" v-else>
      <div>Finish~</div>
      <div @click="restart">Restart</div>
    </div>
    <div style="position: relative">
      <div class="border"></div>
      <input type="text" v-model="inputValue" />
    </div>

    <div class="keyboard">
      <div class="keyboard-bg"></div>
      <div v-for="(row, i) in buttons" :key="i" class="keyboard-row">
        <div
          v-for="(key, i) in row"
          :key="key"
          class="keyboard-button"
          :style="{
            width: specificWidth(key),
            color: nextLetter === key ? specificBgColor(i) : null,
            backgroundColor: specificBgColor(i),
            border: `2px solid ${specificBgColor(i)}`,
          }"
          :class="{ selected: nextLetter === key && !finish }"
        >
          {{ key }}
        </div>
      </div>
    </div>
  </body>
</template>

<script lang="ts">
/* eslint-disable object-curly-newline */
/* eslint-disable vue/no-side-effects-in-computed-properties */
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import { getSentence, specificWidth, specificBgColor, buttons } from './utils';

export default defineComponent({
  name: 'KeyboardPlayer',
  components: {},
  setup() {
    const inputValue = ref('');
    const content = ref({ Content: 'abc dfg', Author: '123', Source: '456', ID: '' });
    const sentence = computed(() => content.value.Content.split(' '));
    const currentWordIndex = ref(0);
    const nextLetterIndex = ref(0);
    const finish = ref(false);
    const currentWord = computed(() => sentence.value[currentWordIndex.value]);
    const nextLetter = computed(() => {
      const word = `${currentWord.value} ` || ' ';
      let next = word[0];
      let currect = true;
      for (let i = 0; i < inputValue.value.length - 1; i += 1) {
        if (inputValue.value[i] !== word[i]) {
          currect = false;
        }

        if (currect && word[i + 1]) {
          nextLetterIndex.value = i + 1;
          next = word[i + 1];
        }
      }
      return next.toUpperCase();
    });
    watch(
      () => inputValue.value,
      () => {
        if (inputValue.value === `${currentWord.value} `) {
          currentWordIndex.value += 1;
          inputValue.value = '';
          nextLetterIndex.value = 0;
          if (currentWordIndex.value >= sentence.value.length) {
            finish.value = true;
          }
        }
        // eslint-disable-next-line comma-dangle
      }
    );
    const restart = async () => {
      content.value = await getSentence();
      inputValue.value = '';
      finish.value = false;
    };

    onMounted(async () => {
      content.value = await getSentence();
    });

    return {
      buttons,
      specificWidth,
      specificBgColor,
      inputValue,
      currentWord,
      nextLetter,
      content,
      currentWordIndex,
      nextLetterIndex,
      restart,
      finish,
    };
  },
});
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Courgette&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Arvo:ital@1&display=swap');
* {
  margin: 0;
}
@keyframes vibrate-1 {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
}

body {
  background-color: #282828;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #e2d1c3;
  font-family: 'Arvo', serif;
}
.content {
  width: 50vw;
  height: 25vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-radius: 10px;
  padding: 50px;
  &-sentence {
    font-size: 1.5em;
    flex-wrap: wrap;
  }
  &-sentenceInfo {
    position: absolute;
    top: 18vh;
    right: 20px;
    font-size: 1.2em;
    font-family: 'Courgette', cursive;
  }
}
.end {
  font-size: 1.5em;
  & div:nth-child(2) {
    padding: 10px 20px;
    background: #81818130;
    border-radius: 10px;
    transition: 0.1s ease-in-out;
    &:hover {
      transform: scale(1.05);
    }
  }
}
input {
  width: 30vw;
  font-size: 1.2rem;
  padding: 10px 30px;
  border-radius: 10px;
  margin: 30px;
  border: unset;
  background-color: #282828;
  color: white;
  font-family: 'Arvo', serif;
  transform: var(--rotate);
  animation: spin 2.5s linear infinite;
  position: relative;
  z-index: 2;
  height: 4.5vh;
  &:focus {
    border: unset;
    outline: unset;
  }
}
.keyboard {
  width: 995px;
  position: relative;
  &-row {
    display: flex;
  }
  &-button {
    background-color: cornsilk;
    height: 3em;
    width: 3em;
    color: rgba(0, 0, 0, 0.7);
    border-radius: 0.4em;
    line-height: 3em;
    letter-spacing: 1px;
    margin: 0.4em;
    transition: 0.3s;
    text-align: center;
    font-size: 1em;
    position: relative;
    &.selected {
      animation: vibrate-1 0.3s linear infinite both;
      background-color: transparent !important;
    }
  }
  &-bg {
    background-color: #818181;
    opacity: 0.1;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
  }
}
</style>

<style scoped>
@property --rotate {
  syntax: '<angle>';
  initial-value: 20deg;
  inherits: false;
}
@keyframes spin {
  0% {
    --rotate: 10deg;
  }
  1% {
    --rotate: 135deg;
  }
  50% {
    --rotate: 200deg;
  }
  51% {
    --rotate: 305deg;
  }
  100% {
    --rotate: 370deg;
  }
}
.border {
  background-image: linear-gradient(var(--rotate), khaki, darkorange 43%, crimson);
  animation: spin 2.5s linear infinite;
  border-radius: 10px;
  width: 30.5vw;
  position: absolute;
  height: 5vh;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>
