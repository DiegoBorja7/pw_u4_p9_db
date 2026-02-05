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
    meta: { requiresAuth: false },
  },
  {
    path: "/estudiantes",
    name: "estudiantes",
    component: EstudiantesView,
    meta: { requiresAuth: true },
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

//configurar guardia global para verificar autenticación
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  //const token = localStorage.getItem("accessToken");

  if (requiresAuth /*&& !token*/) {
    // Si necesita autorizacion, va al login
    console.log("Navegación a login");
    //next({ name: "home" });
  } else {
    // De lo contrario, permitir navegación. Le deja sin validacion
    next();
  }
});

export default router;
