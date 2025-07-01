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

// Datos de ejemplo para el producto
const producto = {
  id: 1,
  nombre: "Alimento Premium Perro Adulto",
  marca: "Royal Canin",
  peso: "15kg",
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
                  htmlFor="categoria"
                  className="text-lg font-semibold text-foreground"
                >
                  Categoría *
                </Label>
                <Select defaultValue={producto.categoria}>
                  <SelectTrigger className="h-14 bg-background border-2 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alimentos">Alimentos</SelectItem>
                    <SelectItem value="ferreteria">Ferretería</SelectItem>
                    <SelectItem value="venenos">Venenos</SelectItem>
                    <SelectItem value="pesca">Pesca</SelectItem>
                    <SelectItem value="mimbre">Mimbre</SelectItem>
                    <SelectItem value="otros">Otros</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="marca"
                  className="text-lg font-semibold text-foreground"
                >
                  Marca *
                </Label>
                <Input
                  id="marca"
                  defaultValue={producto.marca}
                  className="h-14 text-lg bg-background border-2 border-border focus:border-accent"
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="tipo"
                  className="text-lg font-semibold text-foreground"
                >
                  Tipo *
                </Label>
                <Select defaultValue={producto.tipo}>
                  <SelectTrigger className="h-14 bg-background border-2 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alta_genetica">Alta Genética</SelectItem>
                    <SelectItem value="generico">Genérico</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="peso"
                  className="text-lg font-semibold text-foreground"
                >
                  Peso
                </Label>
                <Input
                  id="peso"
                  defaultValue={producto.peso}
                  className="h-14 text-lg bg-background border-2 border-border focus:border-accent"
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="precio"
                  className="text-lg font-semibold text-foreground"
                >
                  Precio *
                </Label>
                <Input
                  id="precio"
                  type="number"
                  defaultValue={producto.precio}
                  className="h-14 text-lg bg-background border-2 border-border focus:border-accent"
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="stock"
                  className="text-lg font-semibold text-foreground"
                >
                  Stock Actual *
                </Label>
                <Input
                  id="stock"
                  type="number"
                  defaultValue={producto.stock}
                  className="h-14 text-lg bg-background border-2 border-border focus:border-accent"
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="stock-minimo"
                  className="text-lg font-semibold text-foreground"
                >
                  Stock Mínimo
                </Label>
                <Input
                  id="stock-minimo"
                  type="number"
                  defaultValue={producto.stockMinimo}
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
