import axios from "axios";
import AuthClient from "./Auth";

const API_URL = "/api/v1/matricula/";
const estudiantes = "estudiantes";
const API_URL_estudiantes = API_URL + estudiantes;

const consultarTodos = async () => {
  try {
    const token = AuthClient.getToken();
    const response = await axios.get(API_URL_estudiantes, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al consultar estudiantes:", error);
    throw error;
  }
};

const consultarPorId = async (id) => {
  try {
    if (!id) throw new Error("ID es requerido");
    const token = AuthClient.getToken();
    const response = await axios.get(`${API_URL_estudiantes}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al consultar estudiante ${id}:`, error);
    throw error;
  }
};

const crear = async (data) => {
  try {
    if (!data) throw new Error("Datos son requeridos");
    const token = AuthClient.getToken();
    const response = await axios.post(API_URL_estudiantes, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear estudiante:", error);
    throw error;
  }
};

const actualizar = async (id, data) => {
  try {
    if (!id) throw new Error("ID es requerido");
    if (!data) throw new Error("Datos son requeridos");
    const token = AuthClient.getToken();
    const response = await axios.put(`${API_URL_estudiantes}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar estudiante ${id}:`, error);
    throw error;
  }
};

const actualizarParcial = async (id, data) => {
  try {
    if (!id) throw new Error("ID es requerido");
    if (!data) throw new Error("Datos son requeridos");
    const token = AuthClient.getToken();
    const response = await axios.patch(`${API_URL_estudiantes}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar estudiante ${id}:`, error);
    throw error;
  }
};

const eliminar = async (id) => {
  try {
    if (!id) throw new Error("ID es requerido");
    const token = AuthClient.getToken();
    const response = await axios.delete(`${API_URL_estudiantes}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar estudiante ${id}:`, error);
    throw error;
  }
};

export default {
  consultarTodos,
  consultarPorId,
  crear,
  actualizar,
  actualizarParcial,
  eliminar,
};
