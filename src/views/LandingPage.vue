<template>
  <div class="landing-page">
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>
    <div class="landingPageTitle">
      <h1>Filmes e Séries</h1>
    </div>
    <div class="row login-form-container bg-psrlz p-4 rounded">
      <div class="col-12">
        <h3>Login</h3>
      </div>
      <div class="col-12 col-md-6 m-auto">
        <img src="@/assets/logo.png" alt="Logotipo do Site" class="logo-image" />
      </div>
      <div class="col-12 col-md-6 m-auto">
        <div class="login-form">
          <form @submit.prevent="login">
            <div class="form-floating mt-2">
              <input type="text" id="username" class="form-control" v-model="username" required>
              <label for="username">Username</label>
            </div>
            <div class="form-floating mt-2">
              <input type="password" id="password" class="form-control" v-model="password" required>
              <label for="password">Password</label>
            </div>
            <button type="submit" class="btn btn-success mt-3">Entrar</button>
          </form>
        </div>
      </div>
      <div class="col-12">
        <div class="form-group links mt-4">
          <p><router-link to="/register" class="text-light">Novo utilizador</router-link></p>
          <p><router-link to="/forgot" class="text-light">Recuperar Password</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LandingPage',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        const loginResponse = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/login`, {
          username: this.username,
          password: this.password
        });

        if (loginResponse.data.sessionToken) {
          localStorage.setItem('authToken', loginResponse.data.sessionToken);
          localStorage.setItem('username', loginResponse.data.username);
          localStorage.setItem('id_utilizador', loginResponse.data.id_utilizador);
          localStorage.setItem('avatarUser', loginResponse.data.avatarUser);
          this.$router.push('/home');
        } else {
          this.errorMessage = 'Erro ao tentar fazer login.';
        }
      } catch (error) {
        this.errorMessage = error.response.data.message || 'Erro ao tentar fazer login.';
      }
    }
  }
};

</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  height: auto;
  width: 100%;
  max-width: 1920px;
  background-image: url("@/assets/images/landingPage.jpg");
}

.logo {
  margin-bottom: 20px;
}

.landingPageTitle {
  text-align: center;
  padding-top: 100px;
}

.logo-image {
  max-width: 200px;
  width: 100%;
  margin-bottom: 10px;
}

.bg-psrlz {
  background-color: #000;
  opacity: 0.96;
}

.login-form-container {
  max-width: 500px;
  margin: auto;
  padding: 100px;
}

.login-form {
  max-width: 300px;
  margin: auto;
}

.form-group {
  margin-bottom: 15px;
}

@media screen and (max-width: 540px) {
  .login-form-container {
    margin: auto 20px;
  }
}
</style>
