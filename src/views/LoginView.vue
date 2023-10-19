<script setup>
  import { ref } from 'vue';

  // Déclarer les variables pour stocker l'email et le mot de passe
  const email = ref('');
  const password = ref('');

  // Variable pour stocker le token
  const authToken = ref(null);

  // Fonction pour envoyer les données du formulaire
  const submitForm = async () => {
    const formData = {
      email: email.value,
      password: password.value
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Récupérer la réponse JSON
        const data = await response.json();

        // Stocker le token dans le Local Storage
        localStorage.setItem('authToken', data.token);
        
        // Stocker le token dans la variable authToken
        authToken.value = data.token;

        console.log('Formulaire soumis avec succès');
      } else {
        console.error('Erreur lors de la soumission du formulaire');
      }
    } catch (error) {
      console.error('Erreur de connexion au serveur :', error);
    }
  };
</script>

<template>
  <div style="padding-top: 5rem;">
    <h1>login page</h1>
    <form @submit="submitForm" action="/">
      <label for="email">Email</label>
      <input type="email" style="color: black" v-model="email" id="email">
      <label for="password">Mot de passe</label>
      <input type="password" style="color: black" v-model="password" id="password">
      <button type="submit">Soumettre</button>
    </form>
  </div>
</template>
