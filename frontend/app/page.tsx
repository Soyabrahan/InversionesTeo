"use client";
import Link from "next/link";
import { Package, Wrench, Bug, Fish, Leaf, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { monedaService, Moneda } from "@/lib/services/monedaService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const categorias = [
  {
    id: "alimentos",
    nombre: "Alimentos",
    descripcion: "Alimentos para animales",
    icono: Package,
    color: "bg-success",
  },
  {
    id: "ferreteria",
    nombre: "Ferretería",
    descripcion: "Herramientas y materiales",
    icono: Wrench,
    color: "bg-accent",
  },
  {
    id: "venenos",
    nombre: "Venenos",
    descripcion: "Control de plagas",
    icono: Bug,
    color: "bg-destructive",
  },
  {
    id: "pesca",
    nombre: "Pesca",
    descripcion: "Materiales de pesca",
    icono: Fish,
    color: "bg-success",
  },
  {
    id: "mimbre",
    nombre: "Mimbre",
    descripcion: "Productos de mimbre",
    icono: Leaf,
    color: "bg-accent",
  },
  {
    id: "otros",
    nombre: "Otros",
    descripcion: "Productos diversos",
    icono: MoreHorizontal,
    color: "bg-accent",
  },
];

export default function HomePage() {
  const [bcv, setBcv] = useState<Moneda | null>(null);
  const [modificable, setModificable] = useState<Moneda | null>(null);
  const [editTasa, setEditTasa] = useState<string>("");
  const [editando, setEditando] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasas = async () => {
      setLoading(true);
      setMensaje(null);
      setError(null);
      try {
        const monedas = await monedaService.getAll();
        setBcv(monedas.find((m) => m.id === 1) || null);
        const mod = monedas.find(
          (m) => m.id === 2 && m.nombre === "modificado"
        );
        setModificable(mod || null);
        setEditTasa(mod ? String(mod.tasa) : "");
      } catch (e) {
        setError("Error al cargar tasas");
      } finally {
        setLoading(false);
      }
    };
    fetchTasas();
  }, []);

  const actualizarBCV = async () => {
    setMensaje(null);
    setError(null);
    setLoading(true);
    try {
      // Solo llama al backend, que ya maneja la lógica de actualización
      const res = await fetch(
        "https://inversiones-teo-backend.onrender.com/monedas/bcv/actualizar",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!res.ok) throw new Error("No se pudo actualizar la tasa BCV");
      const dataBackend = await res.json();
      setBcv(dataBackend);
      setMensaje("Tasa BCV actualizada");
    } catch (e) {
      setError("Error al actualizar la tasa BCV");
    } finally {
      setLoading(false);
    }
  };

  const guardarModificable = async () => {
    setMensaje(null);
    setError(null);
    setLoading(true);
    try {
      if (!modificable) throw new Error("No hay tasa modificable");
      const nuevaTasa = Number(editTasa);
      if (isNaN(nuevaTasa) || nuevaTasa <= 0) throw new Error("Tasa inválida");
      await monedaService.update(modificable.id!, {
        tasa: nuevaTasa,
      });
      // Hacer GET para obtener el valor actualizado real
      const actualizado = await monedaService.getById(modificable.id!);
      setModificable(actualizado);
      setEditTasa(
        actualizado.tasa !== undefined && actualizado.tasa !== null
          ? String(actualizado.tasa)
          : ""
      );
      setMensaje("Tasa modificable actualizada");
      setEditando(false);
    } catch (e) {
      setError(
        (e as Error).message || "Error al actualizar la tasa modificable"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border p-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Gestión de Productos
          </h1>
          <p className="text-muted-foreground text-lg">
            Selecciona una categoría para comenzar
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {mensaje && (
          <div className="mb-4 text-success font-semibold">{mensaje}</div>
        )}
        {error && (
          <div className="mb-4 text-destructive font-semibold">{error}</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Cuadro BCV */}
          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg">
            <h2 className="text-xl font-bold mb-2 text-foreground">Tasa BCV</h2>
            <div className="text-3xl font-bold text-accent mb-4">
              {bcv ? Number(bcv.tasa).toFixed(2) : "-"}
            </div>
            <div className="text-xs text-muted-foreground mb-2">
              Última actualización:{" "}
              {bcv?.updatedAt ? new Date(bcv.updatedAt).toLocaleString() : "-"}
            </div>
            <Button
              onClick={actualizarBCV}
              disabled={loading}
              className="w-full"
            >
              Actualizar
            </Button>
          </div>
          {/* Cuadro Modificable */}
          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg">
            <h2 className="text-xl font-bold mb-2 text-foreground">
              Tasa Modificable
            </h2>
            {editando ? (
              <>
                <Input
                  type="number"
                  value={editTasa}
                  onChange={(e) => setEditTasa(e.target.value)}
                  className="mb-2 text-center"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={guardarModificable}
                    disabled={loading}
                    className="w-full"
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditTasa(
                        modificable &&
                          typeof modificable.tasa === "number" &&
                          !isNaN(modificable.tasa)
                          ? String(modificable.tasa)
                          : ""
                      );
                      setEditando(false);
                    }}
                    className="w-full"
                  >
                    Cancelar
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="text-3xl font-bold text-accent mb-4">
                  {(() => {
                    const tasaStr =
                      modificable &&
                      modificable.tasa !== undefined &&
                      modificable.tasa !== null
                        ? String(modificable.tasa)
                        : "";
                    const editStr =
                      editTasa !== undefined && editTasa !== null
                        ? String(editTasa)
                        : "";
                    const tasaNum =
                      tasaStr !== "" && !isNaN(Number(tasaStr))
                        ? Number(tasaStr)
                        : null;
                    const editNum =
                      editStr !== "" && !isNaN(Number(editStr))
                        ? Number(editStr)
                        : null;
                    if (tasaNum !== null && !isNaN(tasaNum))
                      return tasaNum.toFixed(2);
                    if (editNum !== null && !isNaN(editNum))
                      return editNum.toFixed(2);
                    return "No disponible";
                  })()}
                </div>
                <Button onClick={() => setEditando(true)} className="w-full">
                  Editar
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {categorias.map((categoria) => {
            const IconComponent = categoria.icono;
            return (
              <Link
                key={categoria.id}
                href={`/categoria/${categoria.id}`}
                className="group"
              >
                <div className="bg-card hover:bg-card/90 border border-border rounded-2xl p-4 md:p-10 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer min-h-[120px] md:min-h-[200px] flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center text-center space-y-3 md:space-y-6">
                    <div
                      className={`${categoria.color} p-3 md:p-6 rounded-2xl shadow-lg`}
                    >
                      <IconComponent className="w-8 h-8 md:w-12 md:h-12 text-white" />
                    </div>
                    <div>
                      <h2 className="text-base md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors mb-1 md:mb-2">
                        {categoria.nombre}
                      </h2>
                      <p className="text-muted-foreground text-xs md:text-base">
                        {categoria.descripcion}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
          {/* Botón para Marca */}
          <Link href="/marca" className="group">
            <div className="bg-card hover:bg-card/90 border border-border rounded-2xl p-4 md:p-10 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer min-h-[120px] md:min-h-[200px] flex flex-col items-center justify-center">
              <div className="flex flex-col items-center text-center space-y-3 md:space-y-6">
                <div className="bg-blue-500 p-3 md:p-6 rounded-2xl shadow-lg">
                  <Wrench className="w-8 h-8 md:w-12 md:h-12 text-white" />
                </div>
                <div>
                  <h2 className="text-base md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors mb-1 md:mb-2">
                    Marca
                  </h2>
                  <p className="text-muted-foreground text-xs md:text-base">
                    Gestiona las marcas
                  </p>
                </div>
              </div>
            </div>
          </Link>
          {/* Botón para Tipo */}
          <Link href="/tipo" className="group">
            <div className="bg-card hover:bg-card/90 border border-border rounded-2xl p-4 md:p-10 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer min-h-[120px] md:min-h-[200px] flex flex-col items-center justify-center">
              <div className="flex flex-col items-center text-center space-y-3 md:space-y-6">
                <div className="bg-green-500 p-3 md:p-6 rounded-2xl shadow-lg">
                  <Leaf className="w-8 h-8 md:w-12 md:h-12 text-white" />
                </div>
                <div>
                  <h2 className="text-base md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors mb-1 md:mb-2">
                    Tipo
                  </h2>
                  <p className="text-muted-foreground text-xs md:text-base">
                    Gestiona los tipos
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
