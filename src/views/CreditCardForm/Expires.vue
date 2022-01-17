<template>
  <div class="form-date">
    <label for="expiration_date">Expiration Date </label>
    <div class="form-date-select">
      <select
        :value="value.mm"
        @change="handleChangeValue.mm($event.target.value)"
        id="expiration_date"
        ref="expiresDom"
        @focus="focusFunction.expires"
        @blur="blurFunction.expires"
      >
        <option value disabled selected>Month</option>
        <option :value="month" v-for="month in months" :key="month">{{ month }}</option>
      </select>
      <select
        :value="value.yy"
        @change="handleChangeValue.yy($event.target.value)"
        @focus="focusFunction.expires"
        @blur="blurFunction.expires"
      >
        <option value disabled selected>Year</option>
        <option :value="year" v-for="year in years" :key="year">{{ year }}</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable object-curly-newline */
import { defineComponent, ref, Ref, inject } from 'vue';

export default defineComponent({
  name: 'Expires',
  props: {
    mm: String,
    yy: String,
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
    const expiresDom: Ref<HTMLElement | undefined> = ref();
    const toFocus = () => {
      (expiresDom.value as HTMLElement).focus();
    };
    const value = inject('value');
    const handleChangeValue = inject('handleChangeValue');
    const focusFunction = inject('focusFunction');
    const blurFunction = inject('blurFunction');
    return {
      months,
      years,
      toFocus,
      expiresDom,
      focusFunction,
      blurFunction,
      value,
      handleChangeValue,
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
  &-date {
    &-select {
      display: flex;
      & select:nth-child(2) {
        margin-left: 20px !important;
      }
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
    & select {
      width: 20vw;
    }
  }
}
</style>
