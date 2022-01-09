<template>
  <body>
    <div class="container">
      <card
        :back="back"
        :poundSign="poundSign"
        :cardValue="cardValue"
        :cardHolder="cardHolder"
        :mm="mm"
        :yy="yy"
        :cardCvv="cardCvv"
        :renderRotateCard="renderRotateCard"
        :cardNumDom="cardNumDom"
        :cardHolderDom="cardHolderDom"
        :cardExpiresDom="cardExpiresDom"
        :focusClass="focusClass"
      ></card>
      <div class="form">
        <label>
          Card Number
          <input
            maxlength="19"
            @input="onCardNumberChange"
            :value="cardValue"
            ref="cardNumDom"
            @focus="focusClass.num = true"
            @blur="focusClass.num = false"
          />
        </label>
        <label>
          Card Holder
          <input
            type="text"
            v-model="cardHolder"
            ref="cardHolderDom"
            @focus="focusClass.holder = true"
            @blur="focusClass.holder = false"
          />
        </label>
        <div class="form-row">
          <div class="form-date">
            <label for="expiration_date">Expiration Date </label>
            <div class="form-date-select">
              <select
                v-model="mm"
                id="expiration_date"
                ref="cardExpiresDom"
                @focus="focusClass.expires = true"
                @blur="focusClass.expires = false"
              >
                <option value disabled selected>Month</option>
                <option :value="month" v-for="month in months" :key="month">{{ month }}</option>
              </select>
              <select
                v-model="yy"
                @focus="focusClass.expires = true"
                @blur="focusClass.expires = false"
              >
                <option value disabled selected>Year</option>
                <option :value="year" v-for="year in years" :key="year">{{ year }}</option>
              </select>
            </div>
          </div>
          <label class="form-cvv">
            CVV
            <input
              type="number"
              :value="cardCvv"
              @input="onCvvChange"
              @focus="back = true"
              @blur="back = false"
            />
          </label>
        </div>
        <div class="form-submit">Submit</div>
      </div>
    </div>
  </body>
</template>

<script lang="ts">
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import { defineComponent, ref, computed, watch, onMounted, Ref } from 'vue';
import Card from './Card.vue';

export default defineComponent({
  name: 'CreditCardForm',
  components: { Card },
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
    const poundSign = '#### #### #### ####'.split('');
    const mm = ref('');
    const yy = ref('');
    const cardHolder = ref('');
    const cardNum = ref('');
    const cardCvv = ref('');
    const back = ref(false);
    const renderRotateCard = ref(false);
    const cardNumDom: Ref<HTMLElement | undefined> = ref();
    const cardHolderDom: Ref<HTMLElement | undefined> = ref();
    const cardExpiresDom: Ref<HTMLElement | undefined> = ref();
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
    const onCardNumberChange = (e: InputEvent) => {
      if ((e.target as HTMLInputElement).value.length < 20) {
        cardNum.value = (e.target as HTMLInputElement).value.replaceAll(' ', '');
        cardNum.value = cardNum.value.replace(/[^\d]/g, '');
      }
      return false;
    };
    const onCvvChange = (e: InputEvent) => {
      cardCvv.value = (e.target as HTMLInputElement).value.replaceAll(' ', '');
      cardCvv.value = cardCvv.value.replace(/[^\d]/g, '');
      if ((e.target as HTMLInputElement).value.length > 4) {
        cardCvv.value = cardCvv.value.slice(0, 4);
      }
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
      return str;
    });
    onMounted(() => {
      (cardNumDom.value as HTMLElement).focus();
    });

    return {
      months,
      years,
      mm,
      yy,
      cardNum,
      onCardNumberChange,
      cardValue,
      cardHolder,
      poundSign,
      cardCvv,
      onCvvChange,
      back,
      renderRotateCard,
      cardNumDom,
      cardHolderDom,
      cardExpiresDom,
      focusClass,
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
