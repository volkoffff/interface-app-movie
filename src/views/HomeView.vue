<script setup>

import moviesCard from '../components/moviesCard.vue';
import actorsCard from '../components/actorsCard.vue';

import { onMounted, ref } from 'vue'
import axios from 'axios'

const data = ref('');
const dataActor = ref('');

onMounted(async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/movies');
    data.value = response.data["hydra:member"];
})

onMounted(async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/actors');
    dataActor.value = response.data["hydra:member"];
})


</script>

<template>

    <h1>
      Bienvenu sur la page d'accueil !
    </h1>

    <div>

      <h3>Liste des derniers ajouts</h3>
      <div v-for="(movie, index) in data" :key="movie.id">
        <div v-if="index < 4">
          <moviesCard :movie="movie" />
        </div>
      </div>

    </div>

    <br>
    <hr>
    <br>

    <div>

      <h3>Liste des meilleurs acteurs</h3>
      <div v-for="(actor, index) in dataActor" :key="actor.id">
        <div v-if="index < 4">
          <actorsCard :actor="actor" />
        </div>
      </div>

    </div>


</template>
