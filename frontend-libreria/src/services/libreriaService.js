import axios from "axios";

const api = axios.create({ baseURL: "http://127.0.0.1:7000/api/librerias" });

// Ejecuta una petición y la convierte en un resultado uniforme para la interfaz
async function ejecutar(peticion) {
  try {
    const { data } = await peticion();
    return { tipo: "ok", mensaje: data?.mensaje || "Operación realizada correctamente", payload: data };
  } catch (error) {
    if (!error.response)
      return { tipo: "error", mensaje: "No fue posible conectarse con el Backend", payload: null };
    const { status, data } = error.response;
    if (status === 404) return { tipo: "warn", mensaje: "Librería no encontrada", payload: data };
    const detalle = Array.isArray(data?.detail)
      ? data.detail.map((d) => `${d.loc.slice(1).join(".")}: ${d.msg}`).join(" | ")
      : data?.detail || `Error HTTP ${status}`;
    return { tipo: "error", mensaje: detalle, payload: data };
  }
}

export const consultar = () => ejecutar(() => api.get(""));
export const consultarPorId = (id) => ejecutar(() => api.get(`/${encodeURIComponent(id)}`));
export const ingresar = (libreria) => ejecutar(() => api.post("", libreria));
export const modificar = (id, libreria) => ejecutar(() => api.put(`/${encodeURIComponent(id)}`, libreria));
export const retirar = (id) => ejecutar(() => api.delete(`/${encodeURIComponent(id)}`));