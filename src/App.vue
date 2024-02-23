<script>
import { RouterLink, RouterView } from "vue-router";
import searchbarNavbar from "./components/searchbarNavbar.vue";
import Footer from "./components/Footer.vue";

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
                if (this.$route.path !== "/login")
                    this.$router.push("/login");
            }
        },
    },
    created() {
        this.checkToken();
    },
    components: { Footer }
};
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
        <RouterLink
          class="opacity-hover"
          to="/categories"
          v-slot="{ isActive }"
        >
          <span :class="{ 'active-link': isActive }">Categories</span>
        </RouterLink>
      </div>

      <div v-if="!token" class="nav-in">
        <searchbarNavbar />
        <RouterLink to="/login"> sign in </RouterLink>
        <RouterLink class="white-btn" to=""> sign up </RouterLink>
      </div>
      <div v-else class="nav-in gap-2">
        <RouterLink to="/me">
          <ion-icon
            class="person-circle-outline"
            name="person-circle-outline"
            size="large"
          ></ion-icon>
        </RouterLink>
        <RouterLink to="/logout">
          <ion-icon class="exit-outline" name="exit-outline"></ion-icon>
        </RouterLink>
      </div>
    </nav>
  </header>
  <div class="page">
    <RouterView :key="$route.path" />
  </div>
  <Footer ></Footer>
</template>

<style>
.gap-2 {
  gap: 8px;
}
.line-height-0 {
  line-height: 0;
}
.person-circle-outline {
  color: #4d6071;
}
.person-circle-outline:hover {
  color: #607588;
}
.exit-outline {
  color: #565656;
}
.exit-outline:hover {
  color: #7e7e7e;
}
.nav-in > a {
  height: fit-content;
  display: flex;
}
</style>
