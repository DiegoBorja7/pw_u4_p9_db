<template>
  <nav class="estudiantes-nav">
    <router-link to="/estudiantes/consultar-por-id" class="nav-link">Consultar por ID</router-link>
    <router-link to="/estudiantes/crear" class="nav-link">Crear</router-link>
    <router-link to="/estudiantes/actualizar" class="nav-link">Actualizar</router-link>
    <router-link to="/estudiantes/actualizar-parcial" class="nav-link">Actualizar parcial</router-link>
    <router-link to="/estudiantes/eliminar" class="nav-link">Eliminar</router-link>
  </nav>
  <div class="estudiantes">
    <TodosEstudiantes v-if="$route.path === '/estudiantes'" @consultar-todos="consultarTodos"
      :estudiantes="estudiantes" />
    <router-view />
  </div>
</template>
<script>
import TodosEstudiantes from '@/components/TodosEstudiantes.vue';
import MatriculaClient from '@/clients/Matricula';

export default {
  name: "EstudiantesView",
  components: {
    TodosEstudiantes
  },
  data() {
    return {
      estudiantes: [],
    };
  },
  methods: {
    consultarTodos() {
      MatriculaClient.consultarTodos()
        .then(data => {
          this.estudiantes = data;
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }
  },
};
</script>

<style scoped>
.estudiantes-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1.5rem 2rem;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #4b5563;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}

.nav-link:hover {
  color: #2c3e50;
  border-bottom-color: #42b983;
}

.nav-link.router-link-exact-active {
  color: #42b983;
  border-bottom-color: #42b983;
}
</style>
