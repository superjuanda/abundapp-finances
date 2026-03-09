import { useState, useMemo } from "react";
import { format, startOfMonth, endOfMonth, addMonths, subMonths } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Pencil, Trash2, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CATEGORIES, USER_PROFILES } from "@/data/categories";
import type { Expense } from "@/hooks/useExpenses";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { ExpenseForm } from "./ExpenseForm";
import { toast } from "@/hooks/use-toast";
import logoWhite from "@/assets/Abundapp_white.png";

interface HistoryScreenProps {
  expenses: Expense[];
  onUpdate: (id: string, data: Partial<Omit<Expense, "id" | "createdAt">>) => void;
  onDelete: (id: string) => void;
}

export function HistoryScreen({ expenses, onUpdate, onDelete }: HistoryScreenProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const monthExpenses = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return expenses
      .filter((e) => {
        const d = new Date(e.date);
        return d >= start && d <= end;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [expenses, currentMonth]);

  const handleDelete = () => {
    if (deletingId) {
      onDelete(deletingId);
      setDeletingId(null);
      toast({ title: "🗑️ Gasto eliminado" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Header */}
      <div className="gradient-header px-6 pt-10 pb-6 rounded-b-3xl card-shadow-lg">
        <img src={logoWhite} alt="Abundapp" className="h-8 object-contain mb-3" />
        {/* Month navigator */}
        <div className="flex items-center justify-between bg-primary-foreground/15 rounded-2xl px-2 py-1">
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
      </div>

      {/* Expense list */}
      <div className="flex-1 px-4 pt-4 space-y-3">
        {monthExpenses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="bg-muted rounded-full p-6 mb-4">
              <Inbox size={40} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-semibold">Sin gastos este mes</p>
            <p className="text-muted-foreground text-sm">Registra tu primer gasto</p>
          </div>
        ) : (
          monthExpenses.map((expense, i) => {
            const cat = CATEGORIES.find((c) => c.id === expense.category);
            const CatIcon = cat?.icon;
            return (
              <div
                key={expense.id}
                className="bg-card rounded-2xl p-4 card-shadow flex items-center gap-3 animate-slide-up"
                style={{ animationDelay: `${i * 50}ms`, animationFillMode: "both" }}
              >
                {/* Icon */}
                <div className="bg-primary/10 rounded-xl p-2.5 shrink-0">
                  {CatIcon && <CatIcon size={22} className="text-primary" />}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{expense.subcategory}</p>
                  <p className="text-xs text-muted-foreground">
                    {expense.user} · {format(new Date(expense.date), "d MMM", { locale: es })}
                  </p>
                </div>
                {/* Amount */}
                <p className="font-extrabold text-lg shrink-0">
                  ${expense.amount.toLocaleString()}
                </p>
                {/* Actions */}
                <div className="flex flex-col gap-1 shrink-0">
                  <button onClick={() => setEditingExpense(expense)} className="p-1.5 rounded-lg hover:bg-muted transition-colors touch-target">
                    <Pencil size={16} className="text-muted-foreground" />
                  </button>
                  <button onClick={() => setDeletingId(expense.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors touch-target">
                    <Trash2 size={16} className="text-destructive" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Edit drawer */}
      <Drawer open={!!editingExpense} onOpenChange={(open) => !open && setEditingExpense(null)}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>Editar Gasto</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto px-1 pb-6">
            {editingExpense && (
              <ExpenseForm
                initial={editingExpense}
                submitLabel="Guardar Cambios"
                onSubmit={(data) => {
                  onUpdate(editingExpense.id, data);
                  setEditingExpense(null);
                  toast({ title: "✏️ Gasto actualizado" });
                }}
              />
            )}
          </div>
        </DrawerContent>
      </Drawer>

      {/* Delete confirmation */}
      <AlertDialog open={!!deletingId} onOpenChange={(open) => !open && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar gasto?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
