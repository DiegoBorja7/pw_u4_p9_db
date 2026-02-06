/**
 * Decodifica un JWT sin verificar firma (solo para leer claims)
 * @param {string} token - JWT token
 * @returns {object} - Payload decodificado
 */
export const decodeJWT = (token) => {
  try {
    // JWT tiene formato: header.payload.signature
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Token inválido");
    }

    // Decodificar payload (segunda parte)
    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch (error) {
    console.error("Error decodificando JWT:", error);
    return null;
  }
};

/**
 * Extrae roles del JWT
 * @param {string} token - JWT token
 * @returns {array} - Array de roles
 */
export const extractRoles = (token) => {
  try {
    const payload = decodeJWT(token);
    if (!payload) {
      console.warn("No se pudo decodificar el JWT");
      return [];
    }

    console.log("JWT Payload completo:", payload);

    // Los roles pueden venir en diferentes claims según el backend
    // Intentar múltiples variaciones comunes
    const roles =
      payload.roles ||
      payload.role ||
      payload.authorities ||
      payload.authority ||
      payload.groups ||
      payload.realm_access?.roles ||
      [];

    console.log("Roles extraídos del JWT:", roles);
    return roles;
  } catch (error) {
    console.error("Error extrayendo roles:", error);
    return [];
  }
};

/**
 * Verifica si el token tiene un rol específico
 * @param {string} token - JWT token
 * @param {string} requiredRole - Rol requerido
 * @returns {boolean}
 */
export const hasRole = (token, requiredRole) => {
  const roles = extractRoles(token);

  // Normalizar a array
  const rolesArray = Array.isArray(roles) ? roles : [roles];

  // Verificar rol (case insensitive)
  return rolesArray.some(
    (role) => role.toLowerCase() === requiredRole.toLowerCase(),
  );
};
