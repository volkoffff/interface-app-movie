<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'

const searchQuery = ref('');
const data = ref([])

onMounted(async () => {
  await fetchData();

})

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

document.addEventListener('DOMContentLoaded', () => {
// Sélectionne l'élément avec la classe '.searchbar-navbar'
const searchbarNavbar = document.querySelector('.searchbar-navbar');

function removeFocusOnScroll() {
  searchbarNavbar.blur();
}

// Ajoute un écouteur d'événements pour détecter le défilement de la page
window.addEventListener('scroll', removeFocusOnScroll);
})


</script>

<template>
  <div class="search">
    <svg class="search-icon" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    <input @input="fetchData" v-model="searchQuery" class="searchbar-navbar" placeholder="Search a movie" type="text">
    <div class="searchbar-navbar-result">
      <div v-for="(movie, index) in data" :key="movie.id">
        <div class="movie-card">
          <div class="movie-card-image" style="background-image: url(https://i.etsystatic.com/27725708/r/il/008c5a/2904647259/il_fullxfull.2904647259_ilg7.jpg);"></div>
          <p class="movie-card-title">{{ movie.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.search {
  position: relative;
}
.search-icon {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    z-index: 1000;
}
.search-icon > * {
    color: rgb(176, 176, 176);
}
.searchbar-navbar {
    background: rgba(83, 85, 85, 0.707);
    position: relative;
    z-index: 1000;
    color: rgb(230, 226, 226);
    border: 0;
    border-radius: 8px;
    padding: 10px 15px 10px 40px;
}
.searchbar-navbar::placeholder {
    color: azure;
}
.searchbar-navbar-result {
    /* transform: translateX(100%); */
    position: fixed;
    width: 50%;
    height: 100vh;
    right: -50%;
    top: 0;
    opacity: 0;
    transition: opacity 0.2s ease-out;
    display: flex;
    flex-wrap: wrap;
    padding: 80px;
    padding-right: 20px;
    /* padding-left: 20%; */
    justify-content: end;
    gap: 20px;
    overflow-y: scroll;
    padding-top: 60px;
}
.searchbar-navbar:focus + .searchbar-navbar-result {
    z-index: 999;
    right: 0%;
    opacity: 1;
    background: linear-gradient(90deg , rgba(0, 0, 0, 0) 0% , black 50%, black 100%) ;
}
.movie-card {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.movie-card-image {
    aspect-ratio: 3/4;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 150px;
}
</style>