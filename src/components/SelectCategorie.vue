<!-- SelectComponent.vue -->
<template>
  <div class="form-group">
    <label for="categorie">Catégorie</label>
    <select id="categorie" class="select" v-model="selectedOption" @change="emitSelection">
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script>
import axios from 'axios';

export default {
props: {
    defaultValue: {
      type: [Number],
      default: null,
    },
  },
  data() {
    return {
      selectedOption: this.defaultValue,
      options: [], // Les données de l'API seront stockées ici
    };
  },
  mounted() {
    // Appel à l'API pour récupérer les données
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        // Remplacez l'URL de l'API par votre propre URL
        const response = await axios.get(
          `http://127.0.0.1:8000/api/categories`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        this.options = response.data["hydra:member"];
        console.log(this.options);

      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de l'API",
          error
        );
      }
    },
    emitSelection() {
      // Émettre un événement vers le composant parent avec la valeur sélectionnée
      this.$emit('selection-changed', this.selectedOption);
    },
  },
};
</script>

<style scoped>
.select {
  background: rgba(83, 85, 85, 0.707);
  position: relative;
  color: rgb(230, 226, 226);
  border: 0;
  border-radius: 8px;
  padding: 10px 15px 10px 10px;
}
</style>
