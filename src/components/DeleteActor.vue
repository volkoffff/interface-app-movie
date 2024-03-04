<script setup>
import axios from "axios";
import { defineProps, onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";

const route = useRoute();
const routeId = route.params.id;

const handleDelete = async () => {
  console.log(route, route.value);
  try {
    await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/api/actors/${routeId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};
</script>
<template>
  <div>
    <RouterLink to="/" @click.prevent="handleDelete" class="delete-btn"
      >Supprimer</RouterLink
    >
  </div>
</template>

<style>
.delete-btn {
  color: rgb(228, 44, 44);
  border: none;
  background-color: transparent;
  font-size: 1rem;
}
.delete-btn:hover {
  color: rgb(255, 0, 0);
  cursor: pointer;
  text-decoration: underline;
}
</style>
