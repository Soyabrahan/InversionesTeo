import ProductoEditarContent from "@/components/ProductoEditarContent";

export default function EditarProductoPage({
  params,
}: {
  params: { id: string };
}) {
  return <ProductoEditarContent id={params.id} />;
}

export async function generateStaticParams() {
  // Obtener los productos desde el backend
  const res = await fetch(
    "https://inversiones-teo-backend.onrender.com/productos"
  );
  const productos = await res.json();
  // Retornar los IDs como parámetros
  return productos.map((producto: { id: number }) => ({
    id: producto.id.toString(),
  }));
}
