import { useMemo, useState } from "react";
import { format, startOfMonth, endOfMonth, addMonths, subMonths } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Users, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES, USER_PROFILES } from "@/data/categories";
import type { Expense } from "@/hooks/useExpenses";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import logoWhite from "@/assets/Abundapp_white.png";

const CHART_COLORS = [
  "hsl(122, 39%, 49%)",
  "hsl(66, 70%, 54%)",
  "hsl(88, 50%, 53%)",
  "hsl(200, 17%, 40%)",
  "hsl(150, 40%, 50%)",
];

interface SummaryScreenProps {
  expenses: Expense[];
}

export function SummaryScreen({ expenses }: SummaryScreenProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthExpenses = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return expenses.filter((e) => {
      const d = new Date(e.date);
      return d >= start && d <= end;
    });
  }, [expenses, currentMonth]);

  const total = useMemo(() => monthExpenses.reduce((s, e) => s + e.amount, 0), [monthExpenses]);

  const byUser = useMemo(() => {
    const map: Record<string, number> = {};
    monthExpenses.forEach((e) => { map[e.user] = (map[e.user] || 0) + e.amount; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [monthExpenses]);

  const topCategories = useMemo(() => {
    const map: Record<string, { value: number; emoji: string }> = {};
    monthExpenses.forEach((e) => {
      const cat = CATEGORIES.find((c) => c.id === e.category);
      const name = cat ? `${cat.emoji} ${cat.name}` : e.category;
      if (!map[name]) map[name] = { value: 0, emoji: cat?.emoji || "💸" };
      map[name].value += e.amount;
    });
    return Object.entries(map)
      .map(([name, { value }]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [monthExpenses]);

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Header */}
      <div className="gradient-header px-6 pt-10 pb-8 rounded-b-3xl card-shadow-lg">
        <img src={logoWhite} alt="Abundapp" className="h-8 object-contain mb-3" />
        {/* Month navigator */}
        <div className="flex items-center justify-between bg-primary-foreground/15 rounded-2xl px-2 py-1 mb-6">
          <Button variant="ghost" size="icon" className="text-primary-foreground touch-target" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            <ChevronLeft size={22} />
          </Button>
          <span className="text-primary-foreground font-bold capitalize">
            {format(currentMonth, "MMMM yyyy", { locale: es })}
          </span>
          <Button variant="ghost" size="icon" className="text-primary-foreground touch-target" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            <ChevronRight size={22} />
          </Button>
        </div>
        {/* Hero total */}
        <div className="text-center">
          <p className="text-primary-foreground/70 text-sm font-medium mb-1">Total del mes</p>
          <p className="text-primary-foreground text-4xl font-extrabold animate-count-up">
            ${total.toLocaleString()}
          </p>
          <p className="text-primary-foreground/60 text-sm mt-1">
            {monthExpenses.length} transacciones
          </p>
        </div>
      </div>

      <div className="flex-1 px-4 pt-4 space-y-4">
        {/* User breakdown */}
        {byUser.length > 0 && (
          <div className="bg-card rounded-2xl p-5 card-shadow animate-slide-up">
            <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
              <Users size={16} className="text-primary" />
              Gasto por usuario
            </h3>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={byUser}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={65}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                    fontSize={12}
                  >
                    {byUser.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="flex justify-center gap-6 mt-2">
              {byUser.map((u, i) => {
                const profile = USER_PROFILES[u.name] || { emoji: "👤" };
                return (
                  <div key={u.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                    <span className="text-xs font-medium">{profile.emoji} {u.name}: ${u.value.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Top categories */}
        {topCategories.length > 0 && (
          <div className="bg-card rounded-2xl p-5 card-shadow animate-slide-up" style={{ animationDelay: "100ms", animationFillMode: "both" }}>
            <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
              <Tag size={16} className="text-primary" />
              Top categorías
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topCategories} layout="vertical" margin={{ left: 0, right: 10, top: 0, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 12, fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
                    {topCategories.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {monthExpenses.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-muted-foreground font-semibold">Sin datos este mes</p>
          </div>
        )}
      </div>
    </div>
  );
}
