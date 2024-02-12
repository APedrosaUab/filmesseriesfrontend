import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/views/LandingPage.vue';
import Register from '@/views/Register.vue';
import ForgotPassword from '@/views/ForgotPassword.vue';
import RecoverPassword from '@/views/RecoverPassword.vue';
import Home from '@/views/Home.vue';
import Profile from '@/views/Profile.vue';
import Movies from '@/views/Movies.vue';
import Series from '@/views/Series.vue';
import Search from '@/views/Search.vue';
import MovieDetails from '@/views/MovieDetails.vue';
import SeriesDetails from '@/views/SeriesDetails.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'LandingPage', component: LandingPage },
    { path: '/register', name: 'Register', component: Register },
    { path: '/forgot', name: 'ForgotPassword', component: ForgotPassword },
    { path: '/recover/redefinir-password/:token', name: 'RecoverPassword', component: RecoverPassword },
    { path: '/home', name: 'Home', component: Home, meta: { requiresAuth: true } },
    { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
    { path: '/movies', name: 'Movies', component: Movies, meta: { requiresAuth: true } },
    { path: '/series', name: 'Series', component: Series, meta: { requiresAuth: true } },
    { path: '/search', name: 'Search', component: Search, meta: { requiresAuth: true } },
    { path: '/movies/:id', name: 'MovieDetails', component: MovieDetails, meta: { requiresAuth: true } },
    { path: '/series/:id', name: 'SeriesDetails', component: SeriesDetails, meta: { requiresAuth: true } },
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'LandingPage' });
  } else {
    next();
  }
});

export default router;
