<template>
  <nav>
    <router-link to="/estudiantes/consultar-por-id">Consultar por ID</router-link> |
    <router-link to="/estudiantes/crear">Crear</router-link> |
    <router-link to="/estudiantes/actualizar">Actualizar</router-link> |
    <router-link to="/estudiantes/actualizar-parcial">Actualizar parcial</router-link> |
    <router-link to="/estudiantes/eliminar">Eliminar</router-link>
  </nav>
  <div class="estudiantes">
    <TodosEstudiantesComponent v-if="$route.path === '/estudiantes'" @consultar-todos="consultarTodos"
      :estudiantes="estudiantes" />
    <router-view />
  </div>
</template>
<script>
import TodosEstudiantesComponent from '@/components/TodosEstudiantesComponent.vue';
import MatriculaClient from '@/clients/Matricula';

export default {
  name: "AboutView",
  components: {
    TodosEstudiantesComponent
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
