<template>
  <nav>
    <router-link to="/consultar-por-id">Consultar por ID</router-link> |
    <router-link to="/crear">Crear</router-link> |
    <router-link to="/actualizar">Actualizar</router-link> |
    <router-link to="/actualizar-parcial">Actualizar parcial</router-link> |
    <router-link to="/eliminar">Eliminar</router-link>
  </nav>
  <div class="estudiantes">
    <AboutComponent @consultar-todos="consultarTodos" :estudiantes="estudiantes" />
  </div>
</template>
<script>
import AboutComponent from '@/components/AboutComponent.vue';
import MatriculaClient from '@/clients/Matricula';

export default {
  name: "AboutView",
  components: {
    AboutComponent
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
