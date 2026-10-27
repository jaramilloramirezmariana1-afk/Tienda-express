import type { Producto } from "../types";
import { formatoCOP } from "./ProductoLista";

interface Props {
  productos: Producto[];
  titulo: string;
}

const ICONOS: Record<string, string> = {
  accesorios: "🎧",
  cargadores: "🔌",
  celulares: "📱",
  computadores: "💻",
};

const icono = (categoria: string) => ICONOS[categoria.trim().toLowerCase()] ?? "📦";

export default function ProductoGrid({ productos, titulo }: Props) {
  return (
    <section className="destacados">
      <h2>{titulo}</h2>
      {productos.length === 0 ? (
        <p className="vacio">No hay productos en esta categoría.</p>
      ) : (
        <div className="grid-productos">
          {productos.map((p) => (
            <article className="tarjeta-producto" key={p.id}>
              <div className="imagen">{icono(p.categoria)}</div>
              <h3>{p.nombre}</h3>
              <span className="chip">{p.categoria}</span>
              <p className="precio">{formatoCOP(p.precio)}</p>
              <p className={p.stock === 0 ? "stock agotado" : "stock"}>
                {p.stock === 0 ? "Agotado" : `${p.stock} disponibles`}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
