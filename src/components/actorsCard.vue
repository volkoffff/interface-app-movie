<script setup>
import { defineProps } from "vue";

defineProps({
  actor: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div v-if="actor">
    <router-link :to="`/actor/${actor.id}`">
      <div class="actor-card">
        <div
          class="actor-image"
          style="
            background-image: url(https://castprod.com/wp-content/uploads/2022/06/jean-dujardin.jpg);
          "
        ></div>
        <div class="card-actor-info">
          <p class="card-actor-title">
            {{ actor.firstName }} {{ actor.lastName }}
          </p>
          <p class="card-actor-subtitle">
            {{ actor.nationalite.nationalite }}
          </p>
        </div>
      </div>
    </router-link>
  </div>
  <div v-else>
    <div class="actor-card-loading loading"></div>
  </div>
</template>

<style>
.actor-card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 3px;
  width: 150px;
  overflow: hidden;
  aspect-ratio: 3/4;
  border-radius: 8px;
  transition: 0.4s ease;
  border: rgba(255, 255, 255, 0) 2px solid;
}
.actor-card-loading {
  width: 150px;
  overflow: hidden;
  aspect-ratio: 3/4;
  border-radius: 8px;
}
.actor-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 150px;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0) 60%
  );
  z-index: 2;
}
.actor-image {
  border-radius: 8px;
  aspect-ratio: 3/4;
  background-position: center;
  background-size: cover;
  width: 150px;
  position: absolute;
  z-index: 1;
  transition: 0.4s ease;
}
.card-actor-info {
  position: relative;
  z-index: 3;
  padding: 10px;
}
.card-actor-title {
  font-size: 1rem;
  font-weight: 500;
  color: rgb(222, 222, 222);
  line-height: normal;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-actor-subtitle {
  font-size: 0.8rem;
  font-weight: 300;
  color: rgb(174, 174, 174);

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.actor-card:hover {
  border: white 2px solid;
}
.actor-card:hover .actor-image {
  transform: scale(1.05);
}
/* .container-list > div:first-child .actor-card::after {
    background: linear-gradient(0deg, rgba(13, 70, 202, 0.83) 0%, rgba(13, 70, 202, 0) 60%);
} */
</style>
