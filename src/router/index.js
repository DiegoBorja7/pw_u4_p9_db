import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EstudiantesView from "../views/EstudiantesView.vue";
import ConsultarIDComponent from "../components/ConsultarIDComponent.vue";
import CrearEstudianteComponent from "../components/CrearEstudianteComponent.vue";
import ActualizarEstudianteComponent from "../components/ActualizarEstudianteComponent.vue";
import ActualizarParcialComponent from "../components/ActualizarParcialComponent.vue";
import EliminarEstudianteComponent from "../components/EliminarEstudianteComponent.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/estudiantes",
    name: "estudiantes",
    component: EstudiantesView,
    children: [
      {
        path: "consultar-por-id",
        name: "consultar-por-id",
        component: ConsultarIDComponent,
      },
      {
        path: "crear",
        name: "crear-estudiante",
        component: CrearEstudianteComponent,
      },
      {
        path: "actualizar",
        name: "actualizar-estudiante",
        component: ActualizarEstudianteComponent,
      },
      {
        path: "actualizar-parcial",
        name: "actualizar-parcial",
        component: ActualizarParcialComponent,
      },
      {
        path: "eliminar",
        name: "eliminar-estudiante",
        component: EliminarEstudianteComponent,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
