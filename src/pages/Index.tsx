import { useState } from "react";
import { BottomNav, type TabId } from "@/components/BottomNav";
import { ExpenseForm } from "@/components/ExpenseForm";
import { HistoryScreen } from "@/components/HistoryScreen";
import { SummaryScreen } from "@/components/SummaryScreen";
import { ComingSoonScreen } from "@/components/ComingSoonScreen";
import { useExpenses } from "@/hooks/useExpenses";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("register");
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-background">
      {activeTab === "register" && <ExpenseForm onSubmit={addExpense} />}
      {activeTab === "history" && (
        <HistoryScreen expenses={expenses} onUpdate={updateExpense} onDelete={deleteExpense} />
      )}
      {activeTab === "summary" && <SummaryScreen expenses={expenses} />}
      {activeTab === "coming-soon" && <ComingSoonScreen />}
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
};

export default Index;
