<template>
  <div>
    <!-- Votre contenu de composant ici -->
    <button
      @click="viderLocalStorage"
      class="last-class-of-the-project-pls-help-me"
    >
      se déconnecter
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    viderLocalStorage() {
      // Efface le contenu du local storage
      localStorage.clear();
      // Redirige l'utilisateur vers la page de connexion
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.last-class-of-the-project-pls-help-me {
  background-color: rgba(255, 0, 0, 0.363);
  color: white;
  padding: 0.3rem 0.8rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

</style>
