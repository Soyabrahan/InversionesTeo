import Link from "next/link"
import { Package, Wrench, Bug, Fish, Leaf, MoreHorizontal } from "lucide-react"

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
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border p-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">Gestión de Productos</h1>
          <p className="text-muted-foreground text-lg">Selecciona una categoría para comenzar</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categorias.map((categoria) => {
            const IconComponent = categoria.icono
            return (
              <Link key={categoria.id} href={`/categoria/${categoria.id}`} className="group">
                <div className="bg-card hover:bg-card/90 border border-border rounded-2xl p-10 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer min-h-[200px] flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className={`${categoria.color} p-6 rounded-2xl shadow-lg`}>
                      <IconComponent className="w-12 h-12 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors mb-2">
                        {categoria.nombre}
                      </h2>
                      <p className="text-muted-foreground text-base">{categoria.descripcion}</p>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
