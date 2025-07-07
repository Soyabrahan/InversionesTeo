"use client";

import { useEffect, useState } from "react";
import { marcaService, Marca } from "@/lib/services/marcaService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MarcaContent() {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nuevaMarca, setNuevaMarca] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [editNombre, setEditNombre] = useState("");
  const [eliminandoId, setEliminandoId] = useState<number | null>(null);

  const cargarMarcas = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await marcaService.getAll();
      setMarcas(data);
    } catch (e) {
      setError("Error al cargar las marcas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMarcas();
  }, []);

  const crearMarca = async () => {
    if (!nuevaMarca.trim()) return;
    setLoading(true);
    try {
      await marcaService.create({ nombre: nuevaMarca });
      setNuevaMarca("");
      cargarMarcas();
    } catch (e) {
      setError("Error al crear la marca");
    } finally {
      setLoading(false);
    }
  };

  const iniciarEdicion = (marca: Marca) => {
    setEditandoId(marca.id!);
    setEditNombre(marca.nombre);
  };

  const guardarEdicion = async () => {
    if (!editNombre.trim() || editandoId === null) return;
    setLoading(true);
    try {
      await marcaService.update(editandoId, { nombre: editNombre });
      setEditandoId(null);
      setEditNombre("");
      cargarMarcas();
    } catch (e) {
      setError("Error al editar la marca");
    } finally {
      setLoading(false);
    }
  };

  const eliminarMarca = async (id: number) => {
    setEliminandoId(id);
    setLoading(true);
    try {
      await marcaService.delete(id);
      cargarMarcas();
    } catch (e) {
      setError("Error al eliminar la marca");
    } finally {
      setEliminandoId(null);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border p-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          <Link href="/">
            <Button
              variant="ghost"
              size="lg"
              className="text-foreground hover:text-accent"
            >
              <ArrowLeft className="w-5 h-5 mr-3" /> Volver al Inicio
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-foreground">Marcas</h1>
          <div className="flex gap-2 mt-4">
            <Input
              placeholder="Nueva marca"
              value={nuevaMarca}
              onChange={(e) => setNuevaMarca(e.target.value)}
              className="max-w-xs"
              onKeyDown={(e) => {
                if (e.key === "Enter") crearMarca();
              }}
            />
            <Button onClick={crearMarca} className="bg-success text-white">
              <Plus className="w-5 h-5 mr-2" /> Crear
            </Button>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-8">
        {error && (
          <div className="mb-4 text-destructive font-semibold">{error}</div>
        )}
        <div className="bg-card rounded-2xl border-2 border-border overflow-x-auto shadow-xl">
          <table className="w-full text-base">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left p-3 font-bold text-foreground">
                  Nombre
                </th>
                <th className="text-left p-3 font-bold text-foreground">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {marcas.map((marca) => (
                <tr key={marca.id} className="border-b border-border">
                  <td className="p-3">
                    {editandoId === marca.id ? (
                      <Input
                        value={editNombre}
                        onChange={(e) => setEditNombre(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") guardarEdicion();
                        }}
                        className="max-w-xs"
                        autoFocus
                      />
                    ) : (
                      marca.nombre
                    )}
                  </td>
                  <td className="p-3 flex gap-2">
                    {editandoId === marca.id ? (
                      <>
                        <Button
                          size="sm"
                          onClick={guardarEdicion}
                          className="bg-success text-white"
                        >
                          Guardar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditandoId(null)}
                        >
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => iniciarEdicion(marca)}
                        >
                          <Pencil className="w-5 h-5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => eliminarMarca(marca.id!)}
                          disabled={eliminandoId === marca.id}
                        >
                          <Trash2 className="w-5 h-5 text-destructive" />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {marcas.length === 0 && (
                <tr>
                  <td
                    colSpan={2}
                    className="p-6 text-center text-muted-foreground"
                  >
                    No hay marcas registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
