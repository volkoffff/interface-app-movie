<script setup>
import actorsCard from '../components/actorsCard.vue';

import { onMounted, ref } from 'vue'
import axios from 'axios'

const data = ref('');


onMounted(async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/actors', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
    });
    data.value = response.data["hydra:member"];
})




</script>

<template>

    <h3>Liste des actors</h3>

    <div v-if="data">
        <div v-for="(actor, index) in data" :key="actor.id">
            <actorsCard :actor="actor" />
        </div>
    </div>

</template>