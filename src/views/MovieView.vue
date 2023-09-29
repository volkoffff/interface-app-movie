<script setup>

import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue'
import axios from 'axios'

const route = useRoute();
const routeId = route.params.id;




const data = ref('');

onMounted(async () => {
    const response = await axios.get(`http://127.0.0.1:8000/api/movies/${routeId}`);
    data.value = response.data;
})

</script>

<template>

    <div v-if="data">

        {{ data.title }}
        {{ data.category.name }}
        {{ data.duration }} minutes
        
        <div v-for="actor in data.actors">
            {{ actor.firstName }} {{ actor.lastName }}
        </div>

    </div>

</template>