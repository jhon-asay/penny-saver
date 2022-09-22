import BudgetCard from "../butget-card/budget-card.component";
import {
  useBudgets,
  UNCATEGORIZED_BUDGET_ID,
} from "../../contexts/butgets.context";

const UncategorizedBudgetCard = (props) => {
  const { getBudgetExpenses } = useBudgets();
  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  if (amount === 0) return null;

  return <BudgetCard amount={amount} name="Uncategorized" gray {...props} />;
};

export default UncategorizedBudgetCard;
