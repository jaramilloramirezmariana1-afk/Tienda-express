import { useState } from "react";
import type { FormEvent } from "react";
import type { Producto } from "../types";

interface Props {
  productos: Producto[];
  onCrear: (p: { cliente: string; productoId: number; cantidad: number; fecha: string }) => void;
}

interface Errores {
  cliente?: string;
  producto?: string;
  cantidad?: string;
  fecha?: string;
}

const hoy = () => new Date().toISOString().slice(0, 10);

export default function PedidoForm({ productos, onCrear }: Props) {
  const [cliente, setCliente] = useState("");
  const [productoId, setProductoId] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [fecha, setFecha] = useState(hoy());
  const [errores, setErrores] = useState<Errores>({});
  const [mensaje, setMensaje] = useState("");

  const disponibles = productos.filter((p) => p.stock > 0);

  const validar = (): Errores => {
    const e: Errores = {};
    if (!cliente.trim()) e.cliente = "El cliente es obligatorio.";
    if (!productoId) e.producto = "Seleccione un producto.";
    const prod = productos.find((p) => p.id === Number(productoId));
    const cant = Number(cantidad);
    if (cantidad === "" || !Number.isInteger(cant) || cant <= 0) {
      e.cantidad = "Ingrese una cantidad entera mayor que 0.";
    } else if (prod && cant > prod.stock) {
      e.cantidad = `Solo hay ${prod.stock} unidades disponibles.`;
    }
    if (!fecha) e.fecha = "La fecha es obligatoria.";
    return e;
  };

  const enviar = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validar();
    setErrores(e);
    setMensaje("");
    if (Object.keys(e).length > 0) return;

    onCrear({ cliente: cliente.trim(), productoId: Number(productoId), cantidad: Number(cantidad), fecha });
    setCliente("");
    setProductoId("");
    setCantidad("");
    setFecha(hoy());
    setMensaje("✅ Pedido registrado correctamente.");
  };

  return (
    <form className="card" onSubmit={enviar} noValidate>
      <h2>Registrar pedido</h2>

      <label>
        Cliente
        <input value={cliente} onChange={(e) => setCliente(e.target.value)} placeholder="Nombre del cliente" />
        {errores.cliente && <span className="error">{errores.cliente}</span>}
      </label>

      <label>
        Producto
        <select value={productoId} onChange={(e) => setProductoId(e.target.value)}>
          <option value="">-- Seleccione --</option>
          {disponibles.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} (stock: {p.stock})
            </option>
          ))}
        </select>
        {errores.producto && <span className="error">{errores.producto}</span>}
      </label>

      <div className="fila">
        <label>
          Cantidad
          <input type="number" min="1" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
          {errores.cantidad && <span className="error">{errores.cantidad}</span>}
        </label>
        <label>
          Fecha
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          {errores.fecha && <span className="error">{errores.fecha}</span>}
        </label>
      </div>

      <button type="submit" disabled={productos.length === 0}>
        Crear pedido
      </button>
      {productos.length === 0 && <p className="vacio">Primero registre al menos un producto.</p>}
      {mensaje && <p className="ok">{mensaje}</p>}
    </form>
  );
}
