<template>
  <div v-if="ready">
    <nav v-if="$route.path !== '/login'">
      <router-link to="/">Home</router-link> |
      <router-link to="/estudiantes">Estudiantes</router-link>
    </nav>
    <router-view />
  </div>
  <div v-else>
    <p>Cargando...</p>
  </div>
</template>

<script>
import AuthClient from '@/clients/Auth';

export default {
  name: 'App',
  data() {
    return {
      ready: false
    }
  },
  async created() {
    try {
      await AuthClient.ensureToken();
      this.ready = true;
    } catch (error) {
      console.error('Error al obtener token:', error);
      this.ready = true;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
