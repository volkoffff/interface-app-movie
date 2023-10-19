
<script setup>
import { ref, onMounted, watch, defineProps } from 'vue';
import axios from 'axios';
import { RouterLink } from 'vue-router';
import {RouterView} from 'vue-router';

const props = defineProps({
    movie: {
        type: Object,
        required: false,
        default: null
    },
    id: {
        type: Number,
        required: false,
    },
});

const movieData = ref(props.movie);

if (!movieData.value) {
    const movieId = ref(props.id);

    onMounted(async () => {
            const response = await axios.get(`http://127.0.0.1:8000/api/movies/${movieId.value}`, {
                headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
            });
            
            movieData.value = response.data;
    });
}

// Si la prop id change, réinitialise movieData à null pour indiquer le chargement
watch(() => props.id, (newId, oldId) => {
    if (newId !== oldId) {
        movieData.value = null;
        if (newId) {
            // Réexécute la requête si une nouvelle ID est fournie
            fetchMovie(newId);
        }
    }
});

async function fetchMovie(id) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/movies/${id}`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        });
        movieData.value = response.data;
    } catch (error) {
        console.error(error);
    }
}

</script>

<template>
    <div>
        
        <div v-if="movieData">
            <RouterLink :to="`/movie/${movieData.id}`">
                {{ movieData.title }}
                {{ movieData.category.name }}
                {{ movieData.duration }} minutes
            </RouterLink>
        </div>
        <div v-else>
            Chargement en cours...
        </div>
    </div>
</template>