<script setup>

import { defineProps } from 'vue';

defineProps({
    movie: {
        type: Object,
        required: true
    }
})

</script>


<template>
    <router-link :to="`/movie/${movie.id}`">
            {{ movie.title }}
            {{ movie.category.name }}
            {{ movie.duration }} minutes
            
            <div v-for="actor in movie.actors">
                {{ actor.firstName }} {{ actor.lastName }}
            </div>
    </router-link>
</template>