import ProductoEditarContent from "@/components/ProductoEditarContent";

export default function EditarProductoPage({
  params,
}: {
  params: { id: string };
}) {
  return <ProductoEditarContent id={params.id} />;
}
