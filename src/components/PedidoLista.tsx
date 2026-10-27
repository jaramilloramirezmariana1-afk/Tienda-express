import { ESTADOS } from "../types";
import type { EstadoPedido, Pedido } from "../types";
import { formatoCOP } from "./ProductoLista";

interface Props {
  pedidos: Pedido[];
  onCambiarEstado: (id: number, estado: EstadoPedido) => void;
}

const claseEstado = (e: EstadoPedido) =>
  e === "Pendiente" ? "badge pendiente" : e === "En proceso" ? "badge proceso" : "badge entregado";

export default function PedidoLista({ pedidos, onCambiarEstado }: Props) {
  return (
    <section className="card">
      <h2>Listado de pedidos ({pedidos.length})</h2>
      {pedidos.length === 0 ? (
        <p className="vacio">Aún no hay pedidos registrados.</p>
      ) : (
        <div className="tabla-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Cant.</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.cliente}</td>
                  <td>{p.productoNombre}</td>
                  <td>{p.cantidad}</td>
                  <td>{p.fecha}</td>
                  <td>{formatoCOP(p.total)}</td>
                  <td>
                    <span className={claseEstado(p.estado)}>{p.estado}</span>
                    <select
                      aria-label={`Cambiar estado del pedido ${p.id}`}
                      value={p.estado}
                      onChange={(e) => onCambiarEstado(p.id, e.target.value as EstadoPedido)}
                    >
                      {ESTADOS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
