<script setup>

import moviesCard from '../components/moviesCard.vue';

import { onMounted, ref } from 'vue'
import axios from 'axios'

const data = ref('');

onMounted(async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/movies');
    data.value = response.data["hydra:member"];
})


</script>


<template>

    <h3>Liste des movies</h3>

    <div v-if="data">
        <div v-for="(movie, index) in data" :key="movie.id">
            <moviesCard :movie="movie" />
        </div>
    </div>

</template>