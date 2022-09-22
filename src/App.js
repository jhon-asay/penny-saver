import { useState } from "react";
import { Button, Stack, Container } from "react-bootstrap";
import AddBudgetModal from "./components/add-budget-modal/add-budget-modal.component";
import AddExpenseModal from "./components/add-expense-modal/add-expense-modal.component";
import BudgetCard from "./components/butget-card/budget-card.component";
import UncategorizedBudgetCard from "./components/uncategorized-budget-card/uncategorized-budget-card.component";
import { useBudgets } from "./contexts/butgets.context";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

  const { budgets, getBudgetExpenses } = useBudgets();

  const openAddExpenseModal = (budgetId) => {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div className="cardContainer">
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
              />
            );
          })}
          <UncategorizedBudgetCard />
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
    </>
  );
}

export default App;
