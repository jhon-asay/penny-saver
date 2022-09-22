import { useState } from "react";
import { Button, Stack, Container } from "react-bootstrap";
import AddBudgetModal from "./components/add-budget-modal/add-budget-modal.component";
import BudgetCard from "./components/butget-card/budget-card.component";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary">Add Expense</Button>
        </Stack>
        <div className="cardContainer">
          <BudgetCard
            name="Entertainment"
            gray
            amount={200}
            max={1000}
          ></BudgetCard>
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
    </>
  );
}

export default App;
