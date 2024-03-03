<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const id = ref();
const errorModificationJson = ref();

const password = ref("");
const rePassword = ref("");

const fetchMe = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    id.value = response.data.id;
  } catch (error) {
    console.error(error);
    localStorage.removeItem("token");
  }
};

onMounted(() => {
  fetchMe();
});

const editPaswword = async () => {
  if (password.value !== rePassword.value) {
    errorModificationJson.value = {
      password: "Les mots de passe doivent être les mêmes",
    };
  } else {
    errorModificationJson.value = null;

    const data = {
      password: password.value,
    };
    errorModificationJson.value = null;
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/${id.value}/reset-password`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/merge-patch+json",
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
  <button class="gray-link" @click.prevent="toggleModifyTrue()">
    modifier le mot de passe
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
      <h2>Nouveau mod te passe</h2>
      <form @submit.prevent="editPaswword" class="form-modal">
        <div class="form-group">
          <label for="editMovieTitle">Nouveau mot de passe</label>
          <input
            :class="[
              {
                'error-border':
                  errorModificationJson && errorModificationJson.password,
              },
            ]"
            type="password"
            class="form-control"
            id="editMovieTitle"
            v-model="password"
            placeholder="Mot de passe"
          />

          <div
            class="error-text"
            v-if="errorModificationJson && errorModificationJson.password"
          >
            • {{ errorModificationJson.password }}
          </div>
        </div>
        <div class="form-group">
          <label for="editMovieTitle">Comfirmation du mot de passe</label>
          <input
            :class="[
              {
                'error-border':
                  errorModificationJson && errorModificationJson.password,
              },
            ]"
            type="password"
            class="form-control"
            id="editMovieTitle"
            v-model="rePassword"
            placeholder="Comfirmation du mot de passe"
            @keydown="samePassword"
          />

          <div
            class="error-text"
            v-if="errorModificationJson && errorModificationJson.password"
          >
            • {{ errorModificationJson.password }}
          </div>
        </div>
        <div class="container-btn">
          <button type="submit" class="btn main-btn">Modifier</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style></style>
