<template>
  <label :class="{ 'form-cvv': label === 'CVV' }">
    {{ label }}
    <input
      :type="label === 'CVV' ? 'number' : null"
      :maxlength="maxlength[label]"
      @input="handleChange[label]"
      :value="handleValue[label]"
      ref="InputDom"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    />
  </label>
</template>

<script lang="ts">
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'InputComponent',
  components: {},
  props: {
    Value: String,
    label: String,
  },
  emits: ['onCardNumberChange', 'focus', 'blur', 'update:Value'],
  setup(props, { emit }) {
    const InputDom = ref<HTMLInputElement | null>(null);
    const focus = () => {
      InputDom.value?.focus();
    };
    const cardNum = ref('');
    const cardValue = computed(() => {
      const num = cardNum.value;
      let str = '';
      for (let i = 0; i < num.length / 4; i += 1) {
        const slice = num.slice(0 + i * 4, 4 + i * 4);
        if (Math.floor(num.length / 4) === i || i === 3) {
          str += slice;
        } else {
          str = `${str}${slice} `;
        }
      }
      emit('update:Value', str);
      return str;
    });

    const onCardNumberChange = (e: InputEvent) => {
      if ((e.target as HTMLInputElement).value.length < 20) {
        cardNum.value = (e.target as HTMLInputElement).value.replaceAll(' ', '');
        cardNum.value = cardNum.value.replace(/[^\d]/g, '');
      }
      return false;
    };
    const onChange = (e: InputEvent) => {
      emit('update:Value', (e.target as HTMLInputElement).value);
    };

    const cvv = ref('');
    const onCvvChange = (e: InputEvent) => {
      cvv.value = (e.target as HTMLInputElement).value.replaceAll(' ', '');
      cvv.value = cvv.value.replace(/[^\d]/g, '');
      if ((e.target as HTMLInputElement).value.length > 4) {
        cvv.value = cvv.value.slice(0, 4);
      }
      emit('update:Value', cvv.value);
    };
    const handleChange = {
      'Card Number': onCardNumberChange,
      'Card Holder': onChange,
      CVV: onCvvChange,
    };
    const handleValue = computed(() => ({
      'Card Number': cardValue.value,
      'Card Holder': props.Value,
      CVV: cvv.value,
    }));
    const maxlength = {
      'Card Number': 19,
      'Card Holder': null,
      CVV: 4,
    };

    return { focus, InputDom, cardValue, handleChange, handleValue, maxlength };
  },
});
</script>
<style scoped lang='scss'>
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
