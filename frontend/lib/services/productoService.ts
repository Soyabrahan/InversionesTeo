import api from "../api";

export interface Producto {
  id?: number;
  nombre?: string;
  descripcion?: string;
  categoria?: string;
  precioDolar?: number;
  precioBs?: number;
  marca?: { id: number; nombre: string } | number | string | null;
  tipo?: { id: number; nombre: string } | number | string | null;
  tasa?: { id: number; nombre: string; tasa: number } | number | string | null;
}

export const productoService = {
  // Obtener todos los productos
  getAll: async (): Promise<Producto[]> => {
    const response = await api.get("/productos");
    return response.data.map((p: any) => ({
      ...p,
      precioDolar: Number(p.precioDolar),
      precioBs: Number(p.precioBs),
    }));
  },

  // Obtener un producto por ID
  getById: async (id: number): Promise<Producto> => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  // Crear un nuevo producto
  create: async (producto: Omit<Producto, "id">): Promise<Producto> => {
    const response = await api.post("/productos", producto);
    return response.data;
  },

  // Actualizar un producto
  update: async (
    id: number,
    producto: Partial<Producto>
  ): Promise<Producto> => {
    const response = await api.put(`/productos/${id}`, producto);
    return response.data;
  },

  // Eliminar un producto
  delete: async (id: number): Promise<void> => {
    await api.delete(`/productos/${id}`);
  },

  // Obtener productos por categoría
  getByCategoria: async (categoria: string): Promise<Producto[]> => {
    const response = await api.get(`/productos?categoria=${categoria}`);
    return response.data.map((p: any) => ({
      ...p,
      precioDolar: Number(p.precioDolar),
      precioBs: Number(p.precioBs),
    }));
  },

  // Obtener productos por filtros
  getByFiltros: async (filtros: {
    categoria?: string;
    marca?: string;
    tipo?: string;
    nombre?: string;
  }) => {
    const params = new URLSearchParams();
    if (filtros.categoria) params.append("categoria", filtros.categoria);
    if (filtros.marca) params.append("marca", filtros.marca);
    if (filtros.tipo) params.append("tipo", filtros.tipo);
    if (filtros.nombre) params.append("nombre", filtros.nombre);
    const response = await api.get(`/productos?${params.toString()}`);
    return response.data.map((p: any) => ({
      ...p,
      precioDolar: Number(p.precioDolar),
      precioBs: Number(p.precioBs),
    }));
  },
};
