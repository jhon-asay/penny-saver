import { useState } from "react";
import { Button, Stack, Container } from "react-bootstrap";
import AddBudgetModal from "./components/add-budget-modal/add-budget-modal.component";
import AddExpenseModal from "./components/add-expense-modal/add-expense-modal.component";
import ViewExpensesModal from "./components/view-expenses-modal/view-expenses-modal.component";
import BudgetCard from "./components/butget-card/budget-card.component";
import TotalBudgetCard from "./components/total-budget-card/total-budget-card.component";
import UncategorizedBudgetCard from "./components/uncategorized-budget-card/uncategorized-budget-card.component";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "./contexts/butgets.context";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

  const { budgets, getBudgetExpenses } = useBudgets();

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };

  return (
    <>
      <Container className="my-4">
        <h1 className="d-flex justify-content-center">Penny Saver</h1>
        <Stack direction="horizontal" gap="3" className="mb-4">
          <h2 className="me-auto">Budgets</h2>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div className="card-container">
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (acc, expense) => acc + expense.amount,
              0
            );

            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => {
                  openAddExpenseModal(budget.id);
                }}
                onViewExpensesClick={() => {
                  setViewExpensesModalBudgetId(budget.id);
                }}
              />
            );
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpensesClick={() => {
              setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID);
            }}
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
    </>
  );
}

export default App;
