import { useState } from "react";
import type { EstadoPedido, Pedido, Producto } from "./types";
import ProductoForm from "./components/ProductoForm";
import ProductoLista from "./components/ProductoLista";
import ProductoGrid from "./components/ProductoGrid";
import PedidoForm from "./components/PedidoForm";
import PedidoLista from "./components/PedidoLista";

type Vista = "inicio" | "productos" | "pedidos";


const PRODUCTOS_INICIALES: Producto[] = [
  { id: 1, nombre: "Audífonos Bluetooth", categoria: "Accesorios", precio: 85000, stock: 12 },
  { id: 2, nombre: "Cargador USB-C 30W", categoria: "Cargadores", precio: 45000, stock: 20 },
  { id: 3, nombre: "Smartphone 128GB", categoria: "Celulares", precio: 899000, stock: 6 },
];

export default function App() {
  const [productos, setProductos] = useState<Producto[]>(PRODUCTOS_INICIALES);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [vista, setVista] = useState<Vista>("inicio");
  const [categoria, setCategoria] = useState<string>("Todos");

  const categorias = ["Todos", ...Array.from(new Set(productos.map((p) => p.categoria)))];
  const filtrados = categoria === "Todos" ? productos : productos.filter((p) => p.categoria === categoria);
  const pendientes = pedidos.filter((p) => p.estado === "Pendiente").length;

  const agregarProducto = (datos: Omit<Producto, "id">) => {
    setProductos((prev) => [...prev, { ...datos, id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1 }]);
  };

  const crearPedido = (datos: { cliente: string; productoId: number; cantidad: number; fecha: string }) => {
    const producto = productos.find((p) => p.id === datos.productoId);
    if (!producto) return;

    setPedidos((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
        cliente: datos.cliente,
        productoId: producto.id,
        productoNombre: producto.nombre,
        cantidad: datos.cantidad,
        fecha: datos.fecha,
        total: producto.precio * datos.cantidad,
        estado: "Pendiente",
      },
    ]);
    // Descontar del inventario
    setProductos((prev) =>
      prev.map((p) => (p.id === producto.id ? { ...p, stock: p.stock - datos.cantidad } : p))
    );
  };

  const cambiarEstado = (id: number, estado: EstadoPedido) => {
    setPedidos((prev) => prev.map((p) => (p.id === id ? { ...p, estado } : p)));
  };

  const ir = (v: Vista) => {
    setVista(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const menu: { id: Vista; texto: string }[] = [
    { id: "inicio", texto: "Inicio" },
    { id: "productos", texto: "Productos" },
    { id: "pedidos", texto: "Pedidos" },
  ];

  return (
    <div className="sitio">
    
      <div className="topbar">
        <div className="topbar-item bg-1">📞 Atención: 300 000 0000</div>
        <div className="topbar-item bg-2">✉️ contacto@tiendaexpress.com</div>
        <button className="topbar-item bg-3" onClick={() => ir("pedidos")}>
          Haz tu pedido
        </button>
      </div>


      <header className="header">
        <div className="nav-container">
          <div className="logo">🛒⚡ Tienda Express</div>
          <nav className="nav-menu">
            <ul>
              {menu.map((m) => (
                <li key={m.id} className={vista === m.id ? "active" : ""} onClick={() => ir(m.id)}>
                  {m.texto}
                  {m.id === "pedidos" && pendientes > 0 && <span className="contador">{pendientes}</span>}
                </li>
              ))}
            </ul>
          </nav>
          <button className="order-btn" onClick={() => ir("pedidos")}>
            Nuevo pedido
          </button>
        </div>
      </header>

      {vista === "inicio" && (
        <section className="hero">
          <div className="hero-content">
            <h1>Tecnología al instante</h1>
            <p>Productos y accesorios con control total de tus pedidos</p>
            <button className="shop-btn" onClick={() => ir("productos")}>
              Ver productos
            </button>
          </div>
        </section>
      )}

    
      <section className="categories">
        {categorias.map((c) => (
          <button
            key={c}
            className={"category-item" + (c === categoria ? " seleccionada" : "")}
            onClick={() => setCategoria(c)}
          >
            {c}
          </button>
        ))}
      </section>

      <main className="contenido-principal">
        {vista === "inicio" && (
          <>
            <ProductoGrid productos={filtrados.slice(0, 6)} titulo="Productos destacados" />
            <div className="centro">
              <button className="see-more" onClick={() => ir("productos")}>
                Ver más
              </button>
            </div>

            <section className="banner-colecciones">
              <h2>{pedidos.length} pedidos registrados</h2>
              <p>{pendientes} pendientes · {productos.length} productos en catálogo</p>
              <button className="shop-btn" onClick={() => ir("pedidos")}>
                Gestionar pedidos
              </button>
            </section>
          </>
        )}

        {vista === "productos" && (
          <div className="dos-columnas">
            <ProductoForm onAgregar={agregarProducto} />
            <ProductoLista productos={filtrados} />
          </div>
        )}

        {vista === "pedidos" && (
          <div className="dos-columnas">
            <PedidoForm productos={productos} onCrear={crearPedido} />
            <PedidoLista pedidos={pedidos} onCambiarEstado={cambiarEstado} />
          </div>
        )}
      </main>


      <footer className="footer">
        <div className="footer-cols">
          <div className="footer-col">
            <h4>INFORMACIÓN</h4>
            <p>Sobre nosotros</p>
            <p>Envíos y entregas</p>
          </div>
          <div className="footer-col">
            <h4>MI CUENTA</h4>
            <p>Mis pedidos</p>
            <p>Mis productos</p>
          </div>
          <div className="footer-col">
            <h4>ACERCA DE</h4>
            <p>Reto ADSO</p>
            <p>React · TypeScript · Vite</p>
          </div>
          <div className="footer-col">
            <h4>CONTACTO</h4>
            <p>300 000 0000</p>
            <p>contacto@tiendaexpress.com</p>
          </div>
        </div>
        <p className="copy">© 2026 Tienda Express. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
