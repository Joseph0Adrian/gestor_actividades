<template>
  <div>
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Usuario:</label>
        <input id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input id="password" type="password" v-model="password" required />
      </div>
      <button type="submit">Ingresar</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
    };
  },
  methods: {
    login() {
      if (this.username === 'admin' && this.password === '1234') {
        localStorage.setItem('userToken', 'fake-jwt-token'); // Simula un token
        this.$router.push('/home'); // Redirige a la página de usuarios
      } else {
        this.error = 'Usuario o contraseña incorrectos';
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}
input {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
