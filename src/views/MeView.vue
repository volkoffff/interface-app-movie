<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import EditPassword from "../components/EditPassword.vue";
import Logout from "../components/Logout.vue";

const errorModificationJson = ref(null);
const meData = ref();
const email = ref();
const firstName = ref();
const lastName = ref();
const id = ref();
const edition = ref(false);

const fetchMe = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    meData.value = response.data;
    email.value = response.data.email;
    firstName.value = response.data.firstName;
    lastName.value = response.data.lastName;
    id.value = response.data.id;
  } catch (error) {
    console.error(error);
    localStorage.removeItem("token");
  }
};

onMounted(() => {
  console.log("Mounted");
  fetchMe();
});

const cancelAccount = () => {
  edition.value = !edition.value;
  email.value = meData.value.email;
  firstName.value = meData.value.firstName;
  lastName.value = meData.value.lastName;
  errorModificationJson.value = null;
};

const handleEdit = (e) => {
  e.preventDefault();
  edition.value = !edition.value;
  console.log(edition);
};

const saveAccount = async () => {
  const editedData = {
    email: email.value,
    firstName: firstName.value,
    lastName: lastName.value,
  };
  console.log(editedData);
  errorModificationJson.value = null;
  try {
    await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/users/${id.value}`,
      editedData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/merge-patch+json",
        },
      }
    );

    edition.value = !edition.value;
    fetchMe();
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
</script>

<template>
  <div class="me-container">
    <div class="banner-grb">
      <div class="banner-rgb-">
        <div class="rond" v-if="firstName && lastName">
          {{ Array.from(firstName)[0] }}{{ Array.from(lastName)[0] }}
        </div>
        <h2>{{ firstName }}{{ " " }}{{ lastName }}</h2>
      </div>
      <Logout class="logout" />
    </div>
    <div class="me-container-top">
      <h3>Informations personnelles</h3>
      <p>Modifiez vos informations personnelles ici</p>
      <div class="me-container-top-content" v-if="meData">
        <div class="me-container-top-content-top">
          <form action="">
            <div class="input-form">
              <label for="firstName">Nom</label>
              <input
                type="text"
                id="firstName"
                v-model="firstName"
                :disabled="!edition"
                :class="[
                  {
                    'error-border':
                      errorModificationJson && errorModificationJson.firstName,
                  },
                ]"
              />
              <div
                class="error-text"
                v-if="errorModificationJson && errorModificationJson.firstName"
              >
                • {{ errorModificationJson.firstName }}
              </div>
            </div>
            <div class="input-form">
              <label for="lastName">Prénom</label>
              <input
                type="text"
                id="lastName"
                v-model="lastName"
                :disabled="!edition"
                :class="[
                  {
                    'error-border':
                      errorModificationJson && errorModificationJson.lastName,
                  },
                ]"
              />
              <div
                class="error-text"
                v-if="errorModificationJson && errorModificationJson.lastName"
              >
                • {{ errorModificationJson.lastName }}
              </div>
            </div>
            <div class="input-form">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                v-model="email"
                :disabled="!edition"
                :class="[
                  {
                    'error-border':
                      errorModificationJson && errorModificationJson.email,
                  },
                ]"
              />
              <div
                class="error-text"
                v-if="errorModificationJson && errorModificationJson.email"
              >
                • {{ errorModificationJson.email }}
              </div>
            </div>
          </form>
        </div>
        <div class="me-container-top-content-bottom">
          <EditPassword />

          <button v-if="!edition" class="main-btn" @click="handleEdit">
            Modifier
          </button>
          <button v-if="edition" class="secondary-btn" @click="cancelAccount">
            Cancel
          </button>
          <button v-if="edition" class="main-btn" @click="saveAccount">
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.banner-grb {
  background: rgb(17, 145, 202);
  background: linear-gradient(87deg, rgb(21, 105, 141) 0%, rgb(6, 10, 57) 100%);
  width: 100%;
  height: 130px;
  margin-bottom: 80px;
  position: relative;
}
.banner-rgb- {
  position: absolute;
  display: flex;
  align-items: flex-end;
  left: 20px;
  bottom: 0;
  transform: translate(0, 50%);
}
.banner-rgb- > h2 {
  font-size: 2.5rem;
  margin-left: 15px;
}
.banner-rgb- > .rond {
  display: grid;
  place-content: center;
  font-size: 60px;
  font-weight: 700;
  text-transform: uppercase;
  width: 120px;
  height: 120px;
  background: #46906e;
  border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0px 10px 20px 0px #00000066;
}
.logout {
  position: absolute;
  bottom: -50px;
  right: 20px;
}
.me-container {
  padding-top: 5rem;
  min-height: 100vh;
  padding-inline: 20px;
}
.me-container-top > h3 {
  margin-top: 1rem;
  margin-bottom: 0.1rem;
}
.me-container-top > p {
  margin-bottom: 1.5rem;
  color: #888e8e;
}
.me-container-top-content {
  display: flex;
  flex-direction: column;
  background: rgb(42, 42, 42);
  max-width: 600px;
  border-radius: 12px;
  padding-top: 1rem;
}
.me-container-top-content-top > form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding-inline: 1rem;
}
.me-container-top-content-bottom {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
  border-top: 1px solid rgb(81, 79, 79);
  padding-top: 1rem;
  gap: 0.5rem;
  padding: 1rem;
}
.gray-link {
  color: #b0b0b0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;
  font-size: 14px;
}
.input-form {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.input-form > input {
  background: #404243;
  border: none;
  background: rgba(83, 85, 85, 0.707);
  color: rgb(230, 226, 226);
  border: 0;
  border-radius: 8px;
  padding: 10px 15px;
}
.input-form > input:disabled {
  background: #6a6b6b;
  color: #888e8e;
}
.input-form > input:disabled:hover {
  cursor: not-allowed;
}
</style>
