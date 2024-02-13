<template>
  <div class="content container">
    <div class="row">
      <div class="col-12">
        <h2><span v-if="isEditing">Editar</span> Perfil do Utilizador</h2>
      </div>
      <div class="editBtnPrf"><button class="btn btn-success" v-if="!isEditing" @click="editProfile"><i
            class="fas fa-edit"></i></button></div>
    </div>
    <div class="row mt-2">
      <div class="row col-12 col-md-4">
        <div><span class="lightblue">Username:</span> {{ username }}</div>
        <img :src="`/assets/images/avatars/${avatarUser}_gd.png`" alt="avatar" class="avatarUser">
        <div class="col-12" v-if="isEditing">
          <div class="avatar-selection row">
            <span>Selecione um avatar:</span>
            <div v-for="avatar in avataresDisponiveis" :key="avatar" class="avatar-option col-3 col-md-4 col-lg-2">
              <img :src="`/assets/images/avatars/${avatar}.png`" :alt="`Avatar ${avatar}`" @click="selectAvatar(avatar)">
            </div>
          </div>
        </div>
      </div>
      <div class="row col-12 col-md-8 profile">
        <form class="form-floating">
          <div class="col-12 m-2">
            <div class="form-floating" v-if="isEditing">
              <input class="form-control" id="nomeControl" v-model="nome" />
              <label for="nomeControl">Nome</label>
            </div>
            <span v-if="!isEditing"><span class="lightblue">Nome:</span> {{ nome }}</span>
          </div>
          <div class="col-12 m-2">
            <div class="form-floating" v-if="isEditing">
              <input class="form-control" id="apelidoControl" v-model="apelido" />
              <label for="apelidoControl">Apelido</label>
            </div>
            <span v-if="!isEditing"><span class="lightblue">Apelido:</span> {{ apelido }}</span>
          </div>
          <div class="col-12 m-2">
            <div class="form-floating" v-if="isEditing">
              <input class="form-control" id="dataNascControl" v-model="dataNascimentoInput" />
              <label for="dataNascControl">Data de Nascimento</label>
            </div>
            <span v-if="!isEditing"><span class="lightblue">Data de Nascimento:</span> {{ formatDate(dataNascimento)
            }}</span>
          </div>
          <div class="col-12 m-2">
            <div class="form-floating" v-if="isEditing">
              <input class="form-control" id="emailControl" v-model="email" />
              <label for="emailControl">Email</label>
            </div>
            <span v-if="!isEditing"><span class="lightblue">Email:</span> {{ email }}</span>
          </div>
        </form>
      </div>
      <div class="row mt-3">
        <div class="col-12">
          <button class="btn btn-danger btnActionUpdate m-2" v-if="isEditing"
            @click="cancelUpdateProfile">Cancelar</button>
          <button class="btn btn-success btnActionUpdate m-2" v-if="isEditing" @click="updateProfile">Alterar</button>
        </div>
      </div>

      <div class="row m-auto">
        <div class="col-12 mt-3">
          <h2>As minhas listas</h2>
        </div>
        <div class="col-12 text-left">
          <h4 class="lightblue">Filmes a Ver</h4>
          <table v-if="filmesAVer.length" class="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Género(s)</th>
                <th>Avaliação Pessoal</th>
                <th class="d-none d-md-table-cell">Avaliação Geral</th>
                <th>Comentário</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="filmeAVer in filmesAVer" :key="filmeAVer._id">
                <td>{{ filmeAVer.filme.nome || 'Filme não encontrado' }}</td>
                <td>{{ filmeAVer.filme.genero.join(', ') || 'Não disponível' }}</td>
                <td v-html="generateStars(filmeAVer.avaliacao)"></td>
                <td class="d-none d-md-table-cell">{{ filmeAVer.filme.avaliacao_api || 'Não disponível' }}</td>
                <td>{{ filmeAVer.comentario || 'Sem comentários' }}</td>
                <td>
                  <router-link :to="`/movies/${filmeAVer.id_filme}`">
                    <button @click="" class="btn btn-success btnEdActions"><i class="fas fa-search"></i></button>
                  </router-link>
                  <button @click="abrirModalEdicao(filmeAVer, 'filme', 'a_ver')" class="btn btn-primary btnEdActions"><i
                      class="fas fa-edit"></i></button>
                  <button @click="eliminarFilme(filmeAVer._id)" class="btn btn-danger btnEdActions"><i
                      class="fas fa-trash"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else>Sem registos</p>
        </div>
        <div class="col-12 text-left">
          <h4 class="lightblue">Filmes Vistos</h4>
          <table v-if="filmesVistos.length" class="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Género(s)</th>
                <th>Avaliação Pessoal</th>
                <th class="d-none d-md-table-cell">Avaliação Geral</th>
                <th>Comentário</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="filmeVisto in filmesVistos" :key="filmeVisto._id">
                <td>{{ filmeVisto.filme.nome || 'Filme não encontrado' }}</td>
                <td>{{ filmeVisto.filme.genero.join(', ') || 'Não disponível' }}</td>
                <td v-html="generateStars(filmeVisto.avaliacao)"></td>
                <td class="d-none d-md-table-cell">{{ filmeVisto.filme.avaliacao_api || 'Não disponível' }}</td>
                <td>{{ filmeVisto.comentario || 'Sem comentários' }}</td>
                <td>
                  <router-link :to="`/movies/${filmeVisto.id_filme}`">
                    <button @click="" class="btn btn-success btnEdActions"><i class="fas fa-search"></i></button>
                  </router-link>
                  <button @click="abrirModalEdicao(filmeVisto, 'filme', 'visto')" class="btn btn-primary btnEdActions"><i
                      class="fas fa-edit"></i></button>
                  <button @click="eliminarFilme(filmeVisto._id)" class="btn btn-danger btnEdActions"><i
                      class="fas fa-trash"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else>Sem registos</p>
        </div>

        <div class="col-12 text-left">
          <h4 class="lightblue">Séries a Ver</h4>
          <table v-if="seriesAVer.length" class="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Género(s)</th>
                <th>Avaliação Pessoal</th>
                <th class="d-none d-md-table-cell">Avaliação Geral</th>
                <th>Comentário</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="serieAVer in seriesAVer" :key="serieAVer._id">
                <td>{{ serieAVer.serie.nome || 'Série não encontrado' }}</td>
                <td>{{ serieAVer.serie.genero.join(', ') || 'Não disponível' }}</td>
                <td v-html="generateStars(serieAVer.avaliacao)"></td>
                <td class="d-none d-md-table-cell">{{ serieAVer.serie.avaliacao_api || 'Não disponível' }}</td>
                <td>{{ serieAVer.comentario || 'Sem comentários' }}</td>
                <td>
                  <router-link :to="`/series/${serieVisto.id_serie}`">
                    <button @click="" class="btn btn-success btnEdActions"><i class="fas fa-search"></i></button>
                  </router-link>
                  <button @click="abrirModalEdicao(serieAVer, 'serie', 'a_ver')" class="btn btn-primary btnEdActions"><i
                      class="fas fa-edit"></i></button>
                  <button @click="eliminarSerie(serieAVer._id)" class="btn btn-danger btnEdActions"><i
                      class="fas fa-trash"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else>Sem registos</p>
        </div>
        <div class="col-12 text-left">
          <h4 class="lightblue">Series Vistas</h4>
          <table v-if="seriesVistos.length" class="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Género(s)</th>
                <th>Avaliação Pessoal</th>
                <th class="d-none d-md-table-cell">Avaliação Geral</th>
                <th>Comentário</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="serieVisto in seriesVistos" :key="serieVisto._id">
                <td>{{ serieVisto.serie.nome || 'Série não encontrada' }}</td>
                <td>{{ serieVisto.serie.genero.join(', ') || 'Não disponível' }}</td>
                <td v-html="generateStars(serieVisto.avaliacao)"></td>
                <td class="d-none d-md-table-cell">{{ serieVisto.serie.avaliacao_api || 'Não disponível' }}</td>
                <td>{{ serieVisto.comentario || 'Sem comentários' }}</td>
                <td>
                  <router-link :to="`/series/${serieVisto.id_serie}`">
                    <button @click="" class="btn btn-success btnEdActions"><i class="fas fa-search"></i></button>
                  </router-link>

                  <button @click="abrirModalEdicao(serieVisto, 'serie', 'visto')" class="btn btn-primary btnEdActions"><i
                      class="fas fa-edit"></i></button>
                  <button @click="eliminarSerie(serieVisto._id)" class="btn btn-danger btnEdActions"><i
                      class="fas fa-trash"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else>Sem registos</p>
        </div>
      </div>
    </div>
  </div>

  <div class="modal-background modalComment" v-if="showModal">
    <div class="modal-content">
      <h3>Reavaliar</h3>
      <div class="rating">
        <span v-for="number in 5" :key="number" class="star" @click="setRating(number)" @mouseover="hoverStar(number)"
          @mouseleave="leaveStar" :class="{ 'checked': userRating >= number || (hoverRating >= number && hoverRating) }">
          &#9733;
        </span>
      </div>
      <div class="form-floating">
        <textarea v-model="userComment" class="form-control" placeholder="Deixe um comentário..."
          id="comentarioModal"></textarea>
        <label for="comentarioModal">Comentário</label>
      </div>
      <div class="row">
        <div class="col-12">
          <button class="btn btn-success btnModal" @click="submitEdit">Enviar Avaliação</button>
          <button class="btn btn-danger btnModal" @click="closeModal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: "Profile",
  data() {
    return {
      nome: '',
      apelido: '',
      username: '',
      dataNascimento: '',
      email: '',
      // password: '',
      avatarUser: 0,
      isEditing: false,
      id_utilizador: localStorage.getItem('id_utilizador'),
      filmesAVer: [],
      filmesVistos: [],
      seriesAVer: [],
      seriesVistos: [],
      avataresDisponiveis: [1, 2, 3, 4, 5, 6, 7, 8],
      dadosOriginais: {},
      showModal: false,
      hoverRating: 0,
      userComment: '',
      userRating: 0,
      editData: {
        id: null,
        type: '', // 'filme' ou 'serie'
        action: '', // 'ver' ou 'visto'
        avaliacao: 0,
        comentario: '',
      }
    };
  },
  created() {
    this.fetchUserProfile();
    this.fetchFilmesVistos();
    this.fetchFilmesAVer();
    this.fetchSeriesVistas();
    this.fetchSeriesAVer();
  },
  methods: {
    async fetchUserProfile() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/utilizador/${this.id_utilizador}`);
        this.nome = response.data.nome;
        this.apelido = response.data.apelido;
        this.username = response.data.username;
        this.dataNascimento = response.data.dataNascimento;
        this.email = response.data.email;
        this.avatarUser = response.data.avatarUser;
        this.dadosOriginais = {
          nome: this.nome,
          apelido: this.apelido,
          username: this.username,
          dataNascimento: this.dataNascimento,
          email: this.email,
          avatarUser: this.avatarUser,
        };
      } catch (error) {
        alert("Erro ao descarregar dados do Utilizador.");
      }
    },
    editProfile() {
      this.isEditing = true;
    },
    async updateProfile() {
      try {
        await axios.put(`${process.env.VUE_APP_BACKEND_URL}/utilizador/${this.id_utilizador}`, {
          nome: this.nome,
          apelido: this.apelido,
          username: this.username,
          dataNascimento: this.dataNascimento,
          email: this.email,
          // password: this.password
          avatarUser: this.avatarUser,
        });
        localStorage.setItem('avatarUser', this.avatarUser),
          this.dadosOriginais = {
            nome: this.nome,
            apelido: this.apelido,
            username: this.username,
            dataNascimento: this.dataNascimento,
            email: this.email,
            avatarUser: this.avatarUser,
          };
        alert("Dados do Utilizador atualizados com sucesso.");
        window.location.reload();
      } catch (error) {
        alert("Erro ao atualizar dados do Utilizador.");
      }
      this.isEditing = false;
    },
    cancelUpdateProfile() {
      this.nome = this.dadosOriginais.nome;
      this.apelido = this.dadosOriginais.apelido;
      this.username = this.dadosOriginais.username;
      this.dataNascimento = this.dadosOriginais.dataNascimento;
      this.email = this.dadosOriginais.email;
      this.avatarUser = this.dadosOriginais.avatarUser;
      this.isEditing = false;
    },
    async fetchFilmesVistos() {
      const userId = localStorage.getItem('id_utilizador');
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/utilizador-filme/visto/${userId}`);
        this.filmesVistos = response.data;
      } catch (error) {
        console.error('Erro ao obter lista de filmes vistos:', error);
      }
    },

    async fetchFilmesAVer() {
      const userId = localStorage.getItem('id_utilizador');
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/utilizador-filme/aver/${userId}`);
        this.filmesAVer = response.data;
      } catch (error) {
        console.error('Erro ao obter lista de filmes a ver:', error);
      }
    },
    async fetchSeriesVistas() {
      const userId = localStorage.getItem('id_utilizador');
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/utilizador-serie/visto/${userId}`);
        this.seriesVistos = response.data;
      } catch (error) {
        console.error('Erro ao obter lista de séries vistas:', error);
      }
    },
    async fetchSeriesAVer() {
      const userId = localStorage.getItem('id_utilizador');
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/utilizador-serie/aver/${userId}`);
        this.seriesAVer = response.data;
      } catch (error) {
        console.error('Erro ao obter lista de séries a ver:', error);
      }
    },

    async eliminarFilme(filmeId) {
      try {
        await axios.delete(`${process.env.VUE_APP_BACKEND_URL}/utilizador-filme/eliminar/${filmeId}`);
        this.fetchFilmesAVer();
        this.fetchFilmesVistos();
      } catch (error) {
        console.error('Erro ao eliminar filme:', error);
      }
    },

    async eliminarSerie(serieId) {
      try {
        await axios.delete(`${process.env.VUE_APP_BACKEND_URL}/utilizador-serie/eliminar/${serieId}`);
        this.fetchSeriesAVer();
        this.fetchSeriesVistas();
      } catch (error) {
        console.error('Erro ao eliminar série:', error);
      }
    },

    // Avatar
    selectAvatar(avatar) {
      this.avatarUser = avatar;
    },
    formatDate(date) {
      if (!date) return '';
      const newDate = new Date(date);
      const day = newDate.getDate().toString().padStart(2, '0');
      const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
      const year = newDate.getFullYear();
      return `${day}/${month}/${year}`;
    },
    parseDate(dateString) {
      const parts = dateString.split('/');
      const parsedDate = new Date(parts[0], parts[1] - 1, parts[2]);
      return parsedDate.toISOString().split('T')[0];
    },
    generateStars(avaliacao) {
      let stars = '';
      for (let i = 0; i < 5; i++) {
        stars += i < avaliacao ? '&#9733;' : '&#9734;';
      }
      return stars;
    },

    abrirModalEdicao(item, type, action) {
      this.editData.id_filme = item.id_filme;
      this.editData.id_serie = item.id_serie;
      this.editData.type = type;
      this.editData.action = action;
      this.showModal = true;
      this.userComment = "";
      this.userRating = 0;
    },

    async submitEdit() {
      const userId = localStorage.getItem('id_utilizador');
      const url = this.editData.type === 'filme' ? '/utilizador-filme/update' : '/utilizador-serie/update';

      if (this.userComment == "" || this.userRating == 0) {
        alert("Deve deixar uma avaliação!");
        return;
      }

      const payload = {
        id_utilizador: userId,
        avaliacao: this.userRating,
        comentario: this.userComment,
      };

      if (this.editData.type === 'filme') {
        payload.id_filme = this.editData.id_filme;
      } else {
        payload.id_serie = this.editData.id_serie;
      }
      try {
        await axios.put(`${process.env.VUE_APP_BACKEND_URL}${url}`, payload);

        alert("Avaliação enviada com sucesso.");
        this.showModal = false;
        if (this.editData.action === 'visto') {
          this.fetchFilmesVistos();
          this.fetchSeriesVistas();
        } else {
          this.fetchFilmesAVer();
          this.fetchSeriesAVer();
        }
      } catch (error) {
        console.error("Erro ao enviar avaliação:", error);
        alert("Erro ao enviar avaliação.");
      }
    },

    closeModal() {
      this.showModal = false;
    },

    hoverStar(index) {
      this.hoverRating = index;
    },
    leaveStar() {
      this.hoverRating = 0;
    },
    setRating(rating) {
      this.userRating = rating;
    },

  },
  computed: {
    dataNascimentoInput: {
      get() {
        return this.formatDate(this.dataNascimento);
      },
      set(value) {
        this.dataNascimento = this.parseDate(value);
      }
    }
  },
};

</script>


<style scoped>
h2 {
  color: rgb(170, 1, 1);
  font-weight: 600;
  padding: 0 20px 20px 20px;
}

.page {
  min-height: 100vh;
}

.profile,
h4,
.text-left {
  text-align: left;
}

.editBtnPrf button {
  position: absolute;
  left: 80vw;
  top: 150px;
}

.serie-item {
  text-decoration: none;
  color: inherit;
}

.serie-item:hover {
  text-decoration: none;
}

.img-fluid {
  max-width: 250px;
}

.form-switch .form-check-input {
  width: 3em;
  height: 1.5em;
  margin-right: 10px;
}

.btnActionUpdate {
  width: 200px;
}

.avatar-option:hover {
  cursor: pointer;
}

.anonimoLabel {
  line-height: 30px;
}

.lightblue {
  color: lightblue;
  font-weight: 600;
}

.btnEdActions {
  height: 36px;
  width: 36px;
  font-size: 12px;
  margin: 2px;
  padding: 0;
}

@media screen and (max-width: 991px) {
  .editBtnPrf button {
    top: 100px !important;
  }
}

@media screen and (max-width: 767px) {
  .table.table-striped {
    font-size: 11px;
  }

  .btnEdActions {
    height: 26px;
    width: 26px;
    font-size: 8px;
    margin: 1px;
  }
}</style>
