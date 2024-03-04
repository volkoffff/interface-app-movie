<script setup>
import { ref } from "vue";

// Déclarer les variables pour stocker l'email et le mot de passe
const email = ref("");
const password = ref("");

// Variable pour stocker le token
const authToken = ref(null);

// Fonction pour envoyer les données du formulaire
const submitForm = async () => {
  const formData = {
    email: email.value,
    password: password.value,
  };

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      // Récupérer la réponse JSON
      const data = await response.json();

      // Stocker le token dans le Local Storage
      localStorage.setItem("authToken", data.token);

      // Stocker le token dans la variable authToken
      authToken.value = data.token;

      location.href = `${import.meta.env.VITE_DEFAULT_BASE_URL}`;

      console.log("Formulaire soumis avec succès");
    } else {
      console.error("Erreur lors de la soumission du formulaire");
    }
  } catch (error) {
    console.error("Erreur de connexion au serveur :", error);
  }
};
</script>

<template>
  <div
    style="
      padding-top: 5rem;
      display: grid;
      place-content: center;
      height: 100vh;
    "
  >
    <!-- <h1>login page</h1>
    <form @submit.prevent="submitForm" >
      <label for="email">Email</label>
      <input type="email" style="color: black" v-model="email" id="email">
      <label for="password">Mot de passe</label>
      <input type="password" style="color: black" v-model="password" id="password">
      <button type="submit">Soumettre</button>
    </form> -->

    <div class="form-container">
      <div class="logo-container">connexion</div>

      <form class="form" @submit.prevent="submitForm">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="email"
            id="email"
            type="text"
            name="email"
            placeholder="Enter your email"
            required=""
          />
        </div>
        <div class="form-group mt-10">
          <label for="password">Mot de passe</label>
          <input
            v-model="password"
            id="password"
            type="password"
            name="email"
            placeholder="Enter your password"
            required=""
          />
        </div>

        <button class="form-submit-btn" type="submit">Connexion</button>
      </form>

      <p class="signup-link">
        Pas de compte ?
        <a href="#" class="signup-link link"> s'inscrire</a>
      </p>
    </div>
  </div>
</template>

<style>
.form-container {
  max-width: 400px;
  background-color: rgb(31, 29, 37);
  padding: 32px 24px;
  font-size: 14px;
  font-family: inherit;
  color: #e4dddd;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
}
.mt-10 {
  margin-top: 10px;
}
.form-container .logo-container {
  text-align: center;
  font-weight: 600;
  font-size: 24px;
}

.form-container .form {
  display: flex;
  flex-direction: column;
}
input::placeholder {
  color: rgb(104, 98, 98);
}
.form-container .form-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.form-container .form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-container .form-group input {
  width: 100%;
  padding: 12px 12px;
  border-radius: 6px;
  font-family: inherit;
  border: 1px solid #ccc;
  color: black;
}

.form-container .form-submit-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
  color: #fff;
  background-color: #287be0;
  border: none;
  width: 100%;
  padding: 12px 16px;
  font-size: inherit;
  gap: 8px;
  margin: 12px 0;
  cursor: pointer;
  border-radius: 6px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.084), 0px 2px 3px rgba(0, 0, 0, 0.168);
}

.form-container .form-submit-btn:hover {
  background-color: rgb(42, 130, 237);
}
.form-container .form-submit-btn:active {
  background: #306fbc;
}
.form-container .link {
  color: #1778f2;
  text-decoration: none;
}

.form-container .signup-link {
  align-self: center;
  font-weight: 500;
}

.form-container .signup-link .link {
  font-weight: 400;
}

.form-container .link:hover {
  text-decoration: underline;
}
.form-container {
  min-width: 400px;
}
</style>
