<template>
  <div class="body">
    <h1>Pokedex</h1>
    <div class="card-container">
      <card
        :pokemon="pokemon"
        v-for="(pokemon, i) in pokemons"
        :color="colors[pokemon.type]"
        :key="i"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios, { AxiosResponse } from 'axios';
import Card from './Card.vue';

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonResponse {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: {
    // eslint-disable-next-line camelcase
    front_default: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  type: string;
  img: string;
}

export default defineComponent({
  name: 'PokeDex',
  components: { Card },
  data() {
    return {
      pokemons: [] as Pokemon[],
      colors: {
        fire: '#FDDFDF',
        grass: '#DEFDE0',
        electric: '#FCF7DE',
        water: '#DEF3FD',
        ground: '#f4e7da',
        rock: '#d5d5d4',
        fairy: '#fceaff',
        poison: '#98d7a5',
        bug: '#f8d5a3',
        dragon: '#97b3e6',
        psychic: '#eaeda1',
        flying: '#F5F5F5',
        fighting: '#E6E0D4',
        normal: '#F5F5F5',
      },
    };
  },
  async mounted() {
    for (let i = 1; i < 73; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await this.getPoke(i);
    }
  },
  methods: {
    async getPoke(i: number) {
      const result: AxiosResponse<PokemonResponse> = await axios(
        `https://pokeapi.co/api/v2/pokemon/${i}`,
      );

      const {
        name, id, types, sprites,
      } = result.data;
      this.pokemons.push({
        name,
        id,
        type: types[0].type.name,
        img: sprites.front_default,
      });
    },
  },
});
</script>
<style scoped lang='scss'>
.body {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: 'Lato', sans-serif;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #d4d3dd, #efefbb);
  min-height: 80vh;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1200;
}
</style>
