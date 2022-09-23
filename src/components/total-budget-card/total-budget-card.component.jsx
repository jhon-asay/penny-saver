import BudgetCard from "../butget-card/budget-card.component";
import { useBudgets } from "../../contexts/butgets.context";

const TotalBudgetCard = () => {
  const { expenses, budgets } = useBudgets();
  const amount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const max = budgets.reduce((acc, budget) => acc + budget.max, 0);

  if (max === 0) return null;

  return <BudgetCard amount={amount} name="Total" gray max={max} hideButtons />;
};

export default TotalBudgetCard;
