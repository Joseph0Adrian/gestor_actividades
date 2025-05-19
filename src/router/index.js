import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import UserManagement from '../views/UserManagement.vue';
import HomeView from '../views/HomeView.vue';
import Actividades from '../views/Actividades.vue';

// Función para comprobar si el usuario está autenticado
const isAuthenticated = () => !!localStorage.getItem('userToken'); // Cambia esto según tu autenticación real

const routes = [
  { path: '/login', component: Login },
  { path: '/', redirect: () => (isAuthenticated() ? '/home' : '/login') },
  {
    path: '/users',
    component: UserManagement,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/activities',
    component: Actividades,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/home',
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protección de rutas evitando bucles
router.beforeEach((to, from, next) => {
  const authRequired = to.meta.requiresAuth;
  const loggedIn = isAuthenticated();

  if (authRequired && !loggedIn) {
    if (to.path !== '/login') {
      next('/login'); // Si no está autenticado y quiere ir a una ruta protegida, redirige a login
    } else {
      next(); // Si ya está en login, no hacer nada
    }
  } else if (to.path === '/login' && loggedIn) {
    next('/home'); // Si el usuario ya está autenticado y trata de ir a login, lo redirige a /users
  } else {
    next(); // Permite la navegación normalmente
  }
});

export default router;
