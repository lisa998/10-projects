/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
<template>
  <div class="body">
    <div class="nav">
      <h2>a<i class="fas fa-utensils"></i>recipes</h2>
      <div class="nav-input" @keypress.enter="search">
        <input type="text" placeholder="Search recipe here..." v-model="searchValue" />
        <span class="nav-input-icon" @click="search"><i class="fas fa-search"></i></span>
      </div>
    </div>
    <div class="favolist">
      <favo
        v-for="favo in favoList"
        :key="favo.idMeal"
        :favo="favo"
        @deleteFavo="deleteFavo"
        @openRecipe="setSelect(favo)"
      ></favo>
    </div>
    <div class="recipe">
      <card
        v-for="recipe in randomList"
        :key="recipe.idMeal"
        :recipe="recipe"
        @addFavo="addFavo"
      ></card>
    </div>
    <div class="model" v-if="selected.idMeal !== -1">
      <card :recipe="selected"></card>
      <div class="model-cross" @click="closeRecipe"><i class="far fa-times-circle"></i></div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable object-curly-newline */
import { defineComponent, onMounted, ref, Ref, onUnmounted, watch } from 'vue';
import Card from './Card.vue';
import Favo from './Favo.vue';
import { getRandomRecipe, RecipeInsert, searchRecipe } from './utils';
import { Recipe } from './interface';

export default defineComponent({
  name: 'RecipeApp',
  components: { Card, Favo },
  setup() {
    const searchValue = ref('');
    const favoList: Ref<Recipe[]> = ref([]);
    const randomList: Ref<Recipe[]> = ref([]);
    const selected: Ref<Recipe> = ref({
      idMeal: -1,
      strMeal: '',
      strCategory: '',
      strArea: '',
      strTags: '',
      strMealThumb: '',
      strInstructions: '',
    });
    function closeRecipe() {
      selected.value = {
        idMeal: -1,
        strMeal: '',
        strCategory: '',
        strArea: '',
        strTags: '',
        strMealThumb: '',
        strInstructions: '',
      };
    }
    function setSelect(recipe: Recipe) {
      selected.value = recipe;
    }
    function deleteFavo(id: number) {
      favoList.value = favoList.value.filter((favo) => favo.idMeal !== id);
    }
    async function search() {
      if (searchValue.value !== '') {
        try {
          const data = await searchRecipe(searchValue.value);
          const result = await RecipeInsert(data);
          randomList.value = result;
        } catch (err) {
          console.log(err);
        }
      }
    }
    function handleScroll(e: WheelEvent) {
      // eslint-disable-next-line operator-linebreak
      const scrollLeft =
        document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft || 0;
      window.scrollTo({
        left: scrollLeft + e.deltaY * 8,
        behavior: 'smooth',
      });
    }
    function addFavo(recipe: Recipe, add: boolean) {
      favoList.value = favoList.value.filter((ele) => ele.idMeal !== recipe.idMeal);
      if (add) {
        favoList.value.push(recipe);
      }
    }
    watch(
      () => favoList.value,
      (current) => {
        localStorage.setItem('favoRecipe', JSON.stringify(current));
        // eslint-disable-next-line comma-dangle
      }
    );
    onMounted(async () => {
      const favo = JSON.parse(localStorage.getItem('favoRecipe') || '');
      if (favo !== '') {
        favoList.value = favo;
      }
      document.addEventListener('wheel', handleScroll);
      try {
        const Promises = [
          getRandomRecipe(),
          getRandomRecipe(),
          getRandomRecipe(),
          getRandomRecipe(),
        ];
        Promise.all(Promises).then(async (data) => {
          const result = await RecipeInsert(data);
          randomList.value = result;
        });
      } catch (err) {
        console.log(err);
      }
    });
    onUnmounted(() => {
      document.removeEventListener('wheel', handleScroll);
    });
    return {
      favoList,
      randomList,
      searchValue,
      deleteFavo,
      search,
      handleScroll,
      addFavo,
      selected,
      setSelect,
      closeRecipe,
    };
  },
});
</script>
<style scoped lang='scss'>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');
$brown: #a5551f;
$beige: #fbf3fa;
$orange: #ff8e43;
* {
  font-family: 'Josefin Sans', sans-serif;
  box-sizing: border-box;
}
.body {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.fas,
.far {
  font-family: 'Font Awesome 5 Pro';
  font-weight: 700;
}
.nav {
  display: flex;
  width: 100vw;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  & h2 {
    color: $orange;
  }
  &-input {
    position: absolute;
    right: 20px;
    display: flex;
    align-items: center;
    &:hover {
      transform: scale(1.05);
    }
    & input {
      border: 0;
      background-color: $brown;
      color: $beige;
      padding: 10px 50px;
      border-radius: 50px;
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: $beige;
      }
    }
    &-icon {
      color: $beige;
      font-size: large;
      margin-left: -30px;
      cursor: pointer;
      &:hover {
        transform: scale(1.05);
      }
    }
  }
}
.favolist {
  background-color: rgb(247 249 255);
  height: 150px;
  width: 100vw;
  display: flex;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  margin: 20px 0;
  padding: 10px 5px;
  top: 70px;
  position: fixed;
  z-index: 1;
  &::-webkit-scrollbar {
    display: none;
  }
}
.recipe {
  display: flex;
  width: 100vw;
  justify-content: space-between;
  position: relative;
  top: 250px;
}
.model {
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.4);
  z-index: 5;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &-cross {
    color: white;
    font-size: xx-large;
    position: absolute;
    cursor: pointer;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    &:hover {
      transform: scale(1.1) translateX(-50%);
    }
  }
}
@media screen and(max-width:1000px) {
  .recipe {
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
    top: -60px;
  }
  .favolist {
    height: 100px;
    top: 0px;
    left: 0;
    position: sticky;
    margin: 74px 0;
  }
  .nav {
    top: 0;
    z-index: -1;
  }
}
@media screen and(max-width:768px) {
  .nav {
    & h2 {
      top: 160px;
      position: relative;
    }
    &-input > input {
      padding: 10px 10px;
    }
  }
  .recipe {
    flex-direction: column;
    align-items: center;
    top: -60px;
  }
  .model {
    align-items: flex-start;
    overflow: auto;
    &-cross {
      top: 10px;
    }
  }
}
</style>
