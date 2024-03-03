<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";
import SelectActor from "./SelectActor.vue";

const route = useRoute();

const errorModificationJson = ref(null);

const FirstName = ref("");
const LastName = ref("");
const nationalite = ref(null);

function handleSelectionChange(value) {
  nationalite.value = value;
}

const addMovie = async () => {
  const editedMovie = {
    firstName: FirstName.value,
    lastName: LastName.value,
    nationalite: `/api/nationalites/${nationalite.value}`,
  };
  console.log(editedMovie);
  errorModificationJson.value = null;
  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/actors`,
      editedMovie,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    // Réinitialiser la sélection du film après modification
    EditState.value = false;

    // Rafraîchir la liste des films
    errorModificationJson.value = null;
  } catch (error) {
    if (error.response.status == 422) {
      errorModificationJson.value = textToJson(
        error.response.data["hydra:description"]
      );
    }
    if (error.response.status == 400) {
    }
    console.error(
      "Erreur lors de la mise à jour du du film :",
      error.response.data
    );
  }
};

function textToJson(inputText) {
  const lines = inputText.split("\n");
  const result = {};

  lines.forEach((line) => {
    // Utiliser une expression régulière pour extraire la clé et la valeur
    const match = line.match(/([^:]+): (.+)/);

    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      result[key] = value;
    }
  });

  return result;
}

// --------------------------------------------------------------------------------------------------------------
// modal to modify setup
const EditState = ref(false);
console.log(EditState);
function toggleModifyTrue() {
  EditState.value = true;
  console.log(EditState.value);
}
function toggleModifyFalse() {
  EditState.value = false;
  console.log(EditState.value);
}
</script>

<template>
  <button class="main-btn" @click.prevent="toggleModifyTrue()">
    Ajouter un acteur
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      t="1551322312294"
      viewBox="0 0 1024 1024"
      version="1.1"
      pId="10297"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <path
        d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"
        pId="10298"
      ></path>
      <path
        d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"
        pId="10299"
      ></path>
    </svg>
  </button>

  <div :class="['bg-modal', { hidden: !EditState }]">
    <div class="modal">
      <div class="modal-top">
        <div @click="toggleModifyFalse()">
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
              d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
            ></path>
          </svg>
        </div>
      </div>
      <h2>Ajout d'un Acteur</h2>
      <form @submit.prevent="addMovie" class="form-modal">
        <div class="form-group">
          <label for="editMovieTitle">Prénom</label>
          <input
            :class="[
              {
                'error-border':
                  errorModificationJson && errorModificationJson.firstName,
              },
            ]"
            type="text"
            class="form-control"
            id="editMovieTitle"
            v-model="FirstName"
            placeholder="prénom"
          />

          <div
            class="error-text"
            v-if="errorModificationJson && errorModificationJson.firstName"
          >
            • {{ errorModificationJson.firstName }}
          </div>
        </div>

        <div class="form-group">
          <label for="editMovieDescription">Nom</label>
          <input
            :class="[
              {
                'error-border':
                  errorModificationJson && errorModificationJson.lastName,
              },
            ]"
            type="text"
            class="form-control"
            id="editMovieDescription"
            v-model="LastName"
            placeholder="nom"
          />

          <div
            class="error-text"
            v-if="errorModificationJson && errorModificationJson.lastName"
          >
            • {{ errorModificationJson.lastName }}
          </div>
        </div>

        <SelectActor
          @selection-changed="handleSelectionChange"
          v-model="nationalite"
        >
          <div
            class="error-text"
            v-if="errorModificationJson && errorModificationJson.nationalite"
          >
            • {{ errorModificationJson.nationalite }}
          </div>
        </SelectActor>

        <div class="container-btn">
          <button type="submit" class="btn main-btn">Ajouter</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style></style>
