"use client";
import { useSearchParams } from "next/navigation";
import ProductoEditarContent from "@/components/ProductoEditarContent";

export default function EditarProductoPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  if (!id) return <div className="p-8">Falta el parámetro id</div>;
  return <ProductoEditarContent id={id} />;
}
