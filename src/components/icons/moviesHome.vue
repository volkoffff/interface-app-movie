<script setup>


import { onMounted, ref } from 'vue'
import axios from 'axios'

const data = ref('');

onMounted(async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/movies');
    data.value = response.data["hydra:member"];
})

</script>

<template>

    <h3>Liste des derniers ajouts</h3>
    <div v-for="(movie, index) in data" :key="movie.id">
      <!-- Affichez uniquement les 4 premiers éléments -->
      <div v-if="index < 4">
        <router-link to="/">
            {{ movie.title }}
            {{ movie.category.name }}
            {{ movie.duration }} minutes
            
            <div v-for="actor in movie.actors">
                {{ actor.firstName }} {{ actor.lastName }}
            </div>

        </router-link>
      </div>
    </div>


</template>