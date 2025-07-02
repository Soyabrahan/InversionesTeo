import api from "../api";

export interface Tipo {
  id?: number;
  nombre: string;
}

export const tipoService = {
  // Obtener todos los tipos
  getAll: async (): Promise<Tipo[]> => {
    const response = await api.get("/tipos");
    return response.data;
  },

  // Obtener un tipo por ID
  getById: async (id: number): Promise<Tipo> => {
    const response = await api.get(`/tipos/${id}`);
    return response.data;
  },

  // Crear un nuevo tipo
  create: async (tipo: Omit<Tipo, "id">): Promise<Tipo> => {
    const response = await api.post("/tipos", tipo);
    return response.data;
  },

  // Actualizar un tipo
  update: async (id: number, tipo: Partial<Tipo>): Promise<Tipo> => {
    const response = await api.put(`/tipos/${id}`, tipo);
    return response.data;
  },

  // Eliminar un tipo
  delete: async (id: number): Promise<void> => {
    await api.delete(`/tipos/${id}`);
  },

  // Obtener tipos por categoría
  getByCategoria: async (categoria: string) => {
    const response = await api.get(`/tipos/por-categoria/${categoria}`);
    return response.data;
  },
};
