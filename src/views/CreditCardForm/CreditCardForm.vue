<template>
  <body>
    <div class="container">
      <card
        :back="back"
        :renderRotateCard="renderRotateCard"
        @number-click="formDom.focusNum()"
        @holder-click="formDom.focusHolder()"
        @expires-click="formDom.focusExpires()"
        :focusClass="focusClass"
        :value="value"
      ></card>
      <form-component ref="formDom"></form-component>
    </div>
  </body>
</template>

<script lang="ts">
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import { defineComponent, ref, watch, Ref, provide } from 'vue';
import Card from './Card.vue';
import FormComponent from './FormComponent.vue';

export default defineComponent({
  name: 'CreditCardForm',
  components: { Card, FormComponent },
  setup() {
    const renderRotateCard = ref(false);
    const formDom: Ref<HTMLElement | undefined> = ref();

    const back = ref(false);
    const value = ref({ num: '', holder: '', mm: '', yy: '', cvv: '' });
    const focusClass = ref({
      num: false,
      holder: false,
      expires: false,
    });
    const focusOn = {
      'Card Number': () => {
        focusClass.value.num = true;
      },
      'Card Holder': () => {
        focusClass.value.holder = true;
      },
      CVV: () => {
        back.value = true;
      },
      expires: () => {
        focusClass.value.expires = true;
      },
    };
    const blur = {
      'Card Number': () => {
        focusClass.value.num = false;
      },
      'Card Holder': () => {
        focusClass.value.holder = false;
      },
      CVV: () => {
        back.value = false;
      },
      expires: () => {
        focusClass.value.expires = false;
      },
    };
    const handleChangeValue = {
      'Card Number': (str: string) => {
        value.value.num = str;
      },
      'Card Holder': (str: string) => {
        value.value.holder = str;
      },
      CVV: (str: string) => {
        value.value.cvv = str;
      },
      mm: (str: string) => {
        value.value.mm = str;
      },
      yy: (str: string) => {
        value.value.yy = str;
      },
    };
    // to delay rotate render
    watch(
      () => back.value,
      () => {
        setTimeout(() => {
          renderRotateCard.value = back.value;
        }, 350);
      }
    );
    provide('back', back);
    provide('value', value);
    provide('handleChangeValue', handleChangeValue);
    provide('focusFunction', focusOn);
    provide('blurFunction', blur);

    return {
      back,
      renderRotateCard,
      formDom,
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
