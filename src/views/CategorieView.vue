<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

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
  <div v-if="data">
    {{ data.name }}

    <div v-for="movie in data.movies">
      <RouterLink :to="`/movie/${movie.id}`">
        {{ movie.title }}
      </RouterLink>
    </div>
  </div>
</template>
