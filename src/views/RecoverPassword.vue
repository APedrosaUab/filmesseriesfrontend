<template>
  <div class="reset-password-page">
    <div class="reset-password-form-container d-flex justify-content-center align-items-center">
      <div class="reset-password-form bg-psrlz p-4 rounded">
        <h3 class="mb-3">Redefinir Password</h3>
        <form @submit.prevent="resetPassword">
          <div class="form-floating mb-3">
            <input type="password" id="newPassword" class="form-control" v-model="newPassword" required placeholder="Nova Senha">
            <label for="newPassword">Nova Password</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" id="confirmNewPassword" class="form-control" v-model="confirmNewPassword" required placeholder="Confirmar Nova Senha">
            <label for="confirmNewPassword">Confirmar Nova Password</label>
          </div>
          <router-link to="/">
            <button class="btn btn-danger btnCancelar m-2">Cancelar</button>
          </router-link>
          <button type="submit" class="btn btn-success btnRedefinir m-2">Alterar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ResetPassword',
  data() {
    return {
      newPassword: '',
      confirmNewPassword: '',
      token: ''
    };
  },
  methods: {
    async resetPassword() {
  if (this.newPassword !== this.confirmNewPassword) {
    alert("As Passwords não coincidem.");
    return;
  }
  // Certifique-se de que token é passado corretamente na URL
  const token = this.$route.params.token; // Pegue o token dos parâmetros da rota
  try {
    await axios.post(`http://localhost:3000/recover/redefinir-password/${token}`, {
      newPassword: this.newPassword,
      confirmNewPassword: this.confirmNewPassword,
    });
    alert("Password redefinida com sucesso. Agora pode fazer login com a sua nova password.");
    this.$router.push('/');
  } catch (error) {
    console.error(error);
    alert(error.response.data.message || "Erro ao redefinir a password.");
  }
}

  }
};
</script>

<style scoped>
.reset-password-page {
  padding-bottom: 100px;
  min-height: 100vh;
  height: auto;
  width: 100%;
  max-width: 1920px;
  background-image: url("@/assets/images/landingPage.jpg");
  background-size: cover;
  background-position: center;
}

.reset-password-form-container {
  min-height: 70vh;
}

.reset-password-form {
  margin-top: 100px;
  width: 100%;
  max-width: 400px;
}

.bg-psrlz {
  background-color: #000;
  opacity: 0.9;
}

.btnRedefinir, .btnCancelar {
  max-width: 250px;
  width: 45%;
}

.form-group {
  margin-bottom: 15px;
}
</style>
