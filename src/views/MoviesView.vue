<script setup>
import moviesCard from '../components/moviesCard.vue';
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'

const data = ref([]);
const itemsPerPage = 15; // Nombre d'éléments par page
const currentPage = ref(1);
const searchQuery = ref('');

onMounted(async () => {
  await fetchData();
})

const displayedData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(data.value.length / itemsPerPage));

const fetchData = async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/movies', {
    params: {
      title: searchQuery.value, // Utilisez la valeur de recherche dans la requête
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  });
  data.value = response.data["hydra:member"];
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};



</script>



<template>
  <div style="padding-top: 5rem;">
    <h3>Liste des movies</h3>

    <form >
      <input type="text" v-model="searchQuery" placeholder="Rechercher un film" style="color: black;"/>
      <button @click.prevent="fetchData">Rechercher</button>
    </form>

    <div v-if="data">
      <div v-for="(movie, index) in displayedData" :key="movie.id">
        <moviesCard :movie="movie" />
      </div>
    </div>
    <div>
      <span>Page {{ currentPage }}</span>
      <button @click="previousPage" :disabled="currentPage === 1">Page précédente</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Page suivante</button>
    </div>
  </div>
</template>