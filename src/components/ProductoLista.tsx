import type { Producto } from "../types";

interface Props {
  productos: Producto[];
}

export const formatoCOP = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);

export default function ProductoLista({ productos }: Props) {
  return (
    <section className="card">
      <h2>Listado de productos ({productos.length})</h2>
      {productos.length === 0 ? (
        <p className="vacio">Aún no hay productos registrados.</p>
      ) : (
        <div className="tabla-wrap">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.categoria}</td>
                  <td>{formatoCOP(p.precio)}</td>
                  <td className={p.stock === 0 ? "agotado" : ""}>{p.stock === 0 ? "Agotado" : p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
