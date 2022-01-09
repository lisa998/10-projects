<template>
  <div class="card" :class="{ back }">
    <div class="focusBorder" :class="focusClass"></div>
    <div class="card-front" v-show="!renderRotateCard">
      <div class="card-imgs">
        <img
          src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
          alt=""
        />
        <img
          src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png"
          alt="visa"
        />
      </div>
      <div class="card-imgs-nums cursor" @click="cardNumDom.focus()">
        <span v-for="(ele, i) in poundSign" :key="i" class="card-imgs-num">
          <transition name="number">
            <div v-if="cardValue[i] && i >= 5 && i <= 13 && i !== 9">*</div>
            <div v-else-if="cardValue[i]">{{ cardValue[i] }}</div>
            <div v-else>{{ ele }}</div>
          </transition>
        </span>
      </div>
      <div class="card-imgs-lastRow">
        <div class="card-imgs-holder cursor" @click="cardHolderDom.focus()">
          <div class="card-imgs-title">Card Holder</div>
          <transition name="holder" mode="out-in">
            <div v-if="!cardHolder">full name</div>
            <div v-else>
              <transition-group name="holder">
                <div v-for="(ele, i) in cardHolder.split('').slice(0, 20)" :key="i">
                  {{ ele }}
                </div>
                <div v-if="cardHolder.split('').length > 20">...</div>
              </transition-group>
            </div>
          </transition>
        </div>
        <div @click="cardExpiresDom.focus()" class="cursor">
          <div class="card-imgs-title">Expires</div>
          <div>
            <transition name="holder" mode="out-in">
              <span v-if="mm" :key="mm">{{ mm }}</span>
              <span v-else :key="0">MM</span>
            </transition>
            <span>/</span>
            <transition name="holder" mode="out-in">
              <span v-if="!yy">YY</span><span v-else :key="yy">{{ yy.slice(2, 4) }}</span>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div class="card-back" v-show="renderRotateCard">
      <div class="card-band"></div>
      <div class="card-cvv">
        <div class="card-cvv-title">CVV</div>
        <div class="card-cvv-content">
          <span v-for="(ele, i) in cardCvv.split('')" :key="i">*</span>
        </div>
      </div>
      <img
        src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png"
        alt="visa"
      />
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import { defineComponent, PropType } from 'vue';

interface FocusClass {
  num: boolean;
  holder: boolean;
  expires: boolean;
}
export default defineComponent({
  name: 'Home',
  components: {},
  props: {
    back: Boolean,
    poundSign: Array as PropType<string[]>,
    cardValue: String,
    cardHolder: String,
    mm: String,
    yy: String,
    cardCvv: String,
    renderRotateCard: Boolean,
    cardNumDom: HTMLElement,
    cardHolderDom: HTMLElement,
    cardExpiresDom: HTMLElement,
    focusClass: Object as PropType<FocusClass>,
  },
});
</script>
<style lang="scss" scoped>
.cursor {
  cursor: pointer;
  user-select: none;
}
.focusBorder {
  position: absolute;
  border-radius: 5px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 0.35s cubic-bezier(0.71, 0.03, 0.56, 0.85);
  z-index: -1;
  border-radius: 5px;
  border: 2px solid rgba($color: #ffffff, $alpha: 0.6);
  background-color: rgba($color: #000000, $alpha: 0.2);
  opacity: 0;
  &.num,
  &.holder,
  &.expires {
    z-index: 1;
    opacity: 1;
  }
  &.num {
    width: 80%;
    height: 20%;
    top: 112px;
    left: 44px;
  }
  &.holder {
    width: 65%;
    height: 23%;
    top: 190px;
    left: 10px;
  }
  &.expires {
    width: 24%;
    height: 23%;
    top: 190px;
    left: 315px;
  }
}
.card {
  width: 430px;
  height: 270px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  text-shadow: 7px 6px 10px rgb(14 42 90 / 80%);
  bottom: -150px;
  color: white;
  font-family: 'Source Code Pro', monospace;
  transition: 0.5s ease-in;
  border-radius: 10px;
  box-shadow: 0 25px 60px 5px rgb(90 116 148 / 70%);
  background-image: url('https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/17.jpeg');
  &-front,
  &-back {
    position: relative;
    z-index: 5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 25px;
  }
  &.back {
    transform: perspective(50em) rotate3d(0, 1, 0, 180deg);
  }
  &-back {
    transform: perspective(50em) rotate3d(0, 1, 0, 180deg);
    text-align: right;
    & img {
      width: 80px;
      opacity: 0.7;
      position: relative;
      left: 300px;
    }
    & .card {
      &-band {
        background-color: rgba($color: #000000, $alpha: 0.7);
        width: 800px;
        position: relative;
        left: -50px;
        height: 50px;
      }
      &-cvv {
        margin-bottom: 15px;
        &-title {
          font-size: 0.5em;
          margin-bottom: 5px;
        }
        &-content {
          border-radius: 5px;
          background: white;
          width: 100%;
          height: 50px;
          color: black;
          padding: 12px;
          text-shadow: none;
        }
      }
    }
  }

  &-imgs {
    display: flex;
    justify-content: space-between;
    & img:nth-child(1) {
      width: 60px;
    }
    & img:nth-child(2) {
      width: 80px;
    }
    &-lastRow {
      display: flex;
      justify-content: space-between;
    }
    &-nums {
      display: flex;
      justify-content: center;
      height: 1em;
      font-size: 1.5em;
      overflow: hidden;
      & .card-imgs-num {
        & div {
          min-width: 0.5em;
        }
      }
    }
    &-holder {
      & div {
        display: flex;
        &:nth-child(2) {
          text-transform: uppercase;
        }
      }
    }
    &-title {
      opacity: 0.7;
    }
  }
}
.number {
  &-enter-active {
    transform: translateY(0%);
    opacity: 0;
  }
  &-enter-to {
    transform: translateY(-100%);
    opacity: 1;
  }
  &-leave {
    transform: translateY(0%);
    opacity: 1;
  }
  &-enter-active,
  &-leave-active {
    transition: 0.3s linear;
  }
  &-leave-to {
    transform: translateY(-100%);
    opacity: 0;
  }
}

.holder {
  &-leave-active {
    transition: 0.2s linear;
  }
  &-enter-active {
    transition: 0.2s linear;
    transform: translateY(50%);
    opacity: 0;
  }
  &-leave {
    transform: translateY(50%);
    opacity: 1;
  }
  &-leave-to {
    transform: translateY(-50%);
    opacity: 0;
  }
  &-enter-to {
    transform: translateY(0%);
    opacity: 1;
  }
}
@media screen and (max-width: 600px) {
  .card {
    width: 90vw;
    height: 60vw;
    font-size: 3vw;
  }
  .focusBorder {
    &.num {
      width: 70%;
      height: 20%;
      top: 43%;
      left: 15%;
    }
    &.holder {
      width: 55vw;
      height: 12vw;
      bottom: 18px;
      top: unset;
      left: 10px;
    }
    &.expires {
      width: 20vw;
      height: 12vw;
      bottom: 18px;
      top: unset;
      left: unset;
      right: 16px;
    }
  }
}
</style>
