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

// Datos de ejemplo
const productosEjemplo = [
  {
    id: 1,
    nombre: "Alimento Premium Perro Adulto",
    marca: "Royal Canin",
    peso: "15kg",
    precio: 45000,
    stock: 12,
    tipo: "alta_genetica",
    categoria: "alimentos",
  },
  {
    id: 2,
    nombre: "Alimento Genérico Gato",
    marca: "Whiskas",
    peso: "3kg",
    precio: 8500,
    stock: 25,
    tipo: "generico",
    categoria: "alimentos",
  },
  {
    id: 3,
    nombre: "Martillo Carpintero",
    marca: "Stanley",
    peso: "0.5kg",
    precio: 15000,
    stock: 8,
    tipo: "generico",
    categoria: "ferreteria",
  },
  {
    id: 4,
    nombre: "Insecticida Hogar",
    marca: "Raid",
    peso: "400ml",
    precio: 3500,
    stock: 3,
    tipo: "generico",
    categoria: "venenos",
  },
];

const categoriasNombres = {
  alimentos: "Alimentos",
  ferreteria: "Ferretería",
  venenos: "Venenos",
  pesca: "Pesca",
  mimbre: "Mimbre",
  otros: "Otros",
};

export async function generateStaticParams() {
  return [
    { slug: "alimentos" },
    { slug: "ferreteria" },
    { slug: "venenos" },
    { slug: "pesca" },
    { slug: "mimbre" },
    { slug: "otros" },
  ];
}

export default function CategoriaPage({
  params,
}: {
  params: { slug: string };
}) {
  const categoria = params.slug;
  const nombreCategoria =
    categoriasNombres[categoria as keyof typeof categoriasNombres] ||
    "Categoría";

  // Filtrar productos por categoría
  const productos = productosEjemplo.filter((p) => p.categoria === categoria);

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
                <SelectItem value="alta_genetica">Alta Genética</SelectItem>
                <SelectItem value="generico">Genérico</SelectItem>
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
        <div className="bg-card rounded-2xl border-2 border-border overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30">
                <tr>
                  <th className="text-left p-6 font-bold text-foreground text-lg">
                    Producto
                  </th>
                  <th className="text-left p-6 font-bold text-foreground text-lg">
                    Marca
                  </th>
                  <th className="text-left p-6 font-bold text-foreground text-lg">
                    Peso
                  </th>
                  <th className="text-left p-6 font-bold text-foreground text-lg">
                    Precio
                  </th>
                  <th className="text-left p-6 font-bold text-foreground text-lg">
                    Stock
                  </th>
                  <th className="text-left p-6 font-bold text-foreground text-lg">
                    Tipo
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
                      {producto.marca}
                    </td>
                    <td className="p-6 text-muted-foreground text-lg">
                      {producto.peso}
                    </td>
                    <td className="p-6">
                      <span className="font-bold text-success text-xl">
                        ${producto.precio.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-6">
                      <Badge
                        variant={
                          producto.stock > 10 ? "default" : "destructive"
                        }
                        className={`text-base px-4 py-2 ${
                          producto.stock > 10
                            ? "bg-success text-white"
                            : "bg-destructive text-white"
                        }`}
                      >
                        {producto.stock} unidades
                      </Badge>
                    </td>
                    <td className="p-6">
                      <Badge
                        variant={
                          producto.tipo === "alta_genetica"
                            ? "default"
                            : "secondary"
                        }
                        className={`text-base px-4 py-2 ${
                          producto.tipo === "alta_genetica"
                            ? "bg-accent text-white"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        {producto.tipo === "alta_genetica"
                          ? "Alta Genética"
                          : "Genérico"}
                      </Badge>
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
      </main>
    </div>
  );
}
