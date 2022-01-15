<template>
  <body>
    <div class="container">
      <card
        :back="back"
        :renderRotateCard="renderRotateCard"
        @number-click="cardNumDom.focus()"
        @holder-click="cardHolderDom.focus()"
        @expires-click="cardExpiresDom.focus()"
        :focusClass="focusClass"
        :value="value"
      ></card>
      <div class="form">
        <input-component
          :label="'Card Number'"
          v-model:Value="value.num"
          ref="cardNumDom"
          @focus="focusClass.num = true"
          @blur="focusClass.num = false"
        ></input-component>
        <input-component
          :label="'Card Holder'"
          v-model:Value="value.holder"
          ref="cardHolderDom"
          @focus="focusClass.holder = true"
          @blur="focusClass.holder = false"
        ></input-component>

        <div class="form-row">
          <expires
            v-model:mm="value.mm"
            v-model:yy="value.yy"
            ref="cardExpiresDom"
            @focus="focusClass.expires = true"
            @blur="focusClass.expires = false"
          ></expires>
          <input-component
            :label="'CVV'"
            v-model:Value="value.cvv"
            @focus="back = true"
            @blur="back = false"
          ></input-component>
        </div>
        <div class="form-submit">Submit</div>
      </div>
    </div>
  </body>
</template>

<script lang="ts">
// ref="cardExpiresDom"
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import { defineComponent, ref, watch, onMounted, Ref } from 'vue';
import Card from './Card.vue';
import Expires from './Expires.vue';
import InputComponent from './InputComponent.vue';

export default defineComponent({
  name: 'CreditCardForm',
  components: { Card, InputComponent, Expires },
  setup() {
    const back = ref(false);
    const renderRotateCard = ref(false);

    const cardNumDom: Ref<HTMLElement | undefined> = ref();
    const cardHolderDom: Ref<HTMLElement | undefined> = ref();
    const cardExpiresDom: Ref<HTMLElement | undefined> = ref();

    const value = ref({ num: '', holder: '', mm: '', yy: '', cvv: '' });
    const focusClass = ref({
      num: false,
      holder: false,
      expires: false,
    });
    watch(
      () => back.value,
      () => {
        setTimeout(() => {
          renderRotateCard.value = back.value;
        }, 350);
      }
    );

    onMounted(() => {
      // eslint-disable-next-line no-unused-expressions
      cardNumDom.value?.focus();
    });

    return {
      back,
      renderRotateCard,
      cardNumDom,
      cardHolderDom,
      cardExpiresDom,
      focusClass,
      value,
    };
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
* {
  margin: 0;
  box-sizing: border-box;
}
body {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  background: #ddeefc;
  font-family: 'Source Sans Pro', sans-serif;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  top: -10%;
  position: relative;
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
  &-date {
    &-select {
      display: flex;
      & select:nth-child(2) {
        margin-left: 20px !important;
      }
    }
  }
  &-cvv {
    margin-left: 20px !important;
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

  & input {
    padding: 5px 15px;
    height: 50px;
    width: 100%;
    -moz-appearance: textfield;
    @include inputStyle;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
  & label {
    width: 100%;
    margin: 10px 0px;
  }
  & select {
    padding: 5px 15px;
    height: 50px;
    @include inputStyle;
  }
}
@media screen and (max-width: 600px) {
  .form {
    width: 90vw;
    & select {
      width: 20vw;
    }
  }
}
</style>
