<script setup>

import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue'
import axios from 'axios'

const route = useRoute();
const routeId = route.params.id;




const data = ref('');

onMounted(async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/actors/${routeId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
    });
    data.value = response.data;
})

</script>

<template>

    <div v-if="data">

        {{ data.firstName }} {{ data.lastName }}
        {{ data.nationalite.nationalite }}
        
        <div v-for="movie in data.movies">
            <RouterLink :to="`/movie/${movie.id}`">
                {{ movie.title }}
            </RouterLink>
        </div>

    </div>

</template>