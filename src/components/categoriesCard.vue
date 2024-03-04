<script setup>
import { defineProps } from "vue";

defineProps({
  categorie: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <router-link :to="`/categorie/${categorie.id}`" class="card-categorie">
    <p>
      {{ categorie.name }}
    </p>
  </router-link>
</template>

<style>
.card-categorie {
  background-color: #000000;
  width: 300px;
  aspect-ratio: 16/9;
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: rgb(232, 231, 231);
  font-weight: bold;
  font-size: 2rem;
  transition: all 0.3s;
  position: relative;
}
.card-categorie::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s;
}
.card-categorie p {
  position: relative;
  z-index: 1;
}
.card-categorie:hover::after {
  border: #2f6cb6 solid 3px;
  width: calc(100% - 1rem);
  height: calc(100% - 1rem);
  background: rgb(17, 145, 202);
  background: radial-gradient(
    circle,
    rgba(17, 145, 202, 1) 0%,
    rgba(1, 4, 45, 1) 100%
  );
}
.card-categorie:hover {
  border: white solid 2px;
  font-size: 2.15rem;
}
</style>
