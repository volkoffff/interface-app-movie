<script setup>

import { RouterLink, RouterView } from 'vue-router'

</script>

<template>

  <header>
    <nav>
      <div class="nav-in">
        <RouterLink class="opacity-hover" to="/" v-slot="{ isActive }">
          <span :class="{ 'active-link': isActive }">Home</span>
        </RouterLink>
        <RouterLink class="opacity-hover" to="/movies" v-slot="{ isActive }">
          <span :class="{ 'active-link': isActive }">Movies</span>
        </RouterLink>
        <RouterLink class="opacity-hover" to="/actors" v-slot="{ isActive }">
          <span :class="{ 'active-link': isActive }">Actors</span>
        </RouterLink>
        <RouterLink class="opacity-hover" to="/categories" v-slot="{ isActive }">
          <span :class="{ 'active-link': isActive }">Categories</span>
        </RouterLink>
      </div>
      <div class="nav-in">
        <RouterLink to="/login">
          sign in
        </RouterLink>
        <RouterLink class="white-btn" to="">
          sign up
        </RouterLink>
      </div>
    </nav>
  </header>
  <div class="page">
    <RouterView :key="$route.path"/>
  </div>

</template>
