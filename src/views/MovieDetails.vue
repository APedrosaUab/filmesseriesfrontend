<template>
  <div class="movie-details" v-if="movie">
    <div class="container">
      <div class="row m-auto">
        <h2 class="visibleMobile">{{ movie.title || 'não disponível' }}</h2>
        <div class="col-md-4 col-12">
          <img :src="getImageUrl(movie.poster_path)" alt="Poster do Filme" class="img-fluid mb-3" />
          <div class="d-flex justify-content-around">
            <img :src="btnAddToListSrc" alt="add to list" class="btnAddToList" @click="utilizadorFilmeSet('addToList')"
              @mouseover="hoverAddToList" @mouseleave="leaveAddToList">
            <img :src="btnAddToWatchedSrc" alt="add to watch" class="btnAddWatched"
              @click="utilizadorFilmeSet('addToWatched')" @mouseover="hoverAddToWatched" @mouseleave="leaveAddToWatched">
            <img :src="btnAddCommentSrc" alt="add comment" class="btnAddComment" @click="utilizadorFilmeSet('comment')"
              @mouseover="hoverAddComment" @mouseleave="leaveAddComment">

          </div>
        </div>
        <div class="col-md-8 col-12 detailsContent">
          <h2 class="visibleDesktop">{{ movie.title || 'não disponível' }}</h2>
          <p><strong>Título original:</strong> {{ movie.original_title || 'não disponível' }}</p>
          <p><strong>Língua original:</strong> {{ movie.original_language || 'não disponível' }}</p>
          <p><strong>TagLine:</strong> {{ movie.tagline || 'não disponível' }}</p>
          <p><strong>Plot:</strong> {{ movie.overview || 'não disponível' }}</p>
          <p><strong>Duração:</strong> {{ movie.runtime ? movie.runtime + ' minutos' : 'não disponível' }}</p>
          <p><strong>Estreia:</strong> {{ movie.release_date || 'não disponível' }}</p>
          <p><strong>Classificação:</strong> {{ movie.vote_average || 'não disponível' }}</p>
          <p><strong>Disponível em:</strong> <a v-if="movie.homepage" :href="movie.homepage" target="_blank">{{
            movie.homepage }}</a><span v-else>não disponível</span></p>
        </div>

        <div class="col-12 m-auto">
          <div class="col-12">
            <h3 class="titleComment">Comentários dos utilizadores</h3>
          </div>
          <div v-if="comentarios.length > 0">
            <div v-for="comentario in comentarios" :key="comentario._id" class="comentario row commentSection">
              <div class="col-3">
                <img :src="`/assets/images/avatars/${comentario.avatarUser}.png`" alt="avatar">
                <p><strong>{{ comentario.username }}</strong></p>
              </div>

              <div class="col-9 commentSectionText">
                <p>Avaliação: {{ comentario.avaliacao }} &#9733;</p>
                <p> Opinião: {{ comentario.comentario }}</p>
                <p>Data: {{ new Date(comentario.dataComentario).toLocaleDateString() }}</p>
              </div>

            </div>
          </div>
          <div v-else class="comentario row commentSection">
            <p>Seja o primeiro a deixar o seu comentário e avaliação!</p>
          </div>
        </div>
        <div class="col-12 m-auto">
          <button @click="goBack" class="btn btn-secondary m-auto mb-3">Voltar</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-background modalComment" v-if="showModal">
    <div class="modal-content">
      <h3>Avaliar Filme</h3>
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
          <button class="btn btn-success btnModal" @click="submitRating">Enviar Avaliação</button>
          <button class="btn btn-danger btnModal" @click="closeModal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="!movie" class="text-center">
    <p>A carregar detalhes do filme...</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "MovieDetails",
  data() {
    return {
      movie: null,
      showModal: false,
      hoverRating: 0,
      userComment: '',
      btnAddToListSrc: '/assets/btns/btnAddToList.png',
      btnAddToWatchedSrc: '/assets/btns/btnAddToWatched.png',
      btnAddCommentSrc: '/assets/btns/btnAddComment.png',
      comentarios: [],
    };
  },
  mounted() {
    this.fetchMovieDetails().then(() => {
      this.addFilmeToList();
      this.checkMovieStatus();
      this.fetchComentariosFilmes();
    });
  },
  methods: {
    async fetchMovieDetails() {
      const movieId = this.$route.params.id;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2ViMzE5OWFmN2JiODNkY2NmOWEyZDg3MWM4ZTc1YSIsInN1YiI6IjY1YjRmMGI2MWM2MzViMDE3YjEzMzRmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D5ameSCbyYN4uMkJUtYjPbPBgHC6wN7oBGyM4HpSUYI'
        }
      };
      const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        this.movie = data;
      } catch (err) {
        console.error(err);
      }
    },

    getImageUrl(path) {
      return path ? `https://image.tmdb.org/t/p/w500${path}` : '';
    },

    async addFilmeToList() {
      const filmeData = {
        id_filme: this.movie.id,
        nome: this.movie.title,
        genero: this.movie.genres.map(genre => genre.name),
        avaliacao_api: this.movie.vote_average
      };

      try {
        await axios.post(`${process.env.VUE_APP_BACKEND_URL}/filmes/adicionar`, filmeData);
        console.log('Filme adicionado ou atualizado com sucesso.');
      } catch (err) {
        console.error('Erro ao adicionar ou atualizar o filme:', err);
      }
    },

    async checkMovieStatus() {
      const userId = localStorage.getItem('id_utilizador');
      const movieId = this.movie.id;
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/utilizador-filme/status/${userId}/${movieId}`);
        this.movie.addedToList = response.data.added;
        this.movie.watched = response.data.watched;
        this.movie.comment = response.data.comentario;
        this.updateButtonImages();
      } catch (error) {
        console.error("Erro ao verificar o status do filme:", error);
      }
    },
    async fetchComentariosFilmes() {
      const filmesId = this.$route.params.id;
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/filme/comentarios/${filmesId}`);
        this.comentarios = response.data.comentarios;
      } catch (error) {
        console.error("Erro ao obter comentários do filme:", error);
      }
    },
    async utilizadorFilmeSet(action) {
      const userId = localStorage.getItem('id_utilizador');
      const movieId = this.movie.id;
      let visto = this.movie.watched;
      let a_ver = this.movie.addedToList;

      if (action === 'addToList') {
        a_ver = !a_ver;
      } else if (action === 'addToWatched') {
        visto = !visto;
      }

      if (action === 'comment') {
        if (visto) {
          this.showModal = true;
          return;
        } else {
          alert("Para fazer uma avaliação, deve ter visto o filme!");
          return;
        }
      }

      try {
        await axios.post(`${process.env.VUE_APP_BACKEND_URL}/utilizador-filme/adicionar`, {
          id_utilizador: userId,
          id_filme: movieId,
          visto: visto,
          a_ver: a_ver,
        });

        alert('Status do filme atualizado com sucesso.');
        this.checkMovieStatus();
      } catch (error) {
        console.error("Erro ao atualizar o status do filme:", error);
        alert('Erro ao atualizar o status do filme.');
      }
    },

    async submitRating() {
      const userId = localStorage.getItem('id_utilizador');
      const movieId = this.movie.id;

      if (!this.userRating || this.userRating < 1 || this.userRating > 5) {
        alert("A avaliação deve ser entre 1 e 5 estrelas.");
        return;
      }
      if (!this.userComment.trim()) {
        alert("Por favor, deixe um comentário.");
        return;
      }

      try {
        await axios.put(`${process.env.VUE_APP_BACKEND_URL}/utilizador-filme/update`, {
          id_utilizador: userId,
          id_filme: movieId,
          avaliacao: this.userRating,
          comentario: this.userComment,
        });

        this.showModal = false;
        alert("Avaliação enviada com sucesso.");
        this.checkMovieStatus();
      } catch (error) {
        console.error("Erro ao enviar avaliação:", error);
        alert("Erro ao enviar avaliação.");
      }
    },

    closeModal() {
      this.showModal = false;
    },

    goBack() {
      this.$router.go(-1);
    },

    hoverAddToList() {
      this.btnAddToListSrc = '/assets/btns/btnAddToList_hover.png';
    },
    leaveAddToList() {
      this.updateButtonImages();
    },
    hoverAddToWatched() {
      this.btnAddToWatchedSrc = '/assets/btns/btnAddToWatched_hover.png';
    },
    leaveAddToWatched() {
      this.updateButtonImages();
    },

    hoverAddComment() {
      this.btnAddCommentSrc = '/assets/btns/btnAddComment_hover.png';
    },
    leaveAddComment() {
      this.updateButtonImages();
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
    updateButtonImages() {
      this.btnAddToListSrc = this.movie.addedToList ? '/assets/btns/btnAddToList_checked.png' : '/assets/btns/btnAddToList.png';
      this.btnAddToWatchedSrc = this.movie.watched ? '/assets/btns/btnAddToWatched_checked.png' : '/assets/btns/btnAddToWatched.png';
      this.btnAddCommentSrc = this.movie.comment ? '/assets/btns/btnAddComment_checked.png' : '/assets/btns/btnAddComment.png';
    }
  }
};
</script>

