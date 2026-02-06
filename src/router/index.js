import { createRouter, createWebHistory } from "vue-router";
import AuthClient from "../clients/Auth";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import EstudiantesView from "../views/EstudiantesView.vue";
import ConsultarID from "../components/ConsultarID.vue";
import CrearEstudiante from "../components/CrearEstudiante.vue";
import ActualizarEstudiante from "../components/ActualizarEstudiante.vue";
import ActualizarParcial from "../components/ActualizarParcial.vue";
import EliminarEstudiante from "../components/EliminarEstudiante.vue";

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
    meta: { requiresAuth: true, requiresRole: "ADMIN" },
    children: [
      {
        path: "consultar-por-id",
        name: "consultar-por-id",
        component: ConsultarID,
      },
      {
        path: "crear",
        name: "crear-estudiante",
        component: CrearEstudiante,
      },
      {
        path: "actualizar",
        name: "actualizar-estudiante",
        component: ActualizarEstudiante,
      },
      {
        path: "actualizar-parcial",
        name: "actualizar-parcial",
        component: ActualizarParcial,
      },
      {
        path: "eliminar",
        name: "eliminar-estudiante",
        component: EliminarEstudiante,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//configurar guardia global para verificar autenticación y roles
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresRole = to.matched.find((record) => record.meta.requiresRole)
    ?.meta.requiresRole;
  const token = localStorage.getItem("accessToken");

  // Verificar si necesita autenticación
  if (requiresAuth && !token) {
    console.log("No autenticado. Redirigiendo a login");
    return next({ name: "login" });
  }

  // Verificar si necesita un rol específico
  if (requiresRole && token) {
    const hasRequiredRole = AuthClient.hasRole(requiresRole);

    if (!hasRequiredRole) {
      console.log(`Acceso denegado. Se requiere rol: ${requiresRole}`);
      // Redirigir al home con mensaje de error
      return next({
        name: "home",
        query: {
          error: "access_denied",
          message: `Se requiere rol de ${requiresRole.toLowerCase()}`,
        },
      });
    }
  }

  // Permitir navegación
  next();
});

export default router;
