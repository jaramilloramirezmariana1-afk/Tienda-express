# 🛒 Tienda Express — Reto ADSO

Prototipo funcional para registrar productos, crear pedidos y consultar/cambiar su estado.
Desarrollado con **React + TypeScript + Vite** (HTML, CSS y JavaScript como base).

**Integrantes:** _(Daniel Prieto)_ y _(Mariana Ramirez)_
**Ficha / Instructor:** 

---

## 1. Análisis del problema

**Tienda Express** vende productos de tecnología y accesorios por mostrador y en línea.
Hoy registra sus ventas en una libreta y hojas de cálculo, lo que genera:

- Errores de digitación.
- Pérdida de información.
- Dificultad para saber en qué estado está cada pedido.

**Objetivo del sistema:** permitir registrar productos, crear pedidos y consultar su estado en un solo lugar.

### Requerimientos funcionales (los 2 principales del entregable)

| Código | Requerimiento |
|--------|----------------|
| RF-01 | El sistema debe permitir registrar productos (nombre, categoría, precio, stock) y mostrarlos en un listado. |
| RF-02 | El sistema debe permitir registrar pedidos (cliente, producto, cantidad, fecha) y mostrarlos en un listado con su estado. |
| RF-03 | El sistema debe validar que los campos obligatorios estén completos y con valores válidos. |
| RF-04 | El sistema debe permitir cambiar el estado de un pedido: Pendiente → En proceso → Entregado. |

### Requerimiento no funcional (el 1 principal del entregable)

| Código | Requerimiento |
|--------|----------------|
| RNF-01 | **Usabilidad:** la interfaz debe ser clara y usable en computador y celular (diseño responsive), con mensajes de error comprensibles. |
| RNF-02 | **Rendimiento:** las acciones se reflejan en pantalla al instante, sin recargar la página (SPA con React). |

### Alcance y supuestos

- Los datos se almacenan **en memoria** (estados de React / vectores); al recargar la página se reinician (así lo exige el reto).
- Al crear un pedido se descuenta el stock del producto y no se permite pedir más unidades de las disponibles.
- Todo pedido nuevo inicia en estado **Pendiente**.

---

## 2. Diseño — Boceto de la interfaz

### Pantalla "Productos"

```
┌──────────────────────────────────────────────────────────┐
│ 🛒 TIENDA EXPRESS                                        │
│ Gestión de productos y pedidos                           │
│ [📦 2 productos] [🧾 0 pedidos] [⏳ 0 pendientes]        │
├──────────────────────────────────────────────────────────┤
│ [ Productos ]  [ Pedidos ]                               │
├───────────────────┬──────────────────────────────────────┤
│ Registrar producto│ Listado de productos (2)             │
│                   │ ┌────────┬─────────┬────────┬──────┐ │
│ Nombre   [______] │ │Nombre  │Categoría│Precio  │Stock │ │
│ Categoría[______] │ ├────────┼─────────┼────────┼──────┤ │
│ Precio [___] Stock│ │Audíf.. │Accesor. │$85.000 │ 12   │ │
│ [___]             │ │Carg... │Cargad.  │$45.000 │ 20   │ │
│ [Agregar producto]│ └────────┴─────────┴────────┴──────┘ │
└───────────────────┴──────────────────────────────────────┘
```

### Pantalla "Pedidos"

```
┌───────────────────┬──────────────────────────────────────────────┐
│ Registrar pedido  │ Listado de pedidos (1)                       │
│                   │ #  Cliente  Producto  Cant Fecha  Total Estado│
│ Cliente  [______] │ 1  Ana      Audíf..    2  27/10  $170k       │
│ Producto [▼_____] │                      [Pendiente] [▼ cambiar]  │
│ Cantidad [__]     │                                               │
│ Fecha    [____]   │                                               │
│ [Crear pedido]    │                                               │
└───────────────────┴──────────────────────────────────────────────┘
```

### Decisiones de diseño

- Dos pestañas (Productos / Pedidos) para no saturar la pantalla.
- Formulario a la izquierda y listado a la derecha; en celular se apilan.
- Colores por estado: 🟡 Pendiente, 🔵 En proceso, 🟢 Entregado.
- Mensajes de error junto a cada campo y confirmación en verde al guardar.

---

## 3. Desarrollo — Estructura del proyecto

```
src/
├── main.tsx                  # Punto de entrada
├── App.tsx                   # Estado global (vectores en memoria) y navegación
├── types.ts                  # Interfaces: Producto, Pedido, EstadoPedido
├── styles.css                # Estilos (CSS)
└── components/
    ├── ProductoForm.tsx      # Formulario + validaciones de productos
    ├── ProductoLista.tsx     # Listado de productos (tabla)
    ├── ProductoGrid.tsx      # Productos destacados en tarjetas (inicio)
    ├── PedidoForm.tsx        # Formulario + validaciones de pedidos
    └── PedidoLista.tsx       # Listado de pedidos y cambio de estado
```

### Justificación técnica

| Decisión | Por qué |
|----------|---------|
| **React** | Componentes reutilizables; la pantalla se actualiza sola cuando cambia el estado. |
| **TypeScript** | Tipos (`Producto`, `Pedido`, `EstadoPedido`) evitan errores, como asignar un estado inválido. |
| **Vite** | Arranque rápido y configuración mínima, ideal para 90 minutos. |
| **`useState` (vectores en memoria)** | Cumple el requisito de almacenar en memoria sin backend. |
| **Estado en `App.tsx`** | Productos y pedidos se comparten entre pantallas (el pedido necesita los productos). |

### Relación requerimientos ↔ funcionalidades

| Requerimiento | Dónde está implementado |
|---------------|-------------------------|
| RF-01 | `ProductoForm.tsx` + `ProductoLista.tsx` |
| RF-02 | `PedidoForm.tsx` + `PedidoLista.tsx` |
| RF-03 | Función `validar()` en ambos formularios |
| RF-04 | Selector de estado en `PedidoLista.tsx` → `cambiarEstado()` en `App.tsx` |
| RNF-01 | `styles.css` (responsive, mensajes claros) |
| RNF-02 | Actualización de estado de React sin recarga |

---

## 4. Cómo ejecutar

```bash
npm install
npm run dev      # abre http://localhost:5173
npm run build    # genera la versión de producción
```

## 5. Guion para la demostración (máx. 3 min)

1. Mostrar el problema y los requerimientos (30 s).
2. Intentar registrar un producto **vacío** → se ven las validaciones.
3. Registrar un producto válido → aparece en el listado.
4. Ir a **Pedidos**, crear un pedido → aparece como *Pendiente* y baja el stock.
5. Cambiar el estado a *En proceso* y luego *Entregado*.
6. Explicar cómo cada requerimiento se relaciona con lo mostrado.
