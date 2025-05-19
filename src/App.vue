<script>
import { RouterLink, RouterView } from 'vue-router';

export default {
  methods: {
    logout() {
      localStorage.removeItem('userToken'); // Elimina el token
      this.$router.push('/login'); // Redirige al login
    },
  },
  computed: {
    showNavbar() {
      return this.$route.path !== '/login'; // Oculta el Navbar en /login
    },
  },
};
</script>

<template>
  <header v-if="showNavbar">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link">
                <RouterLink to="/home">Inicio</RouterLink>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <RouterLink to="/users">Usuarios</RouterLink>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <RouterLink to="/activities">Actividades</RouterLink>
              </a>
            </li>
          </ul>
          <button @click="logout">Cerrar Sesión</button>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
</style>
