<template>
  <h1>PokemonPage</h1>
  <div v-if="pokemon">
    <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      // id: null,
      pokemon: null,
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async getPokemon() {
      try {
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`).then((res) => res.json());
        this.pokemon = pokemon;
        console.log("pokemon", pokemon);
      } catch (error) {
        this.$router.push("/");
      }
    },
  },
  watch: {
    id() {
      this.getPokemon();
    },
  },
  created() {
    this.getPokemon();
  },
};
</script>

<style></style>
