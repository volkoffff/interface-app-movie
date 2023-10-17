<script setup>
import moviesCard from '../components/moviesCard.vue';
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'

const data = ref([]);
const itemsPerPage = 15; // Nombre d'éléments par page
const currentPage = ref(1);
const searchQuery = ref('');
const displayedData = ref([]); // Nouvelle variable réactive pour les données affichées

onMounted(async () => {
  await fetchData();
})

const totalPages = computed(() => Math.ceil(displayedData.value.length / itemsPerPage));

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
  updateDisplayedData(); // Mettez à jour les données affichées
  console.log("data", data.value);
};

const updateDisplayedData = () => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  displayedData.value = data.value.slice(startIndex, endIndex);
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    updateDisplayedData(); // Mettez à jour les données affichées lors du changement de page
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    updateDisplayedData(); // Mettez à jour les données affichées lors du changement de page
  }
};
</script>




<template>
  <div style="padding-top: 5rem;">
    <h3>Liste des movies</h3>
    
    <!-- Champ de recherche -->
    <div>
      <input @input="fetchData" type="text" v-model="searchQuery" placeholder="Rechercher un film" style="color: black;"/>
      <button @click="fetchData" style="color: black;">Rechercher</button>
    </div>
    
    <div v-if="data">
      <div v-for="(movie, index) in displayedData" :key="movie.id">
          <moviesCard :movie="movie" />
      </div>
    </div>
    <div v-else>
      <p>Chargement...</p>
    </div>
    <div>
      <span>Page {{ currentPage }}</span>
      <button @click="previousPage" :disabled="currentPage === 1">Page précédente</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Page suivante</button>
    </div>
  </div>
</template>


