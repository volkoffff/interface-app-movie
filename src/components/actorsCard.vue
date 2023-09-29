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
        {{ actor.firstName }} {{ actor.lastName }}
        {{ actor.nationalite.nationalite }}

    </router-link>
</template>