"use client";

import { useEffect, useState } from "react";
import { tipoService, Tipo } from "@/lib/services/tipoService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TipoContent() {
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nuevoTipo, setNuevoTipo] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [editNombre, setEditNombre] = useState("");
  const [eliminandoId, setEliminandoId] = useState<number | null>(null);

  const cargarTipos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tipoService.getAll();
      setTipos(data);
    } catch (e) {
      setError("Error al cargar los tipos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTipos();
  }, []);

  const crearTipo = async () => {
    if (!nuevoTipo.trim()) return;
    setLoading(true);
    try {
      await tipoService.create({ nombre: nuevoTipo });
      setNuevoTipo("");
      cargarTipos();
    } catch (e) {
      setError("Error al crear el tipo");
    } finally {
      setLoading(false);
    }
  };

  const iniciarEdicion = (tipo: Tipo) => {
    setEditandoId(tipo.id!);
    setEditNombre(tipo.nombre);
  };

  const guardarEdicion = async () => {
    if (!editNombre.trim() || editandoId === null) return;
    setLoading(true);
    try {
      await tipoService.update(editandoId, { nombre: editNombre });
      setEditandoId(null);
      setEditNombre("");
      cargarTipos();
    } catch (e) {
      setError("Error al editar el tipo");
    } finally {
      setLoading(false);
    }
  };

  const eliminarTipo = async (id: number) => {
    setEliminandoId(id);
    setLoading(true);
    try {
      await tipoService.delete(id);
      cargarTipos();
    } catch (e) {
      setError("Error al eliminar el tipo");
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
          <h1 className="text-4xl font-bold text-foreground">Tipos</h1>
          <div className="flex gap-2 mt-4">
            <Input
              placeholder="Nuevo tipo"
              value={nuevoTipo}
              onChange={(e) => setNuevoTipo(e.target.value)}
              className="max-w-xs"
              onKeyDown={(e) => {
                if (e.key === "Enter") crearTipo();
              }}
            />
            <Button onClick={crearTipo} className="bg-success text-white">
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
              {tipos.map((tipo) => (
                <tr key={tipo.id} className="border-b border-border">
                  <td className="p-3">
                    {editandoId === tipo.id ? (
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
                      tipo.nombre
                    )}
                  </td>
                  <td className="p-3 flex gap-2">
                    {editandoId === tipo.id ? (
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
                          onClick={() => iniciarEdicion(tipo)}
                        >
                          <Pencil className="w-5 h-5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => eliminarTipo(tipo.id!)}
                          disabled={eliminandoId === tipo.id}
                        >
                          <Trash2 className="w-5 h-5 text-destructive" />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {tipos.length === 0 && (
                <tr>
                  <td
                    colSpan={2}
                    className="p-6 text-center text-muted-foreground"
                  >
                    No hay tipos registrados.
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
