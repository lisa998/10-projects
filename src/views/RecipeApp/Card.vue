<template>
  <div class="card" :class="{ notfoled: !folded }">
    <div class="card-pic" :class="{ folded }">
      <img class="card-pic-bg" :src="recipe.strMealThumb" />
      <div class="card-pic-gradient"></div>
      <div class="card-pic-icon" @click="clickBookmark">
        <i class="far fa-bookmark" v-if="!addFavo"></i>
        <i class="fas fa-bookmark" :style="{ color: '#ff8e43' }" v-else></i>
      </div>
      <div class="card-pic-info">
        <h2>{{ recipe.strMeal }}</h2>
        <p>Area: {{ recipe.strArea }}</p>
        <p>Tags: {{ recipe.strTags }}</p>
        <p>Category: {{ recipe.strCategory }}</p>
      </div>
    </div>
    <div class="card-text" :class="{ folded }">
      <div style="overflow: hidden; height: 100%">
        <div class="card-text-tabs">
          <h3
            v-for="item in tabs"
            :key="item"
            @click="clickTab(item)"
            :class="{ selected: selectTab === item }"
          >
            {{ item }}
          </h3>
        </div>
        <div class="card-text-content" ref="contentDom" @wheel="(e) => e.stopPropagation()">
          <div v-if="selectTab === 'Ingredient'" class="card-text-content-ingredient">
            <div>
              <div style="font-weight: 600">Ingredient</div>
              <div v-for="ele in recipe.strIngredient" :key="ele">{{ ele }}</div>
            </div>
            <div>
              <div style="font-weight: 600">Measure</div>
              <div v-for="ele in recipe.strMeasure" :key="ele">{{ ele }}</div>
            </div>
          </div>
          <div v-else>{{ recipe.strInstructions }}</div>
        </div>
        <div class="card-text-downIcon" v-if="showDownIcon && !folded">
          <i class="fas fa-angle-down"></i>
        </div>
      </div>

      <div class="card-text-opnBtn" :class="{ folded }" @click="folded = !folded">
        <i class="fas fa-chevron-circle-left"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, Ref, onMounted, nextTick,
} from 'vue';
import { Recipe } from './interface';
import { checkDomHeight } from './utils';

export default defineComponent({
  name: 'Card',
  props: {
    recipe: Object as PropType<Recipe>,
  },
  setup(props, target) {
    const tabs = ['Ingredient', 'Instructions'];
    const selectTab = ref('Instructions');
    const contentDom: Ref<null | HTMLElement> = ref(null);
    const folded = ref(true);
    const showDownIcon = ref(false);
    const addFavo = ref(false);

    const clickBookmark = () => {
      addFavo.value = !addFavo.value;
      target.emit('addFavo', props.recipe, addFavo.value);
    };
    const clickTab = async (item: string) => {
      selectTab.value = item;
      await nextTick();
      showDownIcon.value = checkDomHeight(contentDom);
    };
    onMounted(() => {
      showDownIcon.value = checkDomHeight(contentDom);
    });
    return {
      tabs, selectTab, contentDom, showDownIcon, folded, clickTab, addFavo, clickBookmark,
    };
  },
});
</script>
<style scoped lang='scss'>
$orange: #ff8e43;
.card {
  display: flex;
  align-items: center;
  user-select: none;
  margin: 50px 20px;
  position: relative;
  z-index: 0;
  &.notfoled {
    z-index: 3;
  }
  &-pic {
    width: 300px;
    height: 450px;
    position: relative;
    justify-content: center;
    box-shadow: 25px 10px 70px -5px rgb(0 0 0 / 30%);
    color: white;
    display: flex;
    align-items: flex-end;
    line-height: 1.25em;
    border-radius: 5px;
    transition: 0.3s ease-in-out;
    z-index: 3;
    &-gradient {
      height: 250px;
      width: 100%;
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.65) 68%);
      position: absolute;
      border-radius: 5px;
    }
    &-bg {
      width: 100%;
      height: 100%;
      position: absolute;
      object-fit: cover;
      border-radius: 5px;
    }
    &-icon {
      top: 20px;
      right: 20px;
      position: absolute;
      cursor: pointer;
    }
    &-info {
      position: relative;
      bottom: 10px;
      padding: 10px;
      width: 100%;
      & h2 {
        height: 50px;
        padding: 15px;
      }
      & h2,
      p {
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    &.folded {
      box-shadow: 1px 1px 20px -5px rgb(0 0 0 / 50%);
    }
  }
  &-text {
    width: 410px;
    height: 400px;
    box-shadow: 15px 20px 70px -5px rgb(0 0 0 / 20%);
    border-radius: 5px;
    background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);
    position: relative;
    transition: 0.5s ease-in-out;
    transition-delay: 0.4s;
    left: 0;
    &.folded {
      width: 0px;
      z-index: 5;
    }
    &-tabs {
      display: flex;
      justify-content: center;
      border-bottom: 3px solid #f3e5da;
      & h3 {
        padding: 5px 20px;
        cursor: pointer;
        user-select: none;
        position: relative;
        height: 60px;
        margin: 0px 30px;
        border-top: 7px solid transparent;
        transition: 0.2s ease;
        padding: 15px 0;
        &:hover,
        &.selected {
          border-top: 7px solid $orange;
        }
      }
    }
    &-content {
      width: 100%;
      line-height: 1.5em;
      padding: 20px 30px;
      height: 320px;
      overflow-x: hidden;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      &-ingredient {
        display: flex;
        justify-content: space-evenly;
      }
    }
    &-opnBtn {
      color: $orange;
      font-size: 1.5em;
      position: absolute;
      top: 50%;
      right: -10px;
      transform: translateY(-50%);
      transition: 0.3s ease-in-out;
      cursor: pointer;
      height: 27px;
      & i {
        border-radius: 50%;
        box-shadow: 0px 0px 10px 1px $orange;
        background-color: white;
      }
      &.folded {
        transform: translateY(-50%) rotateZ(180deg);
      }
    }
    &-downIcon {
      position: absolute;
      font-size: 0.8em;
      bottom: 2px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
@media screen and(max-width:768px) {
  .card {
    margin: 50px 0;
    flex-direction: column;
    &-text {
      width: 300px;
      top: 100%;
      left: 0;
      &.folded {
        width: 300px;
        height: 0;
      }
      &-opnBtn {
        top: 97%;
        right: 50%;
        transform: translateX(50%) rotateZ(90deg);
        z-index: 3;
        &.folded {
          transform: translateX(50%) rotateZ(-90deg);
        }
      }
    }
  }
}
</style>
