import {
  UtensilsCrossed, Car, Home, Zap, Heart, GraduationCap,
  Gamepad2, Shirt, Smartphone, PawPrint, Sofa, Gift,
  TrendingUp, Receipt, Shield, CreditCard, MoreHorizontal
} from "lucide-react";

export interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  subcategories: string[];
}

export const CATEGORIES: Category[] = [
  { id: "alimentacion", name: "Alimentación", icon: UtensilsCrossed, subcategories: ["Supermercado", "Restaurantes", "Delivery", "Café", "Snacks", "Mercado"] },
  { id: "transporte", name: "Transporte", icon: Car, subcategories: ["Gasolina", "Transporte público", "Taxi/Uber", "Mantenimiento", "Parqueadero", "Peajes"] },
  { id: "vivienda", name: "Vivienda", icon: Home, subcategories: ["Arriendo", "Hipoteca", "Reparaciones", "Administración", "Muebles"] },
  { id: "servicios", name: "Servicios", icon: Zap, subcategories: ["Agua", "Luz", "Gas", "Internet", "Celular", "Streaming"] },
  { id: "salud", name: "Salud", icon: Heart, subcategories: ["Medicamentos", "Consultas", "Exámenes", "Seguro médico", "Gym", "Dentista"] },
  { id: "educacion", name: "Educación", icon: GraduationCap, subcategories: ["Matrícula", "Libros", "Cursos online", "Material escolar", "Tutorías"] },
  { id: "entretenimiento", name: "Entretenimiento", icon: Gamepad2, subcategories: ["Cine", "Conciertos", "Suscripciones", "Juegos", "Viajes", "Fiestas"] },
  { id: "ropa", name: "Ropa", icon: Shirt, subcategories: ["Ropa casual", "Ropa formal", "Zapatos", "Accesorios", "Ropa deportiva"] },
  { id: "tecnologia", name: "Tecnología", icon: Smartphone, subcategories: ["Dispositivos", "Apps", "Accesorios tech", "Reparaciones", "Software"] },
  { id: "mascotas", name: "Mascotas", icon: PawPrint, subcategories: ["Comida", "Veterinario", "Accesorios", "Peluquería", "Medicamentos"] },
  { id: "hogar", name: "Hogar", icon: Sofa, subcategories: ["Limpieza", "Decoración", "Electrodomésticos", "Jardín", "Herramientas"] },
  { id: "regalos", name: "Regalos", icon: Gift, subcategories: ["Cumpleaños", "Navidad", "Aniversario", "Otros regalos"] },
  { id: "ahorro", name: "Ahorro/Inversión", icon: TrendingUp, subcategories: ["Ahorro", "Inversiones", "Fondo de emergencia", "CDT", "Acciones"] },
  { id: "impuestos", name: "Impuestos", icon: Receipt, subcategories: ["Renta", "IVA", "Predial", "Vehículo", "Otros impuestos"] },
  { id: "seguros", name: "Seguros", icon: Shield, subcategories: ["Vida", "Auto", "Hogar", "Salud", "Viaje"] },
  { id: "deudas", name: "Deudas", icon: CreditCard, subcategories: ["Tarjeta de crédito", "Préstamo personal", "Préstamo auto", "Otros créditos"] },
  { id: "otros", name: "Otros", icon: MoreHorizontal, subcategories: ["Donaciones", "Propinas", "Imprevistos", "Otros"] },
];

export const USERS = ["Juan David", "Nicolle"] as const;
export type User = (typeof USERS)[number];
