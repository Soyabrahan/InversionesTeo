"use client";

import Link from "next/link";
import { ArrowLeft, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { productoService, Producto } from "@/lib/services";
import { marcaService } from "@/lib/services/marcaService";
import { tipoService } from "@/lib/services/tipoService";

interface CategoriaContentProps {
  categoria: string;
  nombreCategoria: string;
}

export default function CategoriaContent({
  categoria,
  nombreCategoria,
}: CategoriaContentProps) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [marcas, setMarcas] = useState<any[]>([]);
  const [tipos, setTipos] = useState<any[]>([]);
  const [marca, setMarca] = useState<string>("todas");
  const [tipo, setTipo] = useState<string>("todos");
  const [nombre, setNombre] = useState<string>("");

  useEffect(() => {
    const fetchMarcasYTipos = async () => {
      setLoading(true);
      try {
        const [marcasData, tiposData] = await Promise.all([
          marcaService.getByCategoria(categoria),
          tipoService.getByCategoria(categoria),
        ]);
        setMarcas(marcasData);
        setTipos(tiposData);
        setMarca("todas");
        setTipo("todos");
      } catch (err) {
        setError("Error al cargar marcas o tipos");
      } finally {
        setLoading(false);
      }
    };
    fetchMarcasYTipos();
  }, [categoria]);

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      setError(null);
      try {
        const filtros: any = { categoria };
        if (marca !== "todas") filtros.marca = marca;
        if (tipo !== "todos") filtros.tipo = tipo;
        if (nombre.trim() !== "") filtros.nombre = nombre;
        const data = await productoService.getByFiltros(filtros);
        setProductos(data);
      } catch (err) {
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, [categoria, marca, tipo, nombre]);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 mb-6">
            <Link href="/">
              <Button
                variant="ghost"
                size="lg"
                className="text-foreground hover:text-accent"
              >
                <ArrowLeft className="w-5 h-5 mr-3" />
                Volver al Inicio
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-foreground">
              {nombreCategoria}
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6" />
              <Input
                placeholder="Buscar productos..."
                className="pl-14 h-14 text-lg bg-background border-2 border-border focus:border-accent"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <Select value={marca} onValueChange={setMarca}>
              <SelectTrigger className="w-full lg:w-64 h-14 bg-background border-2 border-border">
                <SelectValue placeholder="Filtrar por marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las marcas</SelectItem>
                {marcas.map((m) => (
                  <SelectItem key={m.id} value={String(m.id)}>
                    {m.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={tipo} onValueChange={setTipo}>
              <SelectTrigger className="w-full lg:w-64 h-14 bg-background border-2 border-border">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los tipos</SelectItem>
                {tipos.map((t) => (
                  <SelectItem key={t.id} value={String(t.id)}>
                    {t.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Link href="/producto/nuevo">
              <Button className="h-14 px-8 bg-success hover:bg-success/90 text-white font-semibold">
                <Plus className="w-5 h-5 mr-3" />
                Nuevo Producto
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        {loading && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-2xl">
              Cargando productos...
            </p>
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-destructive text-2xl mb-8">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg"
            >
              Reintentar
            </Button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="bg-card rounded-2xl border-2 border-border overflow-x-auto shadow-xl">
              <div className="min-w-[400px]">
                <table className="w-full text-xs md:text-base">
                  <thead className="bg-muted/30">
                    <tr>
                      <th className="text-left p-1 md:p-3 font-bold text-foreground text-xs md:text-base">
                        Producto
                      </th>
                      <th className="text-left p-1 md:p-3 font-bold text-foreground text-xs md:text-base">
                        Precio$
                      </th>
                      <th className="text-left p-1 md:p-3 font-bold text-foreground text-xs md:text-base">
                        PrecioBs
                      </th>
                      <th className="text-left p-1 md:p-3 font-bold text-foreground text-xs md:text-base">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((producto) => (
                      <tr
                        key={producto.id}
                        className="border-t-2 border-border hover:bg-muted/20 transition-colors"
                      >
                        <td className="p-1 md:p-3 font-semibold text-foreground text-xs md:text-base">
                          {producto.nombre}
                        </td>
                        <td className="p-1 md:p-3 font-bold text-success text-xs md:text-lg">
                          ${producto.precioDolar?.toLocaleString() || "0"}
                        </td>
                        <td className="p-1 md:p-3 font-bold text-accent text-xs md:text-lg">
                          {producto.precioBs?.toLocaleString() || "0"}
                        </td>
                        <td className="p-1 md:p-3">
                          <Link href={`/producto/editar?id=${producto.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-2 border-accent text-accent hover:bg-accent hover:text-white bg-transparent text-xs md:text-base px-2 md:px-4 py-1 md:py-2"
                            >
                              Editar
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {productos.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-2xl mb-8">
                  No hay productos en esta categoría
                </p>
                <Link href="/producto/nuevo">
                  <Button className="bg-success hover:bg-success/90 text-white px-8 py-4 text-lg">
                    <Plus className="w-6 h-6 mr-3" />
                    Agregar primer producto
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
