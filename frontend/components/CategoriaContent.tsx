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

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const data = await productoService.getByCategoria(categoria);
        console.log("PRODUCTOS RECIBIDOS:", data);
        setProductos(data);
      } catch (err) {
        console.error("Error fetching productos:", err);
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [categoria]);

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
              />
            </div>
            <Select>
              <SelectTrigger className="w-full lg:w-64 h-14 bg-background border-2 border-border">
                <SelectValue placeholder="Filtrar por marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las marcas</SelectItem>
                <SelectItem value="royal-canin">Royal Canin</SelectItem>
                <SelectItem value="whiskas">Whiskas</SelectItem>
                <SelectItem value="stanley">Stanley</SelectItem>
                <SelectItem value="raid">Raid</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full lg:w-64 h-14 bg-background border-2 border-border">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los tipos</SelectItem>
                <SelectItem value="alta_genetica">alta genetica</SelectItem>
                <SelectItem value="generico">generico</SelectItem>
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
              <div className="min-w-[900px]">
                <table className="w-full">
                  <thead className="bg-muted/30">
                    <tr>
                      <th className="text-left p-6 font-bold text-foreground text-lg">
                        Producto
                      </th>
                      <th className="text-left p-6 font-bold text-foreground text-lg">
                        Categoría
                      </th>
                      <th className="text-left p-6 font-bold text-foreground text-lg">
                        Marca
                      </th>
                      <th className="text-left p-6 font-bold text-foreground text-lg">
                        Precio$
                      </th>
                      <th className="text-left p-6 font-bold text-foreground text-lg">
                        PrecioBs
                      </th>
                      <th className="text-left p-6 font-bold text-foreground text-lg">
                        Tipo
                      </th>
                      <th className="text-left p-6 font-bold text-foreground text-lg">
                        Tasa
                      </th>
                      <th className="text-left p-6 font-bold text-foreground text-lg">
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
                        <td className="p-6">
                          <div className="font-semibold text-foreground text-lg">
                            {producto.nombre}
                          </div>
                        </td>
                        <td className="p-6 text-muted-foreground text-lg">
                          {producto.categoria}
                        </td>
                        <td className="p-6 text-muted-foreground text-lg">
                          {typeof producto.marca === "object"
                            ? producto.marca?.nombre
                            : producto.marca}
                        </td>
                        <td className="p-6">
                          <span className="font-bold text-success text-xl">
                            ${producto.precioDolar?.toLocaleString() || "0"}
                          </span>
                        </td>
                        <td className="p-6">
                          <span className="font-bold text-accent text-xl">
                            {producto.precioBs?.toLocaleString() || "0"}
                          </span>
                        </td>
                        <td className="p-6">
                          {typeof producto.tipo === "object"
                            ? producto.tipo?.nombre
                            : producto.tipo}
                        </td>
                        <td className="p-6 text-muted-foreground text-lg">
                          {typeof producto.tasa === "object"
                            ? producto.tasa?.nombre === "bcv"
                              ? "BCV"
                              : producto.tasa?.nombre === "modificado"
                              ? "Modificada"
                              : producto.tasa?.nombre
                            : producto.tasa}
                        </td>
                        <td className="p-6">
                          <Link href={`/producto/${producto.id}/editar`}>
                            <Button
                              variant="outline"
                              size="lg"
                              className="border-2 border-accent text-accent hover:bg-accent hover:text-white bg-transparent"
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
