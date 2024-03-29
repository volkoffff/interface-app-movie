<script setup>
import axios from "axios";
import { defineProps, onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  movie: {
    type: Object,
    required: false,
    default: null,
  },
  id: {
    type: Number,
    required: false,
  },
});

const movieData = ref(props.movie);

if (!movieData.value) {
  const movieId = ref(props.id);

  onMounted(async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/movies/${movieId.value}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    movieData.value = response.data;
  });
}

// Si la prop id change, réinitialise movieData à null pour indiquer le chargement
watch(
  () => props.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      movieData.value = null;
      if (newId) {
        // Réexécute la requête si une nouvelle ID est fournie
        fetchMovie(newId);
      }
    }
  }
);

async function fetchMovie(id) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/movies/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    movieData.value = response.data;
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div>
    <div v-if="movieData">
      <RouterLink :to="`/movie/${movieData.id}`">
        <div
          class="recommendation"
          style="
            background: url('https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABehTxClIItyfdHm85NAUu6RcDcpw_0d8P2Tk-Qc5v3GU7COvnf8ljvvicQCkgGNKASnQc4xxtGW8UFonxG8_YK6I7zds-DVSYL7l.jpg?r=31e');
            background-position: center;
          "
        >
          <div class="recommendation-info-container">
            <div class="recommendation-info">
              <div class="text-overflow">
                <p class="recommendation-info-title">{{ movieData.title }}</p>
                <p
                  class="recommendation-info-categorie"
                  v-if="movieData.category"
                >
                  {{ movieData.category.name }}
                </p>
              </div>
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm144.1 454.9L437.7 677.8a8.02 8.02 0 0 1-12.7-6.5V353.7a8 8 0 0 1 12.7-6.5L656.1 506a7.9 7.9 0 0 1 0 12.9z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
    <div v-else>
      <div class="recommendation-loading loading"></div>
    </div>
  </div>
</template>

<style></style>
