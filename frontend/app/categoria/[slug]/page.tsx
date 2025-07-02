import CategoriaContent from "@/components/CategoriaContent";

const categoriasNombres = {
  alimentos: "Alimentos",
  ferreteria: "Ferretería",
  venenos: "Venenos",
  pesca: "Pesca",
  mimbre: "Mimbre",
  otros: "Otros",
};

export async function generateStaticParams() {
  return [
    { slug: "alimentos" },
    { slug: "ferreteria" },
    { slug: "venenos" },
    { slug: "pesca" },
    { slug: "mimbre" },
    { slug: "otros" },
  ];
}

export default function CategoriaPage({
  params,
}: {
  params: { slug: string };
}) {
  const categoria = params.slug;
  const nombreCategoria =
    categoriasNombres[categoria as keyof typeof categoriasNombres] ||
    "Categoría";

  return (
    <CategoriaContent categoria={categoria} nombreCategoria={nombreCategoria} />
  );
}
