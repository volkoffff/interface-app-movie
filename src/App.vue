<script>
import { RouterLink, RouterView } from "vue-router";
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";
import SearchbarNavbar from "./components/searchbarNavbar.vue";

const token = localStorage.getItem("authToken"); // Récupérer le token d'authentification

export default {
  data() {
    return {
      token: localStorage.getItem("authToken"), // Récupérer le token d'authentification
    };
  },
  watch: {
    $route: function (to, from) {
      this.checkToken();
    },
  },
  methods: {
    checkToken() {
      if (!this.token) {
        // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
        if (this.$route.path !== "/login") this.$router.push("/login");
      }
    },
    toggleactivenav() {
      const nav = document.querySelector("nav");
      nav.classList.toggle("active");
    },
  },
  created() {
    this.checkToken();
  },
  components: { Footer, SearchbarNavbar },
};

</script>

<template>
  <header>
    <p class="burgere-title">Muvy</p>
    <button class="burgere-icon" @click="toggleactivenav()">
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
          d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"
        ></path>
      </svg>
    </button>
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
        <RouterLink
          class="opacity-hover"
          to="/categories"
          v-slot="{ isActive }"
        >
          <span :class="{ 'active-link': isActive }">Categories</span>
        </RouterLink>
      </div>

      <div v-if="!token" class="nav-in">
        <RouterLink to="/login"> sign in </RouterLink>
        <RouterLink class="white-btn" to=""> sign up </RouterLink>
      </div>
      <div v-else class="nav-in gap-2">
        <SearchbarNavbar />
        <RouterLink to="/me" class="account">
          <ion-icon
            class="person-circle-outline"
            name="person-circle-outline"
            size="large"
          ></ion-icon>
          Account
        </RouterLink>
      </div>
    </nav>
  </header>
  <div class="page">
    <RouterView :key="$route.path" />
  </div>
  <Footer></Footer>
</template>

<style>
.gap-2 {
  gap: 8px;
}
.line-height-0 {
  line-height: 0;
}
.person-circle-outline {
  color: #8497a8;
}
.nav-in > a {
  height: fit-content;
  display: flex;
}
.account {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #8497a8;
  height: 36px !important;
  background: rgba(83, 85, 85, 0.707);
  padding-left: 4px;
  padding-right: 8px;
  border-radius: 8px;
}
.account:hover {
  background: rgba(103, 106, 106, 0.707);
}
</style>
