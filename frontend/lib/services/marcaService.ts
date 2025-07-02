import api from "../api";

export interface Marca {
  id?: number;
  nombre: string;
}

export const marcaService = {
  // Obtener todas las marcas
  getAll: async (): Promise<Marca[]> => {
    const response = await api.get("/marcas");
    return response.data;
  },

  // Obtener una marca por ID
  getById: async (id: number): Promise<Marca> => {
    const response = await api.get(`/marcas/${id}`);
    return response.data;
  },

  // Crear una nueva marca
  create: async (marca: Omit<Marca, "id">): Promise<Marca> => {
    const response = await api.post("/marcas", marca);
    return response.data;
  },

  // Actualizar una marca
  update: async (id: number, marca: Partial<Marca>): Promise<Marca> => {
    const response = await api.put(`/marcas/${id}`, marca);
    return response.data;
  },

  // Eliminar una marca
  delete: async (id: number): Promise<void> => {
    await api.delete(`/marcas/${id}`);
  },

  // Obtener marcas por categoría
  getByCategoria: async (categoria: string) => {
    const response = await api.get(`/marcas/por-categoria/${categoria}`);
    return response.data;
  },
};
