<template>
  <div class="form">
    <input-component :label="'Card Number'" ref="numDom"></input-component>
    <input-component :label="'Card Holder'" ref="holderDom"></input-component>
    <div class="form-row">
      <expires ref="expiresDom"></expires>
      <input-component :label="'CVV'"></input-component>
    </div>
    <div class="form-submit">Submit</div>
  </div>
</template>

<script lang="ts">
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import { defineComponent, Ref, ref } from 'vue';
import Expires from './Expires.vue';
import InputComponent from './InputComponent.vue';

export default defineComponent({
  name: 'FormComponent',
  props: {},
  components: { InputComponent, Expires },
  setup() {
    const months: string[] = [];
    for (let i = 1; i <= 12; i += 1) {
      months.push(i.toString().padStart(2, '0'));
    }
    const years: string[] = [];
    const nowYear = new Date().getFullYear();
    for (let i = nowYear; i <= nowYear + 10; i += 1) {
      years.push(i.toString());
    }
    const numDom = ref();
    const focusNum = () => {
      numDom.value.toFocus();
    };
    const holderDom = ref();
    const focusHolder = () => {
      holderDom.value.toFocus();
    };
    const expiresDom = ref();
    const focusExpires = () => {
      expiresDom.value.toFocus();
    };

    return { months, years, focusNum, numDom, holderDom, focusHolder, expiresDom, focusExpires };
  },
});
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Source+Code+Pro:400,500,600,700|Source+Sans+Pro:400,600,700&display=swap');
@mixin inputStyle {
  &:focus {
    box-shadow: 0 5px 15px 0 rgb(90 116 148 / 40%);
    outline: 1px solid #5191ff;
    border: none;
  }
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.377);
  transition: 0.2s ease;
}

.form {
  width: 500px;
  height: 600px;
  border-radius: 10px;
  padding: 200px 35px 35px;
  box-shadow: 0 30px 60px 0 rgb(90 116 148 / 40%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  text-align: left;
  font-size: 0.5em;
  &-row {
    display: flex;
    margin: 10px 0px;
    align-items: center;
  }

  &-submit {
    background-color: #2364d2;
    color: white;
    box-shadow: 0 5px 15px 0 rgb(90 116 148 / 40%);
    width: 100%;
    height: 50px;
    padding: 12px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 15px;
    text-align: center;
    font-size: large;
  }
}
@media screen and (max-width: 600px) {
  .form {
    width: 90vw;
  }
}
</style>
