"use client";
import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import {
  marcaService,
  tipoService,
  monedaService,
  Marca,
  Tipo,
  Moneda,
} from "@/lib/services";

// Datos de ejemplo para el producto
const producto = {
  id: 1,
  nombre: "Alimento Premium Perro Adulto",
  marca: "Royal Canin",
  precio: 45000,
  stock: 12,
  stockMinimo: 5,
  tipo: "alta_genetica",
  categoria: "alimentos",
  descripcion:
    "Alimento balanceado premium para perros adultos de todas las razas",
};

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
}

export default function EditarProductoPage({
  params,
}: {
  params: { id: string };
}) {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [tasas, setTasas] = useState<Moneda[]>([]);
  const [producto, setProducto] = useState<any>(null);

  useEffect(() => {
    marcaService.getAll().then(setMarcas);
    tipoService.getAll().then(setTipos);
    monedaService.getAll().then(setTasas);
    // Aquí deberías obtener el producto por ID del backend
    // productoService.getById(params.id).then(setProducto);
  }, [params.id]);

  if (!producto) return <div className="p-8">Cargando producto...</div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b-2 border-border p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-6">
            <Link href="/">
              <Button
                variant="ghost"
                size="lg"
                className="text-foreground hover:text-accent"
              >
                <ArrowLeft className="w-5 h-5 mr-3" />
                Volver
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-foreground">
              Editar Producto
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-8">
        <div className="bg-card rounded-2xl border-2 border-border p-10 shadow-xl">
          <form className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label
                  htmlFor="nombre"
                  className="text-lg font-semibold text-foreground"
                >
                  Nombre del Producto *
                </Label>
                <Input
                  id="nombre"
                  defaultValue={producto.nombre}
                  className="h-14 text-lg bg-background border-2 border-border focus:border-accent"
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="marca"
                  className="text-lg font-semibold text-foreground"
                >
                  Marca
                </Label>
                <Select defaultValue={String(producto.marca?.id)}>
                  <SelectTrigger className="h-14 bg-background border-2 border-border">
                    <SelectValue placeholder="Seleccionar marca" />
                  </SelectTrigger>
                  <SelectContent>
                    {marcas.map((marca) => (
                      <SelectItem key={marca.id} value={String(marca.id)}>
                        {marca.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="tipo"
                  className="text-lg font-semibold text-foreground"
                >
                  Tipo
                </Label>
                <Select defaultValue={String(producto.tipo?.id)}>
                  <SelectTrigger className="h-14 bg-background border-2 border-border">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tipos.map((tipo) => (
                      <SelectItem key={tipo.id} value={String(tipo.id)}>
                        {tipo.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="tasa"
                  className="text-lg font-semibold text-foreground"
                >
                  Tasa
                </Label>
                <Select defaultValue={String(producto.tasa?.id)}>
                  <SelectTrigger className="h-14 bg-background border-2 border-border">
                    <SelectValue placeholder="Seleccionar tasa" />
                  </SelectTrigger>
                  <SelectContent>
                    {tasas.map((tasa) => (
                      <SelectItem key={tasa.id} value={String(tasa.id)}>
                        {tasa.nombre} ({tasa.tasa})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="precio"
                  className="text-lg font-semibold text-foreground"
                >
                  Precio ($)
                </Label>
                <Input
                  id="precio"
                  type="number"
                  defaultValue={producto.precio}
                  className="h-14 text-lg bg-background border-2 border-border focus:border-accent"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="descripcion"
                className="text-lg font-semibold text-foreground"
              >
                Descripción (Opcional)
              </Label>
              <Textarea
                id="descripcion"
                defaultValue={producto.descripcion}
                className="min-h-32 text-lg bg-background border-2 border-border focus:border-accent resize-none"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6 pt-8">
              <Button
                type="submit"
                className="h-16 px-10 flex-1 bg-success hover:bg-success/90 text-white text-lg font-semibold"
              >
                <Save className="w-6 h-6 mr-3" />
                Guardar Cambios
              </Button>
              <Button
                variant="outline"
                className="h-16 px-10 bg-transparent border-2 border-destructive text-destructive hover:bg-destructive hover:text-white text-lg"
              >
                <Trash2 className="w-6 h-6 mr-3" />
                Eliminar Producto
              </Button>
              <Link href="/" className="flex-1">
                <Button
                  variant="ghost"
                  className="h-16 w-full text-foreground hover:bg-muted text-lg"
                >
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
