import { useState } from "react";
import { ThumbsUp, ThumbsDown, Sparkles, ScanLine, Wallet, BarChart3, Lightbulb, Target, Zap, Layout, Trophy, Download, Users, Tags, Wifi, Bell, GripVertical, Palette, Search, Paperclip, Send, Trash2 } from "lucide-react";
import abundappWhite from "@/assets/Abundapp_white.png";

const STORAGE_KEY = "abundapp_votes";
const IDEAS_KEY = "abundapp_ideas";

interface Idea {
  id: string;
  text: string;
  date: string;
}

function loadVotes(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function loadIdeas(): Idea[] {
  try {
    return JSON.parse(localStorage.getItem(IDEAS_KEY) || "[]");
  } catch {
    return [];
  }
}

const sections = [
  {
    emoji: null,
    items: [
      {
        icon: Sparkles,
        title: "1. Detección automática de gastos recurrentes",
        bullets: [
          'Identificar patrones (ej: "Netflix cada mes $15")',
          "Sugerir presupuestos basados en histórico",
          "Alertas antes de cargos recurrentes",
        ],
      },
      {
        icon: ScanLine,
        title: "2. Escaneo de recibos con OCR",
        bullets: [
          "Foto del ticket → extrae monto, categoría, fecha",
          "Reduce fricción de entrada manual",
          "Muy usado en apps premium",
        ],
      },
      {
        icon: Wallet,
        title: "3. Múltiples cuentas/billeteras",
        bullets: [
          "Efectivo, tarjetas, cuentas bancarias",
          "Ver balance total consolidado",
          "Transferencias entre cuentas",
        ],
      },
    ],
  },
  {
    emoji: "📊",
    title: "Analytics Inteligentes",
    items: [
      {
        icon: BarChart3,
        title: "4. Comparación mes a mes",
        bullets: [
          '"Gastaste 23% más que febrero"',
          "Gráficos de tendencias por categoría",
          "Predicción de gasto mensual basado en velocidad actual",
        ],
      },
      {
        icon: Lightbulb,
        title: "5. Insights automáticos",
        bullets: [
          '"Tu mayor gasto este mes fue Restaurantes"',
          '"Gastas más los viernes"',
          '"Ahorraste $200 vs mes pasado"',
        ],
      },
      {
        icon: Target,
        title: "6. Metas de ahorro",
        bullets: [
          '"Quiero ahorrar $5000 para X"',
          "Progreso visual con timeline",
          "Sugerencias de dónde recortar",
        ],
      },
    ],
  },
  {
    emoji: "💡",
    title: "UX que Enamora",
    items: [
      {
        icon: Zap,
        title: "7. Entrada rápida con valores sugeridos",
        bullets: [
          "Autocompletar subcategorías frecuentes",
          "Montos recientes para misma categoría",
          'Templated gastos (ej: "Almuerzo rápido $12")',
        ],
      },
      {
        icon: Layout,
        title: "8. Widgets y atajos",
        bullets: [
          '"Agregar gasto" desde widget de pantalla principal',
          'Entrada por voz: "Registra $30 en Uber"',
          "Botón flotante siempre visible",
        ],
      },
      {
        icon: Trophy,
        title: "9. Gamificación sutil",
        bullets: [
          'Streaks: "15 días registrando gastos"',
          "Badges por logros (primer mes bajo presupuesto)",
          'Nivel de "salud financiera" con puntaje',
        ],
      },
    ],
  },
  {
    emoji: "🔒",
    title: "Control y Privacidad",
    items: [
      {
        icon: Download,
        title: "10. Exportación de datos",
        bullets: [
          "CSV, PDF, Excel para impuestos",
          "Backup automático",
          "Integración con Google Drive/Dropbox",
        ],
      },
      {
        icon: Users,
        title: "11. Gastos compartidos avanzados",
        bullets: [
          '"Juan debe $150 a Nicolle"',
          "Split automático 50/50 o customizado",
          "Historial de liquidaciones",
        ],
      },
      {
        icon: Tags,
        title: "12. Categorías personalizables",
        bullets: [
          "Crear/editar/eliminar categorías",
          "Íconos y colores custom",
          "Subcategorías ilimitadas",
        ],
      },
    ],
  },
  {
    emoji: "🚀",
    title: "Tech que Impresiona",
    items: [
      {
        icon: Wifi,
        title: "13. Modo offline-first",
        bullets: [
          "Funciona sin internet",
          "Sync automático al reconectar",
          "Cola de sincronización visible",
        ],
      },
      {
        icon: Bell,
        title: "14. Recordatorios inteligentes",
        bullets: [
          '"No has registrado gastos hoy" (a las 8pm)',
          '"Revisa tu presupuesto semanal"',
          "Customizable por usuario",
        ],
      },
      {
        icon: GripVertical,
        title: "15. Dashboard personalizable",
        bullets: [
          "Arrastrar y soltar widgets",
          "Elegir qué métricas ver primero",
          "Vista rápida vs detallada",
        ],
      },
    ],
  },
  {
    emoji: "🎨",
    title: "Detalles Premium",
    items: [
      {
        icon: Palette,
        title: "16. Themes y personalización",
        bullets: [
          "Modo oscuro automático",
          "Colores por categoría",
          "Animaciones satisfactorias",
        ],
      },
      {
        icon: Search,
        title: "17. Búsqueda y filtros potentes",
        bullets: [
          '"Gastos > $50 en Restaurantes en marzo"',
          "Búsqueda por notas",
          "Guardar búsquedas frecuentes",
        ],
      },
      {
        icon: Paperclip,
        title: "18. Adjuntos",
        bullets: [
          "Fotos de recibos en cada gasto",
          "Notas de voz",
          "Links (ej: tracking de Amazon)",
        ],
      },
    ],
  },
];

export function ComingSoonScreen() {
  const [votes, setVotes] = useState<Record<string, number>>(loadVotes);
  const [ideas, setIdeas] = useState<Idea[]>(loadIdeas);
  const [newIdea, setNewIdea] = useState("");

  const vote = (key: string, delta: number) => {
    setVotes((prev) => {
      const next = { ...prev, [key]: (prev[key] ?? 0) + delta };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const addIdea = () => {
    const text = newIdea.trim();
    if (!text) return;
    const idea: Idea = {
      id: Date.now().toString(),
      text,
      date: new Date().toLocaleDateString("es-CO", { day: "numeric", month: "short" }),
    };
    const next = [...ideas, idea];
    setIdeas(next);
    localStorage.setItem(IDEAS_KEY, JSON.stringify(next));
    setNewIdea("");
  };

  const deleteIdea = (id: string) => {
    const next = ideas.filter((i) => i.id !== id);
    setIdeas(next);
    localStorage.setItem(IDEAS_KEY, JSON.stringify(next));
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary-light px-5 pt-10 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <img src={abundappWhite} alt="Abundapp" className="h-8" />
        </div>
        <h1 className="text-xl font-bold text-white">Próximamente</h1>
        <p className="text-white/80 text-sm mt-1">
          Funcionalidades en las que estamos trabajando con Claude Code
        </p>
      </div>

      <div className="px-4 py-5 space-y-6">
        {sections.map((section, si) => (
          <div key={si}>
            {section.title && (
              <h2 className="text-base font-bold text-foreground mb-3">
                {section.emoji} {section.title}
              </h2>
            )}
            <div className="space-y-3">
              {section.items.map((item, ii) => {
                const key = item.title;
                const count = votes[key] ?? 0;
                return (
                  <div
                    key={ii}
                    className="bg-card rounded-xl border border-border p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <item.icon size={16} className="text-primary" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground leading-tight flex-1">
                        {item.title}
                      </h3>
                      {/* Voting */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => vote(key, -1)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center active:scale-95 transition-transform bg-destructive/10 hover:bg-destructive/20"
                        >
                          <ThumbsDown size={13} className="text-destructive" />
                        </button>
                        <span
                          className={`text-sm font-bold w-6 text-center tabular-nums ${
                            count > 0
                              ? "text-primary"
                              : count < 0
                              ? "text-destructive"
                              : "text-muted-foreground"
                          }`}
                        >
                          {count}
                        </span>
                        <button
                          onClick={() => vote(key, 1)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center active:scale-95 transition-transform bg-primary/10 hover:bg-primary/20"
                        >
                          <ThumbsUp size={13} className="text-primary" />
                        </button>
                      </div>
                    </div>
                    <ul className="space-y-1 ml-10">
                      {item.bullets.map((b, bi) => (
                        <li
                          key={bi}
                          className="text-xs text-muted-foreground leading-relaxed"
                        >
                          • {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {/* Ideas de mejora */}
        <div>
          <h2 className="text-base font-bold text-foreground mb-3">💡 Mis ideas de mejora</h2>
          <div className="bg-card rounded-xl border border-border p-4 shadow-sm space-y-4">
            <p className="text-xs text-muted-foreground">
              ¿Tienes una idea que no está en la lista? ¡Anótala aquí!
            </p>

            {/* Input */}
            <div className="flex gap-2">
              <textarea
                value={newIdea}
                onChange={(e) => setNewIdea(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); addIdea(); } }}
                placeholder="Escribe tu idea..."
                rows={2}
                className="flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                onClick={addIdea}
                disabled={!newIdea.trim()}
                className="w-11 h-11 self-end rounded-xl bg-primary flex items-center justify-center shrink-0 disabled:opacity-40 active:scale-95 transition-transform shadow-sm"
              >
                <Send size={16} className="text-primary-foreground" />
              </button>
            </div>

            {/* Ideas list */}
            {ideas.length === 0 ? (
              <p className="text-center text-xs text-muted-foreground py-3">
                Aún no hay ideas guardadas ✨
              </p>
            ) : (
              <div className="space-y-2">
                {ideas.map((idea, i) => (
                  <div
                    key={idea.id}
                    className="flex items-start gap-2.5 bg-muted/50 rounded-xl px-3 py-2.5 animate-fade-in"
                    style={{ animationDelay: `${i * 40}ms`, animationFillMode: "both" }}
                  >
                    <span className="text-base mt-0.5">💡</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground leading-snug">{idea.text}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{idea.date}</p>
                    </div>
                    <button
                      onClick={() => deleteIdea(idea.id)}
                      className="p-1 rounded-lg hover:bg-destructive/10 transition-colors shrink-0 mt-0.5"
                    >
                      <Trash2 size={13} className="text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
