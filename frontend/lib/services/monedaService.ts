import api from "../api";

export interface Moneda {
  id?: number;
  nombre: string;
  tasa: number;
}

export const monedaService = {
  // Obtener todas las monedas
  getAll: async (): Promise<Moneda[]> => {
    const response = await api.get("/monedas");
    return response.data;
  },

  // Obtener una moneda por ID
  getById: async (id: number): Promise<Moneda> => {
    const response = await api.get(`/monedas/${id}`);
    return response.data;
  },

  // Crear una nueva moneda
  create: async (moneda: Omit<Moneda, "id">): Promise<Moneda> => {
    const response = await api.post("/monedas", moneda);
    return response.data;
  },

  // Actualizar una moneda
  update: async (id: number, moneda: Partial<Moneda>): Promise<Moneda> => {
    const response = await api.put(`/monedas/${id}`, moneda);
    return response.data;
  },

  // Eliminar una moneda
  delete: async (id: number): Promise<void> => {
    await api.delete(`/monedas/${id}`);
  },

  // Obtener la tasa BCV
  getBCV: async (): Promise<Moneda | null> => {
    try {
      const monedas = await api.get("/monedas");
      return (
        monedas.data.find((moneda: Moneda) => moneda.nombre === "bcv") || null
      );
    } catch (error) {
      console.error("Error obteniendo BCV:", error);
      return null;
    }
  },
};
