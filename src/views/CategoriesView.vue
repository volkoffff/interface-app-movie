<script setup>
import categoriesCard from "../components/categoriesCard.vue";
import { onMounted, ref, computed } from "vue";
import axios from "axios";

onMounted(async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/actors`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
  data.value = response.data["hydra:member"];
});

const data = ref([]);
const dataSaved = ref([]);
const itemsPerPage = 15; // Nombre d'éléments par page
const currentPage = ref(1);
const searchQuery = ref("");
const selectedNationality = ref(""); // Catégorie sélectionnée pour le filtre

const filterByNationality = () => {
  if (selectedNationality.value) {
    // Filtrer les films par catégorie
    data.value = dataSaved.value.filter(
      (actor) => actor.nationalite.id === selectedNationality.value
    );
  } else {
    // Afficher tous les films si aucune catégorie n'est sélectionnée
    data.value = dataSaved.value;
  }
};

onMounted(async () => {
  await fetchData();
});

const displayedData = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(data.value.length / itemsPerPage));

const fetchData = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/categories`, {
    params: {
      name: searchQuery.value, // Utilisez la valeur de recherche dans la requête
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
  data.value = response.data["hydra:member"];
  dataSaved.value = response.data["hydra:member"];
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
  <div style="padding-top: 5rem">
    <div class="actors-list" v-if="data">
      <h3>Liste des catégories</h3>
      <form class="search">
        <svg
          class="search-icon"
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>

        <input
          @input="fetchData"
          class="searchbar"
          type="text"
          v-model="searchQuery"
          placeholder="Rechercher une catégorie"
        />
      </form>
      <div v-for="(categorie, index) in displayedData" :key="categorie.id">
        <categoriesCard :categorie="categorie" />
      </div>
      <div class="page-selector-section">
        <button
          class="main-btn"
          @click="previousPage"
          :disabled="currentPage === 1"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5.854 4.646a.5.5 0 010 .708L3.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z"
              clip-rule="evenodd"
            ></path>
            <path
              fill-rule="evenodd"
              d="M2.5 8a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Page précédente
        </button>
        <span>Page {{ currentPage }}</span>
        <button
          class="main-btn"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        >
          Page suivante
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z"
              clip-rule="evenodd"
            ></path>
            <path
              fill-rule="evenodd"
              d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.actors-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  padding-inline: 5vw;
  justify-content: center;
  gap: 14px;
  row-gap: 14px;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.actors-list > h3 {
  grid-column: 1/-1;
}
form {
  grid-column: 1/-1;
}
.page-selector-section {
  grid-column: 1/-1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main-btn {
  border: 0;
  padding: 10px 15px;
}
.main-btn:disabled {
  opacity: 0.4;
  pointer-events: none;
}
.search {
  position: relative;
  display: flex;
  gap: 10px;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  z-index: 1;
}

.search-icon > * {
  color: rgb(176, 176, 176);
}

.searchbar {
  background: rgba(83, 85, 85, 0.707);
  position: relative;
  color: rgb(230, 226, 226);
  border: 0;
  border-radius: 8px;
  padding: 10px 15px 10px 40px;
}
.searchbar::placeholder {
  color: azure;
}
.select {
  background: rgba(83, 85, 85, 0.707);
  position: relative;
  color: rgb(230, 226, 226);
  border: 0;
  border-radius: 8px;
  padding: 10px 15px 10px 10px;
}
</style>