<style>
.titleComment {
  color: lightblue;
  margin: 1em;
}

.commentSection {
  border: 1px solid #fff;
  padding: 1em;
  margin-bottom: 1em;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.75);
  color: #000;
}

.commentSectionText {
  text-align: left;
}

/* Estilos para o modal */
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.5); */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modalComment {
  width: 100%;
  z-index: 9999999;
  margin: auto;
}

.modal-content {
  background-color: rgb(255, 255, 255) !important;
  color: #000 !important;
  padding: 20px;
  border-radius: 10px !important;
  width: 80%;
  max-width: 500px;
}

#comentarioModal {
  width: 100%;
}

.star {
  cursor: pointer;
  color: grey;
  font-size: 30px;
}

.star:hover,
.star.checked {
  color: gold;
}

.checked {
  color: gold;
}

.detailsContent a {
  color: goldenrod!important;
  text-decoration: none;
}

.btnModal {
  width: 180px;
  margin: 10px;
}

.btnAddToList,
.btnAddWatched,
.btnAddComment {
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.visibleMobile {
  color: #aa0101!important;
  font-weight: 600;
}

@media screen and (min-width: 992px) {
  .visibleMobile {
  display: none;
}
.container {
  margin-top: 100px;
}
}

@media screen and (max-width: 991px) {
  .visibleDesktop {
  display: none;
}
.container {
    margin-top: 10px;
  }
}
</style>
