import axios from "axios";
import { extractRoles } from "@/utils/jwt";

const AUTH_URL = "/api/v1/auth/token";
const TOKEN_KEY = "accessToken";
const ROLES_KEY = "userRoles";

const login = async (user = "admin", password = "admin123") => {
  try {
    const response = await axios.post(AUTH_URL, {
      user,
      password,
    });
    const { accessToken } = response.data;

    // Guardar token
    localStorage.setItem(TOKEN_KEY, accessToken);

    // Extraer y guardar roles del token (sin bloquear si falla)
    try {
      const roles = extractRoles(accessToken);
      localStorage.setItem(ROLES_KEY, JSON.stringify(roles));
      console.log("Token obtenido y almacenado:", accessToken);
      console.log("Roles del usuario:", roles);
    } catch (roleError) {
      console.warn(
        "No se pudieron extraer roles, continuando sin roles:",
        roleError,
      );
      localStorage.setItem(ROLES_KEY, JSON.stringify([]));
    }

    return accessToken;
  } catch (error) {
    console.error("Error al obtener token:", error);
    // Extraer mensaje del backend
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message;
    const errorStatus = error.response?.status;

    // Crear error enriquecido
    const enrichedError = new Error(errorMessage);
    enrichedError.status = errorStatus;
    enrichedError.originalError = error;

    throw enrichedError;
  }
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const ensureToken = async () => {
  // Usar token existente si hay, solo renovar si es necesario
  let token = getToken();
  if (!token) {
    token = await login();
  }
  return token;
};

const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLES_KEY);
  console.log("Token y roles eliminados. Sesión cerrada.");
};

const getUserRoles = () => {
  try {
    const roles = localStorage.getItem(ROLES_KEY);
    return roles ? JSON.parse(roles) : [];
  } catch (error) {
    console.error("Error obteniendo roles:", error);
    return [];
  }
};

const hasRole = (requiredRole) => {
  try {
    const roles = getUserRoles();

    if (!roles || roles.length === 0) {
      console.warn(`Usuario sin roles. Requerido: ${requiredRole}`);
      return false;
    }

    // Normalizar a array
    const rolesArray = Array.isArray(roles) ? roles : [roles];

    // Filtrar valores nulos/undefined
    const validRoles = rolesArray.filter((r) => r);

    console.log(
      `Verificando rol "${requiredRole}" contra roles del usuario:`,
      validRoles,
    );

    const hasIt = validRoles.some((role) => {
      // Manejar tanto strings como objetos
      const roleStr =
        typeof role === "string" ? role : role?.name || role?.authority || "";
      return roleStr.toLowerCase() === requiredRole.toLowerCase();
    });

    console.log(`¿Tiene rol ${requiredRole}?`, hasIt);
    return hasIt;
  } catch (error) {
    console.error("Error verificando rol:", error);
    return false;
  }
};

export default {
  login,
  getToken,
  ensureToken,
  logout,
  getUserRoles,
  hasRole,
};
