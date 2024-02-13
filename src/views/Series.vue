<template>
  <div class="series">
    <div class="container py-4">
      <h2 class="visibleMobile">Séries</h2>
      <div class="row">
        <div class="col-12 col-md-4 col-lg-3 mb-4" v-for="serie in series" :key="serie.id">
          <router-link :to="`/series/${serie.id}`" class="serie-item">
            <img :src="getImageUrl(serie.poster_path)" alt="Poster da Série" class="img-fluid" />
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col text-center">
          <button @click="fetchSeries(true)" class="btn btn-primary">Ver Mais</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Series",
  data() {
    return {
      series: [],
      page: 1
    };
  },
  mounted() {
    this.fetchSeries();
  },
  methods: {
    async fetchSeries(loadMore = false) {
      if (loadMore) {
        this.page++;
      }

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkY2ViMzE5OWFmN2JiODNkY2NmOWEyZDg3MWM4ZTc1YSIsInN1YiI6IjY1YjRmMGI2MWM2MzViMDE3YjEzMzRmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D5ameSCbyYN4uMkJUtYjPbPBgHC6wN7oBGyM4HpSUYI'
        }
      };

      const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${this.page}&sort_by=popularity.desc`;

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        // Filtrar séries que possuem imagem
        const seriesWithImages = data.results.filter(serie => serie.poster_path !== null);
        if (loadMore) {
          this.series = [...this.series, ...seriesWithImages];
        } else {
          this.series = seriesWithImages;
        }
      } catch (err) {
        console.error(err);
      }
    },

    getImageUrl(path) {
      return `https://image.tmdb.org/t/p/w500${path}`;
    }
  }
};
</script>


<style scoped>
.page {
  min-height: 100vh;
}

.container {
  min-height: 70vh;
}

.content {
  width: 100%;
  max-width: 800px;
}

h2 {
  color: rgb(170, 1, 1);
  font-weight: 600;
  padding: 0 20px 20px 20px;
}

.img-fluid {
  max-width: 100%;
  border: solid 6px #fff;
  margin: 6px;
  height: 100%;
  object-fit: cover;
}

.serie-item {
  color: #fff;
  text-decoration: none;
  color: inherit;
}

.serie-item:hover {
  text-decoration: none;
}

@media screen and (min-width: 992px) {
  .visibleMobile {
  display: none;
}
}

</style>
