import { Suspense } from "react";
import EditarProductoClient from "./EditarProductoClient";

export default function EditarProductoPage() {
  return (
    <Suspense fallback={<div className="p-8">Cargando...</div>}>
      <EditarProductoClient />
    </Suspense>
  );
}
