<template>
  <div class="home">
    <div class="container">
      <div class="trending-movies">
        <div class="col-12">
          <h2>Filmes do Momento</h2>
        </div>
        <swiper :slides-per-view="4" :space-between="20" class="mySwiper" @slideChange="hideSwipeNotification">
          <swiper-slide v-for="movie in trendingMovies" :key="movie.id">
            <router-link :to="`/movies/${movie.id}`" class="movie-item">
              <img :src="getImageUrl(movie.poster_path)" alt="Poster do Filme" class="img-fluid" />
            </router-link>
          </swiper-slide>
        </swiper>
      </div>

      <div class="avisoSlide">
        <div class="swiper-notification" v-if="showSwipeNotification">
          <span class="swiper-notification-text">Deslize para ver mais registos. Clique para ver detalhes.</span>
        </div>
      </div>


      <div class="trending-series mt-3">
        <div class="col-12">
          <h2>Séries do Momento</h2>
        </div>
        <swiper :slides-per-view="4" :space-between="20" class="mySwiper" @slideChange="hideSwipeNotification">
          <swiper-slide v-for="serie in trendingSeries" :key="serie.id">
            <router-link :to="`/series/${serie.id}`" class="serie-item">
              <img :src="getImageUrl(serie.poster_path)" alt="Poster da Série" class="img-fluid" />
            </router-link>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>


<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

export default {
  name: "Home",
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      trendingMovies: [],
      trendingSeries: [],
      showSwipeNotification: true
    };
  },
  mounted() {
    this.fetchTrendingMovies();
    this.fetchTrendingSeries();
  },
  methods: {
    async fetchTrendingMovies() {
      await this.fetchTrending('movie', 'trendingMovies');
    },
    async fetchTrendingSeries() {
      await this.fetchTrending('tv', 'trendingSeries');
    },
    async fetchTrending(type, target) {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2ViMzE5OWFmN2JiODNkY2NmOWEyZDg3MWM4ZTc1YSIsInN1YiI6IjY1YjRmMGI2MWM2MzViMDE3YjEzMzRmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D5ameSCbyYN4uMkJUtYjPbPBgHC6wN7oBGyM4HpSUYI'
        }
      };

      const url = `https://api.themoviedb.org/3/trending/${type}/day?language=en-US`;

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        this[target] = data.results;
      } catch (err) {
        console.error(err);
      }
    },
    getImageUrl(path) {
      return path ? `https://image.tmdb.org/t/p/w500${path}` : '';
    },

    hideSwipeNotification() {
    this.showSwipeNotification = false;
  },
}
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.trending-item {
  margin-bottom: 15px;
}

.img-fluid {
  /* max-width: 100px; */
  border: solid 6px #fff;
  margin: 6px;
  height: auto;
}

.serie-item, .movie-item {
  color: #fff;
  text-decoration: none;
  color: inherit;
}

.trending-movies h2, .trending-series h2
{
  padding-left: 6px;
  text-align: left;
}

.swiper-slide
{
  margin-right: 16px !important;
}

.avisoSlide {
  height: 50px;
}

@keyframes swipeAnimation {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

.swiper-notification-text {
  display: inline-block;
  margin-top: 15px;
  animation: swipeAnimation 2s ease-in-out infinite;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px;
  border-radius: 5px;
}

@media screen and (min-width: 992px) {
  .swiper-slide {
  height: 350px;
  width: 200px !important;
}
}

</style>
