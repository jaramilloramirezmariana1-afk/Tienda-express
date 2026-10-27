import { useState } from "react";
import type { FormEvent } from "react";
import type { Producto } from "../types";

interface Props {
  onAgregar: (p: Omit<Producto, "id">) => void;
}

interface Errores {
  nombre?: string;
  categoria?: string;
  precio?: string;
  stock?: string;
}

export default function ProductoForm({ onAgregar }: Props) {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [errores, setErrores] = useState<Errores>({});
  const [mensaje, setMensaje] = useState("");

  const validar = (): Errores => {
    const e: Errores = {};
    if (!nombre.trim()) e.nombre = "El nombre es obligatorio.";
    if (!categoria.trim()) e.categoria = "La categoría es obligatoria.";
    if (precio === "" || Number(precio) <= 0) e.precio = "Ingrese un precio mayor que 0.";
    if (stock === "" || !Number.isInteger(Number(stock)) || Number(stock) < 0)
      e.stock = "Ingrese un stock entero (0 o más).";
    return e;
  };

  const enviar = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validar();
    setErrores(e);
    setMensaje("");
    if (Object.keys(e).length > 0) return;

    onAgregar({
      nombre: nombre.trim(),
      categoria: categoria.trim(),
      precio: Number(precio),
      stock: Number(stock),
    });
    setNombre("");
    setCategoria("");
    setPrecio("");
    setStock("");
    setMensaje("✅ Producto registrado correctamente.");
  };

  return (
    <form className="card" onSubmit={enviar} noValidate>
      <h2>Registrar producto</h2>

      <label>
        Nombre
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="" />
        {errores.nombre && <span className="error">{errores.nombre}</span>}
      </label>

      <label>
        Categoría
        <input value={categoria} onChange={(e) => setCategoria(e.target.value)} placeholder="" />
        {errores.categoria && <span className="error">{errores.categoria}</span>}
      </label>

      <div className="fila">
        <label>
          Precio (COP)
          <input type="number" min="0" value={precio} onChange={(e) => setPrecio(e.target.value)} />
          {errores.precio && <span className="error">{errores.precio}</span>}
        </label>
        <label>
          Stock
          <input type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} />
          {errores.stock && <span className="error">{errores.stock}</span>}
        </label>
      </div>

      <button type="submit">Agregar producto</button>
      {mensaje && <p className="ok">{mensaje}</p>}
    </form>
  );
}
