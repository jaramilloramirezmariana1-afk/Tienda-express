export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
}

export type EstadoPedido = "Pendiente" | "En proceso" | "Entregado";

export const ESTADOS: EstadoPedido[] = ["Pendiente", "En proceso", "Entregado"];

export interface Pedido {
  id: number;
  cliente: string;
  productoId: number;
  productoNombre: string;
  cantidad: number;
  fecha: string;
  total: number;
  estado: EstadoPedido;
}
