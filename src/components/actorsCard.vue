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
    <router-link :to="`/actor/${actor.id}`">
        <div class="actor-card">
            <div class="actor-image" style="background-image: url(https://castprod.com/wp-content/uploads/2022/06/jean-dujardin.jpg);"></div>
            <p class="card-title">
                {{ actor.firstName }} {{ actor.lastName }}
            </p>
            <p class="card-subtitle">
                {{ actor.nationalite.nationalite }}
            </p>
        </div>
        </router-link>
</template>

<style>
.actor-card {
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: 120px;
    overflow: hidden;
}

.actor-image {
    border-radius: 8px;
    aspect-ratio: 3/4;
    background-position: center;
    background-size: cover;
    width: 120px;
}
</style>