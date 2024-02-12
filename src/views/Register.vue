<template>
  <div class="register-page">
    <div class="register-form-container d-flex justify-content-center align-items-center">
      <div class="register-form bg-psrlz p-4 rounded">
        <h3>Registrar</h3>
        <form @submit.prevent="register">
          <div class="row">
            <div class="col-12 col-md 5 form-floating m-2">
              <input type="text" id="nome" class="form-control" v-model="nome" required>
              <label for="nome">Nome:</label>
            </div>
            <div class="col-12 col-md 5 form-floating m-2">
              <input type="text" id="apelido" class="form-control" v-model="apelido" required>
              <label for="nome">Apelido:</label>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md 5 form-floating m-2">
              <input type="text" id="username" class="form-control" v-model="username" required>
              <label for="username">Nome de utilizador:</label>
            </div>
            <div class="col-12 col-md 5 form-floating m-2">
              <input type="date" id="dataNascimento" class="form-control" v-model="dataNascimento" :max="maxDate"
                required>
              <label for="dataNascimento">Data Nascimento:</label>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md 5 form-floating m-2">
              <input type="email" id="email" class="form-control" v-model="email" required>
              <label for="email">E-mail:</label>
            </div>
            <div class="col-12 col-md 5 form-floating m-2">
              <input type="email" id="confirmEmail" class="form-control" v-model="confirmEmail" required>
              <label for="confirmEmail">Confirmar E-mail:</label>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md 5 form-floating m-2">
              <input type="password" id="password" class="form-control" v-model="password" required>
              <label for="password">Senha:</label>
            </div>
            <div class="col-12 col-md 5 form-floating m-2">
              <input type="password" id="confirmPassword" class="form-control" v-model="confirmPassword" required>
              <label for="confirmPassword">Confirmar Senha:</label>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="avatar-selection row">
                <span>Selecione um avatar:</span>
                <div v-for="avatar in avataresDisponiveis" :key="avatar" class="avatar-option col-2">
                  <img :src="`/assets/images/avatars/${avatar}.png`" :alt="`Avatar ${avatar}`"
                    @click="selectAvatar(avatar)" :class="{ 'selected-avatar': avatarSelecionado === avatar }">
                </div>
              </div>
            </div>
          </div>
          <router-link to="/">
            <button class="btn btn-danger btnCancelar m-2">Cancelar</button>
          </router-link>

          <button type="submit" class="btn btn-success btnRegistar m-2">Registrar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import validator from 'validator';

export default {
  name: 'Register',
  data() {
    return {
      nome: '',
      apelido: '',
      username: '',
      dataNascimento: '',
      maxDate: this.calculateMaxDate(),
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      avataresDisponiveis: [1, 2, 3, 4, 5, 6, 7, 8],
      avatarSelecionado: 1,
    };
  },
  methods: {
    async register() {
      if (!validator.isEmail(this.email)) {
        alert("Por favor, insira um e-mail válido.");
        return;
      }
      if (!this.isOldEnough(this.dataNascimento)) {
        alert("Para registar-se neste site deve ter mais de 18 anos.");
        return;
      }

      if (this.email !== this.confirmEmail) {
        alert("Os e-mails não coincidem.");
        return;
      }
      if (this.password !== this.confirmPassword) {
        alert("As senhas não coincidem.");
        return;
      }

      try {
        await axios.post('http://localhost:3000/utilizadores', {
          nome: this.nome,
          apelido: this.apelido,
          username: this.username,
          dataNascimento: this.dataNascimento,
          email: this.email,
          password: this.password,
          avatarUser: this.avatarSelecionado,
        });
        alert("Utilizador registado com sucesso. Está a ser redirecionado para a página login...");
        this.$router.push('/');
      } catch (error) {
        console.error(error);
        alert(error.response.data.message || "Erro ao registar Utilizador.");
      }
    },

    calculateMaxDate() {
      const today = new Date();
      const maxYear = today.getFullYear() - 18;
      return `${maxYear}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    },
    isOldEnough(birthDate) {
      const minAge = 18;
      const today = new Date();
      const birthDateObj = new Date(birthDate);
      const age = today.getFullYear() - birthDateObj.getFullYear();
      const m = today.getMonth() - birthDateObj.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
        return age > minAge;
      }
      return age >= minAge;
    },
    selectAvatar(avatar) {
      this.avatarSelecionado = avatar;
    },
  }
};
</script>

<style scoped>
.register-page {
  padding-bottom: 100px;
  min-height: 100vh;
  height: auto;
  width: 100%;
  max-width: 1920px;
  background-image: url("@/assets/images/landingPage.jpg");
}

.register-form-container {
  min-height: 70vh;
}

.register-form {
  margin-top: 100px;
  width: 100%;
  max-width: 500px;
}

.bg-psrlz {
  background-color: #000;
  opacity: 0.96;
}

.form-group {
  margin-bottom: 15px;
}

.btnRegistar,
.btnCancelar {
  width: 200px;
}

.selected-avatar {
  border: 2px solid #007bff;
  border-radius: 50%;
}

@media screen and (max-width: 540px) {
  .register-form {
    margin: auto 20px;
  }
}</style>
