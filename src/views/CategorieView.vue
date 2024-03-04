<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import moviesCard from "../components/moviesCard.vue";

const route = useRoute();
const routeId = route.params.id;

const data = ref("");

onMounted(async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/api/categories/${routeId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  );
  data.value = response.data;
});
</script>

<template>
  <div v-if="data" style="padding-top: 5rem">
    <div class="categorie-banner">
      {{ data.name }}
    </div>

    <div style="margin-top: 2rem">
      <div>
        <div v-if="data" class="container-list">
          <moviesCard
            v-for="(movie, index) in data.movies"
            :key="movie.id"
            :id="movie.id"
            :movie="movie"
          />
        </div>
        <div v-else class="container-list">
          <div class="recommendation-loading loading"></div>
          <div class="recommendation-loading loading"></div>
          <div class="recommendation-loading loading"></div>
          <div class="recommendation-loading loading"></div>
          <div class="recommendation-loading loading"></div>
          <div class="recommendation-loading loading"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.categorie-banner {
  width: calc(100% - 40px);
  margin: auto;
  height: 150px;
  border: rgba(255, 255, 255, 0.768) 3px solid;
  border-radius: 8px;
  font-size: 2.1rem;
  font-weight: 700;
  display: grid;
  place-items: center;
}
</style>
