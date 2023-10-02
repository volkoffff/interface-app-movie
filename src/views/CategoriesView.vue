<script setup>

import categoriesCard from '../components/categoriesCard.vue';

import { onMounted, ref } from 'vue'
import axios from 'axios'

const data = ref('');

onMounted(async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/categories');
    data.value = response.data["hydra:member"];
})


</script>


<template>

    <h3>Liste des catégories</h3>

    <div v-if="data">
        <div v-for="(categorie, index) in data" :key="categorie.id">
            <categoriesCard :categorie="categorie" />
        </div>
    </div>

</template>