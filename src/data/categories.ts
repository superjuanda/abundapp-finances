import {
  UtensilsCrossed, Car, Home, Zap, Heart, GraduationCap,
  Gamepad2, Shirt, Smartphone, PawPrint, Sofa, Gift,
  TrendingUp, Receipt, Shield, CreditCard, MoreHorizontal
} from "lucide-react";

export interface Category {
  id: string;
  name: string;
  emoji: string;
  icon: React.ComponentType<any>;
  subcategories: { name: string; emoji: string }[];
}

export const CATEGORIES: Category[] = [
  {
    id: "alimentacion", name: "Alimentación", emoji: "🍔", icon: UtensilsCrossed,
    subcategories: [
      { name: "Supermercado", emoji: "🛒" },
      { name: "Restaurantes", emoji: "🍽️" },
      { name: "Delivery", emoji: "🛵" },
      { name: "Café", emoji: "☕" },
      { name: "Snacks", emoji: "🍿" },
      { name: "Mercado", emoji: "🥦" },
    ]
  },
  {
    id: "transporte", name: "Transporte", emoji: "🚗", icon: Car,
    subcategories: [
      { name: "Gasolina", emoji: "⛽" },
      { name: "Transporte público", emoji: "🚌" },
      { name: "Taxi/Uber", emoji: "🚕" },
      { name: "Mantenimiento", emoji: "🔧" },
      { name: "Parqueadero", emoji: "🅿️" },
      { name: "Peajes", emoji: "🛣️" },
    ]
  },
  {
    id: "vivienda", name: "Vivienda", emoji: "🏠", icon: Home,
    subcategories: [
      { name: "Arriendo", emoji: "🏘️" },
      { name: "Hipoteca", emoji: "🏦" },
      { name: "Reparaciones", emoji: "🔨" },
      { name: "Administración", emoji: "📋" },
      { name: "Muebles", emoji: "🛋️" },
    ]
  },
  {
    id: "servicios", name: "Servicios", emoji: "⚡", icon: Zap,
    subcategories: [
      { name: "Agua", emoji: "💧" },
      { name: "Luz", emoji: "💡" },
      { name: "Gas", emoji: "🔥" },
      { name: "Internet", emoji: "📡" },
      { name: "Celular", emoji: "📱" },
      { name: "Streaming", emoji: "📺" },
    ]
  },
  {
    id: "salud", name: "Salud", emoji: "❤️", icon: Heart,
    subcategories: [
      { name: "Medicamentos", emoji: "💊" },
      { name: "Consultas", emoji: "🩺" },
      { name: "Exámenes", emoji: "🔬" },
      { name: "Seguro médico", emoji: "🏥" },
      { name: "Gym", emoji: "🏋️" },
      { name: "Dentista", emoji: "🦷" },
    ]
  },
  {
    id: "educacion", name: "Educación", emoji: "🎓", icon: GraduationCap,
    subcategories: [
      { name: "Matrícula", emoji: "📝" },
      { name: "Libros", emoji: "📚" },
      { name: "Cursos online", emoji: "💻" },
      { name: "Material escolar", emoji: "✏️" },
      { name: "Tutorías", emoji: "👩‍🏫" },
    ]
  },
  {
    id: "entretenimiento", name: "Entretenimiento", emoji: "🎮", icon: Gamepad2,
    subcategories: [
      { name: "Cine", emoji: "🎬" },
      { name: "Conciertos", emoji: "🎵" },
      { name: "Suscripciones", emoji: "🔔" },
      { name: "Juegos", emoji: "🕹️" },
      { name: "Viajes", emoji: "✈️" },
      { name: "Fiestas", emoji: "🎉" },
    ]
  },
  {
    id: "ropa", name: "Ropa", emoji: "👕", icon: Shirt,
    subcategories: [
      { name: "Ropa casual", emoji: "👔" },
      { name: "Ropa formal", emoji: "👗" },
      { name: "Zapatos", emoji: "👟" },
      { name: "Accesorios", emoji: "👜" },
      { name: "Ropa deportiva", emoji: "🧢" },
    ]
  },
  {
    id: "tecnologia", name: "Tecnología", emoji: "📱", icon: Smartphone,
    subcategories: [
      { name: "Dispositivos", emoji: "💻" },
      { name: "Apps", emoji: "📲" },
      { name: "Accesorios tech", emoji: "🎧" },
      { name: "Reparaciones", emoji: "🔧" },
      { name: "Software", emoji: "⚙️" },
    ]
  },
  {
    id: "mascotas", name: "Mascotas", emoji: "🐾", icon: PawPrint,
    subcategories: [
      { name: "Comida", emoji: "🦴" },
      { name: "Veterinario", emoji: "💉" },
      { name: "Accesorios", emoji: "🐶" },
      { name: "Peluquería", emoji: "✂️" },
      { name: "Medicamentos", emoji: "💊" },
    ]
  },
  {
    id: "hogar", name: "Hogar", emoji: "🛋️", icon: Sofa,
    subcategories: [
      { name: "Limpieza", emoji: "🧹" },
      { name: "Decoración", emoji: "🖼️" },
      { name: "Electrodomésticos", emoji: "🍳" },
      { name: "Jardín", emoji: "🌱" },
      { name: "Herramientas", emoji: "🔩" },
    ]
  },
  {
    id: "regalos", name: "Regalos", emoji: "🎁", icon: Gift,
    subcategories: [
      { name: "Cumpleaños", emoji: "🎂" },
      { name: "Navidad", emoji: "🎄" },
      { name: "Aniversario", emoji: "💑" },
      { name: "Otros regalos", emoji: "🎀" },
    ]
  },
  {
    id: "ahorro", name: "Ahorro/Inversión", emoji: "📈", icon: TrendingUp,
    subcategories: [
      { name: "Ahorro", emoji: "🐷" },
      { name: "Inversiones", emoji: "📊" },
      { name: "Fondo de emergencia", emoji: "🆘" },
      { name: "CDT", emoji: "🏦" },
      { name: "Acciones", emoji: "📉" },
    ]
  },
  {
    id: "impuestos", name: "Impuestos", emoji: "🧾", icon: Receipt,
    subcategories: [
      { name: "Renta", emoji: "📄" },
      { name: "IVA", emoji: "💰" },
      { name: "Predial", emoji: "🏢" },
      { name: "Vehículo", emoji: "🚗" },
      { name: "Otros impuestos", emoji: "📑" },
    ]
  },
  {
    id: "seguros", name: "Seguros", emoji: "🛡️", icon: Shield,
    subcategories: [
      { name: "Vida", emoji: "💚" },
      { name: "Auto", emoji: "🚘" },
      { name: "Hogar", emoji: "🏡" },
      { name: "Salud", emoji: "🏥" },
      { name: "Viaje", emoji: "🧳" },
    ]
  },
  {
    id: "deudas", name: "Deudas", emoji: "💳", icon: CreditCard,
    subcategories: [
      { name: "Tarjeta de crédito", emoji: "💳" },
      { name: "Préstamo personal", emoji: "🤝" },
      { name: "Préstamo auto", emoji: "🚙" },
      { name: "Otros créditos", emoji: "📜" },
    ]
  },
  {
    id: "otros", name: "Otros", emoji: "🔮", icon: MoreHorizontal,
    subcategories: [
      { name: "Donaciones", emoji: "🙏" },
      { name: "Propinas", emoji: "💵" },
      { name: "Imprevistos", emoji: "😱" },
      { name: "Otros", emoji: "❓" },
    ]
  },
];

export const USER_PROFILES: Record<string, { emoji: string; color: string }> = {
  "Juan David": { emoji: "👨", color: "hsl(var(--primary))" },
  "Nicolle": { emoji: "👩", color: "hsl(var(--accent))" },
};

export const USERS = ["Juan David", "Nicolle"] as const;
export type User = (typeof USERS)[number];
