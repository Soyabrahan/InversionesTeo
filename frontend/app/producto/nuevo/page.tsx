"use client";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
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
import { CATEGORIAS } from "@/lib/categorias";
import { useRouter } from "next/navigation";
import { productoService } from "@/lib/services/productoService";

export default function NuevoProductoPage() {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [tasas, setTasas] = useState<Moneda[]>([]);
  const [categoria, setCategoria] = useState("");
  const router = useRouter();
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    marcaService.getAll().then(setMarcas);
    tipoService.getAll().then(setTipos);
    monedaService.getAll().then(setTasas);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje(null);
    setError(null);
    const form = e.target as HTMLFormElement;
    const nombre = (form.elements.namedItem("nombre") as HTMLInputElement)
      .value;
    const descripcion = (
      form.elements.namedItem("descripcion") as HTMLInputElement
    ).value;
    const precioDolar = Number(
      (form.elements.namedItem("precio") as HTMLInputElement).value
    );
    const categoria = (form.elements.namedItem("categoria") as HTMLInputElement)
      .value;
    const marcaId = (form.elements.namedItem("marca") as HTMLInputElement)
      .value;
    const tipoId = (form.elements.namedItem("tipo") as HTMLInputElement).value;
    const tasaId = (form.elements.namedItem("tasa") as HTMLInputElement).value;
    try {
      const created = await productoService.create({
        nombre,
        descripcion,
        precioDolar,
        precioBs: 0,
        categoria,
        marca: marcaId ? Number(marcaId) : undefined,
        tipo: tipoId ? Number(tipoId) : undefined,
        tasa: tasaId ? Number(tasaId) : undefined,
      });
      setMensaje("Producto creado exitosamente");
      if (created && created.id) {
        router.push(`/categoria/${categoria}`);
      }
    } catch (err: any) {
      setError(
        "Hubo un error al crear el producto: " +
          (err?.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b-2 border-border p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="lg"
              className="text-foreground hover:text-accent"
              type="button"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              Volver
            </Button>
            <h1 className="text-4xl font-bold text-foreground">
              Nuevo Producto
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-8">
        <div className="bg-card rounded-2xl border-2 border-border p-10 shadow-xl">
          {mensaje && (
            <div className="mb-4 text-success font-semibold">{mensaje}</div>
          )}
          {error && (
            <div className="mb-4 text-destructive font-semibold">{error}</div>
          )}
          <form className="space-y-10" onSubmit={handleSubmit}>
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
                  name="nombre"
                  placeholder="Ej: Alimento Premium Perro Adulto"
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
                <Select name="marca">
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
                <Select name="tipo">
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
                <Select name="tasa">
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
                  name="precio"
                  type="number"
                  placeholder="0"
                  className="h-14 text-lg bg-background border-2 border-border focus:border-accent"
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="categoria"
                  className="text-lg font-semibold text-foreground"
                >
                  Categoría
                </Label>
                <Select
                  name="categoria"
                  value={categoria}
                  onValueChange={setCategoria}
                >
                  <SelectTrigger className="h-14 bg-background border-2 border-border">
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIAS.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                name="descripcion"
                placeholder="Descripción adicional del producto..."
                className="min-h-32 text-lg bg-background border-2 border-border focus:border-accent resize-none"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6 pt-8">
              <Button
                type="submit"
                className="h-16 px-10 flex-1 bg-success hover:bg-success/90 text-white text-lg font-semibold"
              >
                <Save className="w-6 h-6 mr-3" />
                Guardar Producto
              </Button>
              <Link href="/" className="flex-1">
                <Button
                  variant="outline"
                  className="h-16 w-full bg-transparent border-2 border-muted text-foreground hover:bg-muted text-lg"
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
