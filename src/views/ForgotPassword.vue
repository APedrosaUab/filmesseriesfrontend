<template>
  <div class="forgot-password-page">
    <div class="forgot-password-form-container d-flex justify-content-center align-items-center">
      <div class="forgot-password-form bg-psrlz p-4 rounded">
        <h3 class="mb-3">Recuperar Senha</h3>
        <form @submit.prevent="recoverPassword">
          <div class="form-floating">
            <input type="email" id="email" class="form-control" v-model="email" required>
            <label for="email">E-mail</label>
          </div>
          <router-link to="/">
            <button class="btn btn-danger btnCancelar m-2">Cancelar</button>
          </router-link>
          <button type="submit" class="btn btn-success btnRecuperar m-2">Enviar Instruções</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: ''
    };
  },
  methods: {
    async recoverPassword() {
  try {
    await axios.post('http://localhost:3000/forgot/recuperar-password', { 
      email: this.email 
    });
    alert("Instruções de recuperação enviadas para o seu e-mail.");
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Se o erro for 404, utilizador não encontrado
      alert("Utilizador não encontrado com o e-mail indicado.");
    } else {
    console.log(error);
    alert(error.response.data.message || "Erro ao enviar instruções de recuperação.");
  }}
}
  }
};
</script>

<style scoped>
.forgot-password-page {
  padding-bottom: 100px;
  min-height: 100vh;
  height: auto;
  width: 100%;
  max-width: 1920px;
  background-image: url("@/assets/images/landingPage.jpg");
}

.forgot-password-form-container {
  min-height: 70vh;
}

.forgot-password-form {
  width: 100%;
  max-width: 500px;
}

.bg-psrlz {
  background-color: #000;
  opacity: 0.96;
}

.btnRecuperar, .btnCancelar {
  max-width: 250px;
  width: 45%;
}

.form-group {
  margin-bottom: 15px;
}
</style>
