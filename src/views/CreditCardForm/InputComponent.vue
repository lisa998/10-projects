<template>
  <label :class="{ 'form-cvv': label === 'CVV' }">
    {{ label }}
    <input
      :type="label === 'CVV' ? 'number' : null"
      :maxlength="maxlength[label]"
      @input="handleChange[label]"
      :value="handleValue[label]"
      @focus="focusFunction[label]"
      @blur="blurFunction[label]"
      ref="inputDom"
    />
  </label>
</template>

<script lang="ts">
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */

import { defineComponent, ref, computed, inject, onMounted, Ref } from 'vue';

export default defineComponent({
  name: 'InputComponent',
  components: {},
  props: {
    label: String,
  },
  setup(props) {
    const value:
      | Ref<{
          num: string;
          holder: string;
          mm: string;
          yy: string;
          cvv: string;
        }>
      | undefined = inject('value');
    const handleChangeValue:
      | {
          'Card Number': (str: string) => void;
          'Card Holder': (str: string) => void;
          CVV: (str: string) => void;
        }
      | undefined = inject('handleChangeValue');
    const focusFunction = inject('focusFunction');
    const blurFunction = inject('blurFunction');
    const cardNum = ref('');
    const cvv = ref('');

    // handleNumChange
    const onCardNumberChange = (e: InputEvent) => {
      if ((e.target as HTMLInputElement).value.length < 20) {
        cardNum.value = (e.target as HTMLInputElement).value.replaceAll(' ', '');
        cardNum.value = cardNum.value.replace(/[^\d]/g, '');
      }
      return false;
    };
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
      if (handleChangeValue) {
        handleChangeValue['Card Number'](str);
      }
      return str;
    });

    // handleHolderChange
    const onChange = (e: InputEvent) => {
      if (handleChangeValue) {
        handleChangeValue['Card Holder']((e.target as HTMLInputElement).value);
      }
    };

    // handleCvvChange
    const onCvvChange = (e: InputEvent) => {
      cvv.value = (e.target as HTMLInputElement).value.replaceAll(' ', '');
      cvv.value = cvv.value.replace(/[^\d]/g, '');
      if ((e.target as HTMLInputElement).value.length > 4) {
        cvv.value = cvv.value.slice(0, 4);
      }
      if (handleChangeValue) {
        handleChangeValue.CVV(cvv.value);
      }
    };
    const handleChange = {
      'Card Number': onCardNumberChange,
      'Card Holder': onChange,
      CVV: onCvvChange,
    };
    const handleValue = computed(() => ({
      'Card Number': cardValue.value,
      'Card Holder': value?.value.holder,
      CVV: cvv.value,
    }));
    const maxlength = {
      'Card Number': 19,
      'Card Holder': null,
      CVV: 4,
    };

    // handleFocus
    const inputDom: Ref<HTMLElement | undefined> = ref();
    const toFocus = () => {
      (inputDom.value as HTMLElement).focus();
    };
    onMounted(() => {
      if (props.label === 'Card Number') {
        toFocus();
      }
    });

    return {
      inputDom,
      cardValue,
      handleChange,
      handleValue,
      maxlength,
      focusFunction,
      blurFunction,
      toFocus,
    };
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
  &-cvv {
    margin-left: 20px !important;
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
}
@media screen and (max-width: 600px) {
  .form {
    & select {
      width: 20vw;
    }
  }
}
</style>
