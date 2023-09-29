<script setup>

import { defineProps } from 'vue';

defineProps({
    actor: {
        type: Object,
        required: true
    }
})

</script>


<template>
    <router-link :to="`/actors/${actor.id}`">
        {{ actor.firstName }} {{ actor.lastName }}
        {{ actor.nationalite.nationalite }}
        
        <div v-for="movie in actor.movies">
            {{ movie.title }}
        </div>
    </router-link>
</template>