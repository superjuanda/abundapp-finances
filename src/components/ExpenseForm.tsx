import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, DollarSign, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CATEGORIES, USERS } from "@/data/categories";
import { toast } from "@/hooks/use-toast";
import type { Expense } from "@/hooks/useExpenses";
import logoWhite from "@/assets/Abundapp_white.png";

interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, "id" | "createdAt">) => void;
  initial?: Partial<Expense>;
  submitLabel?: string;
}

export function ExpenseForm({ onSubmit, initial, submitLabel = "Registrar Gasto" }: ExpenseFormProps) {
  const [date, setDate] = useState<Date>(initial?.date ? new Date(initial.date) : new Date());
  const [user, setUser] = useState(initial?.user || "");
  const [category, setCategory] = useState(initial?.category || "");
  const [subcategory, setSubcategory] = useState(initial?.subcategory || "");
  const [amount, setAmount] = useState(initial?.amount?.toString() || "");
  const [notes, setNotes] = useState(initial?.notes || "");

  const selectedCat = CATEGORIES.find((c) => c.id === category);
  const subcategories = selectedCat?.subcategories || [];

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    setSubcategory("");
  };

  const handleSubmit = () => {
    if (!user || !category || !subcategory || !amount) {
      toast({ title: "Campos requeridos", description: "Completa todos los campos obligatorios.", variant: "destructive" });
      return;
    }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({ title: "Monto inválido", description: "Ingresa un monto válido.", variant: "destructive" });
      return;
    }
    onSubmit({
      date: date.toISOString(),
      user,
      category,
      subcategory,
      amount: numAmount,
      notes,
    });
    if (!initial) {
      setUser("");
      setCategory("");
      setSubcategory("");
      setAmount("");
      setNotes("");
      setDate(new Date());
      toast({ title: "✅ Gasto registrado", description: `$${numAmount.toLocaleString()} en ${selectedCat?.name}` });
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Header */}
      {!initial && (
        <div className="gradient-header px-6 pt-10 pb-8 rounded-b-3xl card-shadow-lg">
          <img src={logoWhite} alt="Abundapp" className="h-10 object-contain" />
          <p className="text-primary-foreground/80 text-sm mt-2 font-medium">
            Registra tus gastos fácilmente
          </p>
        </div>
      )}

      {/* Form */}
      <div className={cn("flex-1 px-4 space-y-4", initial ? "pt-2" : "-mt-4")}>
        <div className={cn("bg-card rounded-2xl p-5 space-y-5", !initial && "card-shadow")}>
          {/* Date */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Fecha</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal touch-target h-12 rounded-xl">
                  <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                  {format(date, "PPP", { locale: es })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} initialFocus className="p-3 pointer-events-auto" />
              </PopoverContent>
            </Popover>
          </div>

          {/* User */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Usuario</Label>
            <Select value={user} onValueChange={setUser}>
              <SelectTrigger className="touch-target h-12 rounded-xl">
                <SelectValue placeholder="Seleccionar usuario" />
              </SelectTrigger>
              <SelectContent>
                {USERS.map((u) => (
                  <SelectItem key={u} value={u} className="touch-target">{u}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Categoría</Label>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="touch-target h-12 rounded-xl">
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.id} value={c.id} className="touch-target">
                    <span className="flex items-center gap-2">
                      <c.icon size={16} className="text-primary" />
                      {c.name}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subcategory */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Subcategoría</Label>
            <Select value={subcategory} onValueChange={setSubcategory} disabled={!category}>
              <SelectTrigger className="touch-target h-12 rounded-xl">
                <SelectValue placeholder={category ? "Seleccionar subcategoría" : "Primero selecciona categoría"} />
              </SelectTrigger>
              <SelectContent>
                {subcategories.map((s) => (
                  <SelectItem key={s} value={s} className="touch-target">{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Monto</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
              <Input
                type="number"
                inputMode="decimal"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 touch-target h-12 rounded-xl text-lg font-bold"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold flex items-center gap-1">
              <FileText size={14} />
              Notas <span className="text-muted-foreground font-normal">(opcional)</span>
            </Label>
            <Textarea
              placeholder="Añade una nota..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="rounded-xl min-h-[80px] resize-none"
            />
          </div>
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          className="w-full touch-target h-14 rounded-2xl text-base font-bold gradient-header text-primary-foreground shadow-lg hover:opacity-95 transition-opacity"
          size="lg"
        >
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
