<script setup>


import { onMounted, ref } from 'vue'
import axios from 'axios'

const data = ref('');

onMounted(async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/actors');
    data.value = response.data["hydra:member"];
})

</script>

<template>

    <h3>Liste des meilleurs acteurs</h3>
    <div v-for="(actor, index) in data" :key="actor.id">
      <div v-if="index < 4">
        <router-link to="`/">
            {{ actor.firstName }} {{ actor.lastName }}
            {{ actor.nationalite.nationalite }}
            
            <div v-for="movie in actor.movies">
                {{ movie.title }}
            </div>
        </router-link>
      </div>
    </div>


</template>