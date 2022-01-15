<template>
  <div class="form">
    <label>
      Card Number
      <input
        maxlength="19"
        @input="$emit('onCardNumberChange', $event)"
        :value="cardValue"
        ref="cardNumDom"
        @focus="$emit('numFocus')"
        @blur="$emit('numBlur')"
      />
    </label>
    <label>
      Card Holder
      <input
        type="text"
        :value="cardHolder"
        @input="$emit('update:cardHolder', $event.target.value)"
        ref="cardHolderDom"
        @focus="$emit('holderFocus')"
        @blur="$emit('holderBlur')"
      />
    </label>
    <div class="form-row">
      <div class="form-date">
        <label for="expiration_date">Expiration Date </label>
        <div class="form-date-select">
          <select
            :value="mm"
            @input="$emit('update:mm', $event.target.value)"
            id="expiration_date"
            ref="cardExpiresDom"
            @focus="$emit('expiresFocus')"
            @blur="$emit('expiresBlur')"
          >
            <option value disabled selected>Month</option>
            <option :value="month" v-for="month in months" :key="month">{{ month }}</option>
          </select>
          <select
            :value="yy"
            @input="$emit('update:yy', $event.target.value)"
            @focus="$emit('expiresFocus')"
            @blur="$emit('expiresBlur')"
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
          @input="$emit('onCvvChange', $event)"
          @focus="$emit('cvvFocus')"
          @blur="$emit('cvvBlur')"
        />
      </label>
    </div>
    <div class="form-submit">Submit</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormPart',
  props: {
    cardValue: String,
    cardCvv: String,
    cardHolder: String,
    mm: String,
    yy: String,
    cardNumDom: HTMLElement,
    cardHolderDom: HTMLElement,
    cardExpiresDom: HTMLElement,
  },
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
    return { months, years };
  },
});
</script>
