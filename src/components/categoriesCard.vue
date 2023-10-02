<script setup>

import { defineProps } from 'vue';

defineProps({
    categorie: {
        type: Object,
        required: true
    }
})

</script>


<template>
    <router-link :to="`/categorie/${categorie.id}`">
        {{ categorie.name }}
    </router-link>
</template>